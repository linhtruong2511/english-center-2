import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Auth middleware for protected routes
async function requireAuth(c: any, next: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (!user || error) {
    return new Response('Unauthorized', { status: 401 });
  }

  c.set('user', user);
  await next();
}

// Role-based authorization
async function requireRole(role: string) {
  return async (c: any, next: any) => {
    const user = c.get('user');
    const userProfile = await kv.get(`profile:${user.id}`);
    
    if (!userProfile || userProfile.role !== role) {
      return new Response('Forbidden', { status: 403 });
    }
    
    c.set('userProfile', userProfile);
    await next();
  };
}

// Public Routes

// Get all courses for public view
app.get('/make-server-65e96700/courses', async (c) => {
  try {
    const courses = await kv.getByPrefix('course:');
    return c.json({ success: true, courses });
  } catch (error) {
    console.log('Error fetching courses:', error);
    return c.json({ success: false, error: 'Failed to fetch courses' }, 500);
  }
});

// Get course details
app.get('/make-server-65e96700/courses/:id', async (c) => {
  try {
    const courseId = c.req.param('id');
    const course = await kv.get(`course:${courseId}`);
    
    if (!course) {
      return c.json({ success: false, error: 'Course not found' }, 404);
    }
    
    return c.json({ success: true, course });
  } catch (error) {
    console.log('Error fetching course details:', error);
    return c.json({ success: false, error: 'Failed to fetch course details' }, 500);
  }
});

// Placement test submission
app.post('/make-server-65e96700/placement-test', async (c) => {
  try {
    const { answers, email } = await c.req.json();
    
    // Calculate score based on answers
    let score = 0;
    const totalQuestions = answers.length;
    
    // Simple scoring logic - each correct answer = 1 point
    answers.forEach((answer: any) => {
      if (answer.isCorrect) score++;
    });
    
    const percentage = (score / totalQuestions) * 100;
    let level = 'Beginner';
    let recommendedCourse = 'beginner-english';
    
    if (percentage >= 80) {
      level = 'Advanced';
      recommendedCourse = 'advanced-english';
    } else if (percentage >= 60) {
      level = 'Intermediate';
      recommendedCourse = 'intermediate-english';
    } else if (percentage >= 40) {
      level = 'Elementary';
      recommendedCourse = 'beginner-english';
    }
    
    // Store test result
    const testId = crypto.randomUUID();
    await kv.set(`test:${testId}`, {
      email,
      score,
      percentage,
      level,
      recommendedCourse,
      answers,
      timestamp: new Date().toISOString()
    });
    
    return c.json({
      success: true,
      result: {
        score,
        percentage,
        level,
        recommendedCourse
      }
    });
  } catch (error) {
    console.log('Error processing placement test:', error);
    return c.json({ success: false, error: 'Failed to process test' }, 500);
  }
});

// Consultation booking
app.post('/make-server-65e96700/consultation', async (c) => {
  try {
    const consultationData = await c.req.json();
    const consultationId = crypto.randomUUID();
    
    await kv.set(`consultation:${consultationId}`, {
      ...consultationData,
      id: consultationId,
      status: 'pending',
      timestamp: new Date().toISOString()
    });
    
    return c.json({ success: true, id: consultationId });
  } catch (error) {
    console.log('Error booking consultation:', error);
    return c.json({ success: false, error: 'Failed to book consultation' }, 500);
  }
});

// User signup
app.post('/make-server-65e96700/signup', async (c) => {
  try {
    const { email, password, firstName, lastName, phone, role = 'student' } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        first_name: firstName,
        last_name: lastName,
        phone 
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log('Signup error:', error);
      return c.json({ success: false, error: error.message }, 400);
    }
    
    // Store user profile
    await kv.set(`profile:${data.user.id}`, {
      id: data.user.id,
      email,
      firstName,
      lastName,
      phone,
      role,
      joinedAt: new Date().toISOString(),
      isActive: true
    });
    
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ success: false, error: 'Failed to create user' }, 500);
  }
});

// Protected Routes (require authentication)

// Get user profile
app.get('/make-server-65e96700/profile', requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const profile = await kv.get(`profile:${user.id}`);
    
    return c.json({ success: true, profile });
  } catch (error) {
    console.log('Error fetching profile:', error);
    return c.json({ success: false, error: 'Failed to fetch profile' }, 500);
  }
});

// Student Routes

// Get student dashboard data
app.get('/make-server-65e96700/student/dashboard', requireAuth, requireRole('student'), async (c) => {
  try {
    const user = c.get('user');
    
    // Get enrolled courses
    const enrollments = await kv.getByPrefix(`enrollment:${user.id}:`);
    const assignments = await kv.getByPrefix(`assignment-submission:${user.id}:`);
    const notifications = await kv.getByPrefix(`notification:${user.id}:`);
    
    return c.json({
      success: true,
      data: {
        enrollments,
        assignments,
        notifications: notifications.slice(0, 5) // Latest 5 notifications
      }
    });
  } catch (error) {
    console.log('Error fetching student dashboard:', error);
    return c.json({ success: false, error: 'Failed to fetch dashboard data' }, 500);
  }
});

// Enroll in course
app.post('/make-server-65e96700/student/enroll', requireAuth, requireRole('student'), async (c) => {
  try {
    const user = c.get('user');
    const { courseId, paymentMethod } = await c.req.json();
    
    const course = await kv.get(`course:${courseId}`);
    if (!course) {
      return c.json({ success: false, error: 'Course not found' }, 404);
    }
    
    const enrollmentId = crypto.randomUUID();
    await kv.set(`enrollment:${user.id}:${courseId}`, {
      id: enrollmentId,
      userId: user.id,
      courseId,
      courseName: course.title,
      enrolledAt: new Date().toISOString(),
      status: 'active',
      paymentMethod,
      progress: 0
    });
    
    return c.json({ success: true, enrollmentId });
  } catch (error) {
    console.log('Error enrolling in course:', error);
    return c.json({ success: false, error: 'Failed to enroll in course' }, 500);
  }
});

// Submit assignment
app.post('/make-server-65e96700/student/assignment/submit', requireAuth, requireRole('student'), async (c) => {
  try {
    const user = c.get('user');
    const { assignmentId, content, files = [] } = await c.req.json();
    
    const submissionId = crypto.randomUUID();
    await kv.set(`assignment-submission:${user.id}:${assignmentId}`, {
      id: submissionId,
      assignmentId,
      userId: user.id,
      content,
      files,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      grade: null,
      feedback: null
    });
    
    return c.json({ success: true, submissionId });
  } catch (error) {
    console.log('Error submitting assignment:', error);
    return c.json({ success: false, error: 'Failed to submit assignment' }, 500);
  }
});

// Teacher Routes

// Get teacher dashboard
app.get('/make-server-65e96700/teacher/dashboard', requireAuth, requireRole('teacher'), async (c) => {
  try {
    const user = c.get('user');
    
    // Get classes assigned to teacher
    const classes = await kv.getByPrefix(`class:teacher:${user.id}:`);
    const pendingAssignments = await kv.getByPrefix('assignment-submission:');
    
    // Filter assignments for teacher's classes
    const teacherAssignments = pendingAssignments.filter((assignment: any) => {
      return assignment.status === 'submitted';
    });
    
    return c.json({
      success: true,
      data: {
        classes,
        pendingAssignments: teacherAssignments.length,
        totalStudents: classes.reduce((sum: number, cls: any) => sum + (cls.students?.length || 0), 0)
      }
    });
  } catch (error) {
    console.log('Error fetching teacher dashboard:', error);
    return c.json({ success: false, error: 'Failed to fetch dashboard data' }, 500);
  }
});

// Create assignment
app.post('/make-server-65e96700/teacher/assignment/create', requireAuth, requireRole('teacher'), async (c) => {
  try {
    const user = c.get('user');
    const assignmentData = await c.req.json();
    
    const assignmentId = crypto.randomUUID();
    await kv.set(`assignment:${assignmentId}`, {
      ...assignmentData,
      id: assignmentId,
      teacherId: user.id,
      createdAt: new Date().toISOString(),
      status: 'active'
    });
    
    return c.json({ success: true, assignmentId });
  } catch (error) {
    console.log('Error creating assignment:', error);
    return c.json({ success: false, error: 'Failed to create assignment' }, 500);
  }
});

// Grade assignment
app.post('/make-server-65e96700/teacher/assignment/grade', requireAuth, requireRole('teacher'), async (c) => {
  try {
    const { submissionId, grade, feedback } = await c.req.json();
    
    const submission = await kv.get(`assignment-submission:${submissionId}`);
    if (!submission) {
      return c.json({ success: false, error: 'Submission not found' }, 404);
    }
    
    await kv.set(`assignment-submission:${submissionId}`, {
      ...submission,
      grade,
      feedback,
      gradedAt: new Date().toISOString(),
      status: 'graded'
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error grading assignment:', error);
    return c.json({ success: false, error: 'Failed to grade assignment' }, 500);
  }
});

// Admin Routes

// Get admin dashboard
app.get('/make-server-65e96700/admin/dashboard', requireAuth, requireRole('admin'), async (c) => {
  try {
    const users = await kv.getByPrefix('profile:');
    const courses = await kv.getByPrefix('course:');
    const enrollments = await kv.getByPrefix('enrollment:');
    
    const stats = {
      totalUsers: users.length,
      totalStudents: users.filter((u: any) => u.role === 'student').length,
      totalTeachers: users.filter((u: any) => u.role === 'teacher').length,
      totalCourses: courses.length,
      totalEnrollments: enrollments.length
    };
    
    return c.json({ success: true, stats });
  } catch (error) {
    console.log('Error fetching admin dashboard:', error);
    return c.json({ success: false, error: 'Failed to fetch dashboard data' }, 500);
  }
});

// Manage users
app.get('/make-server-65e96700/admin/users', requireAuth, requireRole('admin'), async (c) => {
  try {
    const users = await kv.getByPrefix('profile:');
    return c.json({ success: true, users });
  } catch (error) {
    console.log('Error fetching users:', error);
    return c.json({ success: false, error: 'Failed to fetch users' }, 500);
  }
});

// Create course
app.post('/make-server-65e96700/admin/course/create', requireAuth, requireRole('admin'), async (c) => {
  try {
    const courseData = await c.req.json();
    const courseId = crypto.randomUUID();
    
    await kv.set(`course:${courseId}`, {
      ...courseData,
      id: courseId,
      createdAt: new Date().toISOString(),
      isActive: true
    });
    
    return c.json({ success: true, courseId });
  } catch (error) {
    console.log('Error creating course:', error);
    return c.json({ success: false, error: 'Failed to create course' }, 500);
  }
});

// Initialize default courses if they don't exist
app.post('/make-server-65e96700/init-courses', async (c) => {
  try {
    const existingCourses = await kv.getByPrefix('course:');
    
    if (existingCourses.length === 0) {
      const defaultCourses = [
        {
          id: 'beginner-english',
          title: 'Beginner English',
          description: 'Perfect for those starting their English journey. Learn basic vocabulary, grammar, and conversation skills.',
          level: 'Beginner',
          duration: '3 months',
          maxStudents: 15,
          price: 299,
          features: [
            'Fundamental grammar rules',
            'Essential vocabulary (500+ words)',
            'Basic conversation practice',
            'Reading comprehension',
            'Writing exercises'
          ],
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'intermediate-english',
          title: 'Intermediate English',
          description: 'Build upon your existing knowledge and develop more complex language skills for everyday situations.',
          level: 'Intermediate',
          duration: '4 months',
          maxStudents: 12,
          price: 399,
          features: [
            'Advanced grammar structures',
            'Expanded vocabulary (1000+ words)',
            'Fluent conversation practice',
            'Business English basics',
            'Presentation skills'
          ],
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'advanced-english',
          title: 'Advanced English',
          description: 'Master advanced English for professional and academic success. Focus on fluency and confidence.',
          level: 'Advanced',
          duration: '4 months',
          maxStudents: 10,
          price: 499,
          features: [
            'Complex grammar mastery',
            'Professional vocabulary',
            'Academic writing skills',
            'Public speaking',
            'IELTS/TOEFL preparation'
          ],
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      
      for (const course of defaultCourses) {
        await kv.set(`course:${course.id}`, course);
      }
    }
    
    return c.json({ success: true, message: 'Courses initialized' });
  } catch (error) {
    console.log('Error initializing courses:', error);
    return c.json({ success: false, error: 'Failed to initialize courses' }, 500);
  }
});

Deno.serve(app.fetch)