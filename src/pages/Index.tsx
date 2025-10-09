import { Link } from "react-router-dom";
import { BookOpen, Users, FileText, TrendingUp, Award, Clock, Star, CheckCircle, ArrowRight, Zap, Target, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const stats = [
    { number: "5000+", label: "Students Enrolled", icon: Users },
    { number: "200+", label: "Quality Courses", icon: BookOpen },
    { number: "100%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "Learning Support", icon: Clock },
  ];

  const features = [
    { 
      icon: BookOpen, 
      title: "Comprehensive Notes", 
      desc: "Access detailed, well-organized notes for all subjects with easy download options",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Users, 
      title: "Live Classes", 
      desc: "Join interactive batch sessions with expert teachers and real-time doubt solving",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: FileText, 
      title: "PYQ Papers", 
      desc: "Practice with previous year questions categorized by subject and difficulty",
      color: "from-green-500 to-teal-500"
    },
    { 
      icon: TrendingUp, 
      title: "Track Progress", 
      desc: "Monitor your learning journey with detailed analytics and performance insights",
      color: "from-orange-500 to-red-500"
    },
    { 
      icon: Award, 
      title: "Expert Teachers", 
      desc: "Learn from experienced educators who are passionate about your success",
      color: "from-indigo-500 to-blue-500"
    },
    { 
      icon: Clock, 
      title: "Flexible Schedule", 
      desc: "Study at your own pace with 24/7 access to all learning materials",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Engineering Student",
      content: "Vidyasphere transformed my learning experience. The notes are comprehensive and the live classes are incredibly helpful!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Class 12 Student",
      content: "Best platform for board exam preparation. The PYQ papers helped me score 95% in my exams!",
      rating: 5
    },
    {
      name: "Anita Singh",
      role: "Class 10 Student",
      content: "Amazing teachers and well-structured content. I recommend Vidyasphere to all my friends!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background -z-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0wLTRoLTJ2Mmgydi0yem0yIDJ2LTJoLTJ2Mmgyem0wIDR2LTJoLTJ2Mmgyem0yLTJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0tMi00di0yaC0ydjJoMnptLTItMnYtMmgtMnYyaDJ6bTItMnYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0wLTRoLTJ2Mmgydi0yem0yIDJ2LTJoLTJ2Mmgyem0wIDR2LTJoLTJ2Mmgyem0yLTJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        </div>
        
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-slide-down">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">India's Most Trusted Learning Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Welcome to <span className="gradient-text">Vidyasphere</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{animationDelay: "0.1s"}}>
            Your complete learning companion for Engineering, Class 10, and Class 12. 
            Access premium notes, attend live classes, and excel in your studies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{animationDelay: "0.2s"}}>
            <Link 
              to="/courses" 
              className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-xl transition-all font-semibold flex items-center justify-center gap-2"
            >
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/donate" 
              className="px-8 py-4 bg-white border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Support Our Mission
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up" style={{animationDelay: "0.3s"}}>
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover-lift border border-border shadow-sm">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold gradient-text mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive learning tools designed to help you achieve your academic goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-2xl p-8 hover-lift border border-border shadow-sm animate-fade-in"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="gradient-text">Students</span> Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful students who transformed their learning with Vidyasphere
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-8 border border-border shadow-sm hover-lift animate-fade-in"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi1oMnYtMmgtMnptMCA0djJoMnYtMmgtMnptLTIgMnYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTItMnYtMmgtMnYyaDJ6bTAtNGgtMnYyaDJ2LTJ6bTIgMnYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6bTItMnYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yLTR2LTJoLTJ2Mmgyem0tMi0ydi0yaC0ydjJoMnptMi0ydjJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptLTIgMnYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTItMnYtMmgtMnYyaDJ6bTAtNGgtMnYyaDJ2LTJ6bTIgMnYtMmgtMnYyaDJ6bTAgNHYtMmgtMnYyaDJ6bTItMnYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already achieving their academic goals with Vidyasphere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth" 
              className="px-8 py-4 bg-white text-primary rounded-full hover:shadow-2xl transition-all font-semibold inline-flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Get Started Free
            </Link>
            <Link 
              to="/courses" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-primary transition-all font-semibold"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
