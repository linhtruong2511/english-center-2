import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Courses } from "./components/Courses";
import { About } from "./components/About";
import { Faculty } from "./components/Faculty";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { PlacementTest } from "./components/PlacementTest";
import { AuthModal } from "./components/auth/AuthModal";
import { StudentDashboard } from "./components/dashboard/StudentDashboard";
import { TeacherDashboard } from "./components/dashboard/TeacherDashboard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { supabase, projectId } from './utils/supabase/client';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'student' | 'teacher' | 'admin'>('public');
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showPlacementTest, setShowPlacementTest] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Get user profile to determine role
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-65e96700/profile`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        const data = await response.json();
        if (data.success && data.profile) {
          setUser(session.user);
          setUserRole(data.profile.role);
          setCurrentView(data.profile.role === 'admin' ? 'admin' : 
                        data.profile.role === 'teacher' ? 'teacher' : 'student');
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (authenticatedUser: any, role: string) => {
    setUser(authenticatedUser);
    setUserRole(role);
    setCurrentView(role === 'admin' ? 'admin' : 
                  role === 'teacher' ? 'teacher' : 'student');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setCurrentView('public');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading English Center...</p>
        </div>
      </div>
    );
  }

  // Render dashboard based on user role
  if (currentView === 'student' && user) {
    return <StudentDashboard user={user} onSignOut={handleSignOut} />;
  }

  if (currentView === 'teacher' && user) {
    return <TeacherDashboard user={user} onSignOut={handleSignOut} />;
  }

  if (currentView === 'admin' && user) {
    return <AdminDashboard user={user} onSignOut={handleSignOut} />;
  }

  // Render public website
  return (
    <div className="min-h-screen">
      <Header 
        onOpenAuth={() => setShowAuthModal(true)} 
        onOpenPlacementTest={() => setShowPlacementTest(true)} 
      />
      <Hero 
        onOpenAuth={() => setShowAuthModal(true)} 
        onOpenPlacementTest={() => setShowPlacementTest(true)} 
      />
      <Courses />
      <About />
      <Faculty />
      <Testimonials />
      <Contact />
      <Footer />

      {/* Modals */}
      {showPlacementTest && (
        <PlacementTest onClose={() => setShowPlacementTest(false)} />
      )}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}