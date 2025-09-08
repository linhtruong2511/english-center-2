import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      country: "Spain",
      course: "Advanced English",
      rating: 5,
      text: "English Center transformed my language skills completely. The teachers are incredibly patient and the methods are so effective. I went from being afraid to speak to confidently giving presentations at work!"
    },
    {
      name: "Hiroshi Tanaka",
      country: "Japan",
      course: "Business English",
      rating: 5,
      text: "The Business English course was exactly what I needed for my international career. The practical focus on real business situations made all the difference. Highly recommended!"
    },
    {
      name: "Ahmed Hassan",
      country: "Egypt",
      course: "IELTS Preparation",
      rating: 5,
      text: "Thanks to the IELTS prep course, I achieved my target score of 7.5! The practice tests and individual feedback were invaluable. Now I'm studying at my dream university in the UK."
    },
    {
      name: "Li Wei",
      country: "China",
      course: "Intermediate English",
      rating: 5,
      text: "The small class sizes and personalized attention made learning so much more effective. I improved my speaking confidence dramatically and made great friends from around the world."
    },
    {
      name: "Sofia Petrov",
      country: "Russia",
      course: "Conversation Club",
      rating: 5,
      text: "The Conversation Club is amazing! It's such a supportive environment to practice speaking. The topics are always interesting and the native speakers are so helpful and encouraging."
    },
    {
      name: "Carlos Silva",
      country: "Brazil",
      course: "Beginner English",
      rating: 5,
      text: "I started with zero English knowledge, but the beginner course built my foundation step by step. The teachers are excellent and make learning fun. Now I can communicate with confidence!"
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our students from around the world 
            have to say about their learning experience at English Center.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-muted-foreground/30" />
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{testimonial.course}</p>
                      <p className="text-xs text-muted-foreground">Graduate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/5 px-6 py-4 rounded-lg">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-left">
              <div className="font-semibold text-primary">4.9/5 Average Rating</div>
              <div className="text-sm text-muted-foreground">Based on 200+ student reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}