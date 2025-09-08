import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GraduationCap, MapPin } from "lucide-react";

export function Faculty() {
  const teachers = [
    {
      name: "Sarah Johnson",
      title: "Lead English Instructor",
      education: "MA Applied Linguistics, Cambridge",
      experience: "8 years",
      specialties: ["Advanced Grammar", "IELTS Prep", "Academic Writing"],
      origin: "United Kingdom",
      image: "https://images.unsplash.com/photo-1563807893528-313039d9761f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMHRlYWNoZXIlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NTcyNTQ4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Michael Chen",
      title: "Business English Specialist",
      education: "MBA + TESOL Certification",
      experience: "6 years",
      specialties: ["Business Communication", "Presentation Skills", "Professional Writing"],
      origin: "Canada",
      image: "https://images.unsplash.com/photo-1563807893528-313039d9761f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMHRlYWNoZXIlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NTcyNTQ4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Emma Davis",
      title: "Conversation & Pronunciation Coach",
      education: "BA Linguistics + CELTA",
      experience: "5 years",
      specialties: ["Conversation Practice", "Pronunciation", "Cultural Communication"],
      origin: "Australia",
      image: "https://images.unsplash.com/photo-1563807893528-313039d9761f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMHRlYWNoZXIlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NTcyNTQ4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "David Wilson",
      title: "Beginner & Intermediate Instructor",
      education: "BA English + TEFL Certification",
      experience: "7 years",
      specialties: ["Grammar Foundations", "Vocabulary Building", "Reading Comprehension"],
      origin: "United States",
      image: "https://images.unsplash.com/photo-1563807893528-313039d9761f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMHRlYWNoZXIlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NTcyNTQ4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section id="faculty" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Meet Our Expert Faculty
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from qualified native speakers and certified instructors with years of teaching experience 
            and specialized expertise in various aspects of English language learning.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher, index) => (
            <Card key={index} className="text-center h-full">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <ImageWithFallback
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                </div>
                
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {teacher.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {teacher.title}
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{teacher.education}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{teacher.origin}</span>
                  </div>
                  
                  <div className="text-center">
                    <Badge variant="secondary" className="text-xs">
                      {teacher.experience} Experience
                    </Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {teacher.specialties.map((specialty, specialtyIndex) => (
                      <Badge 
                        key={specialtyIndex} 
                        variant="outline" 
                        className="text-xs px-2 py-1"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 px-4 py-2 rounded-full">
            <GraduationCap className="h-4 w-4" />
            All our teachers are certified and regularly participate in professional development programs
          </div>
        </div>
      </div>
    </section>
  );
}