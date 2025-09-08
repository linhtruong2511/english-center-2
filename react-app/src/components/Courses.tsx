import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Users, BookOpen } from "lucide-react";

export function Courses() {
  const courses = [
    {
      title: "Beginner English",
      description: "Perfect for those starting their English journey. Learn basic vocabulary, grammar, and conversation skills.",
      level: "Beginner",
      duration: "3 months",
      students: "12-15",
      price: "$299",
      features: [
        "Fundamental grammar rules",
        "Essential vocabulary (500+ words)",
        "Basic conversation practice",
        "Reading comprehension",
        "Writing exercises"
      ]
    },
    {
      title: "Intermediate English",
      description: "Build upon your existing knowledge and develop more complex language skills for everyday situations.",
      level: "Intermediate",
      duration: "4 months",
      students: "10-12",
      price: "$399",
      features: [
        "Advanced grammar structures",
        "Expanded vocabulary (1000+ words)",
        "Fluent conversation practice",
        "Business English basics",
        "Presentation skills"
      ]
    },
    {
      title: "Advanced English",
      description: "Master advanced English for professional and academic success. Focus on fluency and confidence.",
      level: "Advanced",
      duration: "4 months",
      students: "8-10",
      price: "$499",
      features: [
        "Complex grammar mastery",
        "Professional vocabulary",
        "Academic writing skills",
        "Public speaking",
        "IELTS/TOEFL preparation"
      ]
    },
    {
      title: "Business English",
      description: "Specialized course for professionals looking to excel in international business environments.",
      level: "Intermediate+",
      duration: "3 months",
      students: "6-8",
      price: "$599",
      features: [
        "Business communication",
        "Meeting and negotiation skills",
        "Email and report writing",
        "Industry-specific vocabulary",
        "Cross-cultural communication"
      ]
    },
    {
      title: "IELTS Preparation",
      description: "Comprehensive preparation for the IELTS exam with proven strategies and practice tests.",
      level: "Intermediate+",
      duration: "2 months",
      students: "10-12",
      price: "$449",
      features: [
        "All four skills practice",
        "Test-taking strategies",
        "Practice tests and feedback",
        "Score improvement techniques",
        "Individual coaching sessions"
      ]
    },
    {
      title: "Conversation Club",
      description: "Informal speaking practice sessions to build confidence and fluency in real-world conversations.",
      level: "All Levels",
      duration: "Ongoing",
      students: "8-12",
      price: "$99/month",
      features: [
        "Native speaker interaction",
        "Topic-based discussions",
        "Pronunciation coaching",
        "Cultural exchange",
        "Flexible scheduling"
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      case "Intermediate+":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Our English Courses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of English courses designed to meet your specific learning goals and proficiency level.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Card key={index} className="relative h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  <div className="text-xl font-bold text-primary">{course.price}</div>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="text-base">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <BookOpen className="h-4 w-4" />
                    What you'll learn:
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {course.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Button className="w-full">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}