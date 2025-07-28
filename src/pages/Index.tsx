import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import heroImage from "@/assets/hero-bg.jpg";
// import educationBg from "@/assets/education-bg.jpg";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  Calculator, 
  Upload,
  Phone,
  Mail,
  MessageSquare,
  Target
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Notes",
      description: "Access detailed notes for Engineering, 10th, and 12th classes",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Target,
      title: "Previous Year Questions",
      description: "Practice with extensive PYQ collection for better preparation",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Users,
      title: "Expert Batches",
      description: "Join specialized batches with experienced instructors",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Calculator,
      title: "Attendance Tracker",
      description: "Track your attendance and maintain 75% requirement",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Upload,
      title: "Upload Content",
      description: "Share your notes and PYQs with the community",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: Award,
      title: "Quality Education",
      description: "Get quality education from experienced professionals",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const batches = [
    {
      title: "JEE Main Preparation",
      description: "Complete preparation for JEE Main with mock tests",
      price: "₹2,999",
      duration: "6 months",
      level: "Engineering"
    },
    {
      title: "Class 12th Board Prep",
      description: "Comprehensive Class 12 board exam preparation",
      price: "₹1,999",
      duration: "4 months", 
      level: "12th Grade"
    },
    {
      title: "Class 10th Excellence",
      description: "Score high in Class 10 board examinations",
      price: "₹1,499",
      duration: "3 months",
      level: "10th Grade"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 hero-gradient">
          {/* Background pattern */}
          <div className="educational-pattern opacity-20"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">VidyaSphere</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive platform for Engineering, 10th, and 12th education. 
            Learn, grow, and excel with our expert guidance and comprehensive resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link to="/batches">Explore Batches</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/notes">Browse Notes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose VidyaSphere?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need for academic success in one comprehensive platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-shadow hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Batches Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Batches</h2>
            <p className="text-xl text-muted-foreground">
              Join our most popular courses and start your journey to success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {batches.map((batch, index) => (
              <Card key={index} className="card-shadow hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{batch.level}</Badge>
                    <span className="text-2xl font-bold text-primary">{batch.price}</span>
                  </div>
                  <CardTitle className="text-xl">{batch.title}</CardTitle>
                  <CardDescription>{batch.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {batch.duration}</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to="/batches">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Creator Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">About the Creator</h2>
            <div className="bg-card p-8 rounded-lg card-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-gradient">Shubham Kumar</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A passionate software engineer and cybersecurity specialist from Government Engineering College, Kishanganj. 
                This platform is the result of collaborative effort by four dedicated flatmates who believe in making 
                quality education accessible to everyone.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-sm">Software Engineer</Badge>
                <Badge variant="outline" className="text-sm">Cybersecurity Specialist</Badge>
                <Badge variant="outline" className="text-sm">Educational Technology</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">
              Have questions? We're here to help you succeed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground">+91 7667928057</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground">shubhammrdm394@gmail.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Feedback</h3>
              <p className="text-muted-foreground">Share your thoughts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto card-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Share Your Feedback</CardTitle>
              <CardDescription className="text-center">
                Help us improve VidyaSphere with your valuable suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Feedback</label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Share your thoughts, suggestions, or report any issues..."
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
