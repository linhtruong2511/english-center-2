import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header({ onOpenAuth, onOpenPlacementTest }: { onOpenAuth?: () => void; onOpenPlacementTest?: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">English Center</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Home
              </a>
              <a href="#courses" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Courses
              </a>
              <a href="#about" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                About
              </a>
              <a href="#faculty" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Faculty
              </a>
              <a href="#testimonials" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Contact
              </a>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" onClick={onOpenPlacementTest}>
              Free Test
            </Button>
            <Button onClick={onOpenAuth}>Sign In</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#courses" className="block px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
                Courses
              </a>
              <a href="#about" className="block px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#faculty" className="block px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
                Faculty
              </a>
              <a href="#testimonials" className="block px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full" onClick={onOpenPlacementTest}>
                  Free Placement Test
                </Button>
                <Button className="w-full" onClick={onOpenAuth}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}