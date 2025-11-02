import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/vidyasphere-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { to: "/courses", label: "Courses" },
    { to: "/batches", label: "PYQs" },
    { to: "/notes", label: "Notes" },
    { to: "/attendance", label: "Attendance" },
    { to: "/blogs", label: "Blogs" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Vidyasphere" className="h-12 w-12 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold gradient-text">Vidyasphere</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-medium transition-all ${
                  isActive(link.to)
                    ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
                )}
              </Link>
            ))}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-lg transition-all font-medium"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-lg transition-all font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(link.to)
                      ? "bg-primary/20 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="mx-4 mt-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-center font-medium flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="mx-4 mt-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-center font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
