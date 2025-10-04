import { Link } from "react-router-dom";
import { Mail, MapPin, Briefcase } from "lucide-react";

const AboutMe = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About EduMitra</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              EduMitra was founded by four passionate flatmates who shared a common vision: to make quality education accessible to everyone. We believe that every student deserves the best resources to excel in their academic journey.
            </p>
            <p className="text-muted-foreground">
              Our platform provides comprehensive notes, live classes, and expert guidance for Engineering, Class 10th, and Class 12th students. We are committed to helping students achieve their educational goals.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Meet the Founder</h2>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                SK
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Shubham Kumar</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Software Engineer & Cybersecurity Specialist
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    From Begusarai
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    shubhammrdm394@gmail.com
                  </p>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Currently pursuing Software Engineering with a specialization in Cybersecurity. Passionate about education technology and helping students succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
