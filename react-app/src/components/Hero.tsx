import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero({ onOpenAuth, onOpenPlacementTest }: { onOpenAuth?: () => void; onOpenPlacementTest?: () => void }) {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              Master English with
              <span className="block text-primary">Expert Guidance</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Join thousands of students who have achieved fluency through our proven teaching methods. 
              From beginner to advanced, we'll help you reach your English language goals.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 sm:flex-none" onClick={onOpenAuth}>
                  Start Learning Today
                </Button>
                <Button variant="outline" size="lg" className="flex-1 sm:flex-none" onClick={onOpenPlacementTest}>
                  Take Free Test
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Students Taught</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Expert Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560884482-62010016d7c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdsaXNoJTIwY2xhc3Nyb29tJTIwc3R1ZGVudHMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTcyNTQ4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students learning English in a classroom"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}