import { Mail, MapPin, Briefcase, Target, Users, Award, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutMe = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-secondary to-accent text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">About EduMitra</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Empowering students through accessible, quality education
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
          <div className="glass-effect rounded-2xl p-8 md:p-12 border">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              Our Story
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              EduMitra was founded by four passionate flatmates who shared a common vision: to make quality education accessible to everyone. We believe that every student deserves the best resources to excel in their academic journey.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our platform provides comprehensive notes, live classes, and expert guidance for Engineering, Class 10th, and Class 12th students. We are committed to helping students achieve their educational goals.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 border hover-lift animate-fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To provide affordable, high-quality educational resources and personalized learning experiences that empower students to achieve their full potential and succeed in their academic pursuits.
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-8 border hover-lift animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become India's most trusted and accessible education platform, bridging the gap between quality education and affordability, reaching students in every corner of the country.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          {[
            { number: "5000+", label: "Students" },
            { number: "200+", label: "Courses" },
            { number: "50+", label: "Mentors" },
            { number: "95%", label: "Success Rate" }
          ].map((stat, idx) => (
            <div key={stat.label} className="glass-effect rounded-2xl p-6 text-center border hover-lift animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Founder Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Meet the Founder</h2>
            <p className="text-muted-foreground text-lg">The visionary behind EduMitra</p>
          </div>
          
          <div className="glass-effect rounded-2xl p-8 md:p-12 border animate-fade-in">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl flex-shrink-0">
                SK
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Shubham Kumar</h3>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span>Software Engineer & Cybersecurity Specialist</span>
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>From Begusarai</span>
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>shubhammrdm394@gmail.com</span>
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Currently pursuing Software Engineering with a specialization in Cybersecurity. Passionate about education technology and helping students succeed. With a vision to democratize quality education, Shubham founded EduMitra to bridge the educational gap in India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Student-Centric", desc: "Every decision we make puts students first" },
              { icon: Award, title: "Quality Education", desc: "We never compromise on the quality of content" },
              { icon: Heart, title: "Accessibility", desc: "Making education affordable and accessible to all" }
            ].map((value, idx) => (
              <div key={value.title} className="glass-effect rounded-xl p-6 border text-center hover-lift animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutMe;
