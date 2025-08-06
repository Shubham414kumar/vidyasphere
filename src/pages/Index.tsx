import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Target, Calendar, Upload, GraduationCap, Phone, Mail, MessageCircle, Star, Clock, Heart, Lightbulb, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 educational-pattern"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">EduMitra</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Your comprehensive platform for Engineering, 10th, and 12th education. Learn, grow, and excel with our expert guidance and comprehensive resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link to="/batches">
                  <Users className="h-5 w-5 mr-2" />
                  Explore Batches
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/notes">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse Notes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EduMitra?</h2>
            <p className="text-xl text-muted-foreground">
              Engineering, 10th & 12th notes available. Future classes coming soon.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-shadow">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Comprehensive Notes</CardTitle>
                <CardDescription>Engineering, 10th & 12th study materials</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
                <CardTitle>Expert Batches</CardTitle>
                <CardDescription>Specialized courses with payment gateway</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-shadow">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-destructive" />
                <CardTitle>Attendance Tracker</CardTitle>
                <CardDescription>Track attendance & calculate 75% daily</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Creator */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">About the Creator</h2>
          <Card className="max-w-4xl mx-auto card-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Shubham Kumar</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Software Engineer & Cybersecurity Specialist from Begusarai. 
                This platform was created by four flatmates dedicated to making quality education accessible.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary">Software Engineer</Badge>
                <Badge variant="secondary">Cybersecurity Specialist</Badge>
                <Badge variant="secondary">From Begusarai</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="card-shadow">
              <CardHeader>
                <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-sm">Mobile: +91 7667928057</CardTitle>
              </CardHeader>
            </Card>
            <Card className="card-shadow">
              <CardHeader>
                <Phone className="h-8 w-8 mx-auto mb-2 text-accent" />
                <CardTitle className="text-sm">Support: +91 7903647547</CardTitle>
              </CardHeader>
            </Card>
            <Card className="card-shadow">
              <CardHeader>
                <Mail className="h-8 w-8 mx-auto mb-2 text-destructive" />
                <CardTitle className="text-sm">shubhammrdm394@gmail.com</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;