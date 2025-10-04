import { Link } from "react-router-dom";
import { BookOpen, Users, FileText, TrendingUp, Award, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold text-primary">EduMitra</span>
            </div>
            <div className="flex gap-4">
              <Link to="/courses" className="text-foreground hover:text-primary transition">Courses</Link>
              <Link to="/batches" className="text-foreground hover:text-primary transition">Batches</Link>
              <Link to="/notes" className="text-foreground hover:text-primary transition">Notes</Link>
              <Link to="/blogs" className="text-foreground hover:text-primary transition">Blogs</Link>
              <Link to="/about" className="text-foreground hover:text-primary transition">About</Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition">Contact</Link>
              <Link to="/auth" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-foreground">Welcome to EduMitra</h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Your complete learning platform for Engineering, 10th, and 12th grade students. Access notes, attend classes, and excel in your studies.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/courses" className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
              Browse Courses
            </Link>
            <Link to="/donate" className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
              Support Us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Comprehensive Notes", desc: "Access detailed notes for all subjects" },
              { icon: Users, title: "Live Classes", desc: "Join interactive batch sessions" },
              { icon: FileText, title: "PYQ Papers", desc: "Previous year questions for practice" },
              { icon: TrendingUp, title: "Track Progress", desc: "Monitor your learning journey" },
              { icon: Award, title: "Expert Teachers", desc: "Learn from experienced educators" },
              { icon: Clock, title: "Flexible Schedule", desc: "Study at your own pace" }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 border rounded-lg hover:shadow-lg transition">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 EduMitra. All rights reserved.</p>
          <div className="flex gap-4 justify-center mt-4">
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
