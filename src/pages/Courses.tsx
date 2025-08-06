import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Star, Play, Download } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Complete Engineering Mathematics",
      description: "Comprehensive course covering all engineering mathematics topics for 1st and 2nd year students.",
      price: "₹2,999",
      originalPrice: "₹4,999",
      duration: "6 months",
      students: "1,200+",
      rating: 4.8,
      level: "Beginner to Advanced",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop&crop=center",
      topics: ["Calculus", "Linear Algebra", "Differential Equations", "Complex Numbers"]
    },
    {
      id: 2,
      title: "Class 12th Physics Mastery",
      description: "Complete Class 12 Physics course with theory, numericals, and exam preparation.",
      price: "₹1,999",
      originalPrice: "₹3,499",
      duration: "8 months",
      students: "800+",
      rating: 4.7,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop&crop=center",
      topics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"]
    },
    {
      id: 3,
      title: "Class 10th Complete Package",
      description: "All subjects covered for Class 10 board exam preparation with practice tests.",
      price: "₹1,499",
      originalPrice: "₹2,999",
      duration: "10 months",
      students: "1,500+",
      rating: 4.9,
      level: "Basic to Intermediate",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center",
      topics: ["Mathematics", "Science", "Social Science", "English"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <BookOpen className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Our Courses</h1>
            <p className="text-xl leading-relaxed opacity-90">
              Comprehensive courses designed by experts to help you excel in your academic journey. 
              From Class 10 to Engineering, we have courses for every level.
            </p>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Course Categories</h2>
            <p className="text-muted-foreground">Choose your path to success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="card-shadow hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Class 10th</CardTitle>
                <CardDescription>Foundation courses for board exam success</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-shadow hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Class 12th</CardTitle>
                <CardDescription>Advanced preparation for competitive exams</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-shadow hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle>Engineering</CardTitle>
                <CardDescription>Specialized courses for engineering students</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground">Our most popular and effective courses</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="card-shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90">
                      {course.level}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {course.topics.slice(0, 3).map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {course.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{course.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Courses?</h2>
            <p className="text-muted-foreground">Comprehensive learning experience designed for success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Video Lectures</h3>
              <p className="text-sm text-muted-foreground">High-quality recorded video lectures by expert teachers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Study Materials</h3>
              <p className="text-sm text-muted-foreground">Comprehensive notes and study materials for practice</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2">Live Sessions</h3>
              <p className="text-sm text-muted-foreground">Interactive live classes with doubt clearing sessions</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Assignments</h3>
              <p className="text-sm text-muted-foreground">Regular assignments and tests to track your progress</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;