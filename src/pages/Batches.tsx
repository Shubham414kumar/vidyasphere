import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  Video,
  FileText,
  CheckCircle,
  Star
} from "lucide-react";

const Batches = () => {
  const batches = [
    {
      id: 1,
      title: "JEE Main Preparation",
      description: "Complete preparation for JEE Main with mock tests, doubt clearing sessions, and expert guidance",
      price: "₹2,999",
      originalPrice: "₹4,999",
      duration: "6 months",
      level: "Engineering",
      students: 156,
      rating: 4.8,
      features: [
        "Live interactive classes",
        "Recorded video lectures",
        "Weekly mock tests",
        "Doubt clearing sessions",
        "Study materials & notes",
        "Performance analytics"
      ],
      instructor: "Shubham Kumar",
      status: "Enrollment Open"
    },
    {
      id: 2,
      title: "Class 12th Board Prep",
      description: "Comprehensive Class 12 board exam preparation covering all subjects with previous year questions",
      price: "₹1,999",
      originalPrice: "₹3,499",
      duration: "4 months",
      level: "12th Grade",
      students: 234,
      rating: 4.9,
      features: [
        "Subject-wise preparation",
        "Board exam strategies",
        "Previous year questions",
        "Sample papers",
        "Revision sessions",
        "Expert tips & tricks"
      ],
      instructor: "Expert Faculty",
      status: "Enrollment Open"
    },
    {
      id: 3,
      title: "Class 10th Excellence",
      description: "Score high in Class 10 board examinations with our comprehensive study plan and expert guidance",
      price: "₹1,499",
      originalPrice: "₹2,999",
      duration: "3 months",
      level: "10th Grade",
      students: 189,
      rating: 4.7,
      features: [
        "All subjects covered",
        "Chapter-wise tests",
        "Board exam preparation",
        "Time management skills",
        "Practical guidance",
        "Parent-teacher meetings"
      ],
      instructor: "Experienced Teachers",
      status: "Enrollment Open"
    },
    {
      id: 4,
      title: "NEET Preparation",
      description: "Medical entrance exam preparation with focus on Biology, Chemistry, and Physics",
      price: "₹3,499",
      originalPrice: "₹5,999",
      duration: "8 months",
      level: "Medical",
      students: 98,
      rating: 4.9,
      features: [
        "NCERT-based curriculum",
        "Medical exam strategies",
        "Subject-wise tests",
        "Biology lab sessions",
        "Chemistry practicals",
        "Physics problem solving"
      ],
      instructor: "Medical Experts",
      status: "Starting Soon"
    },
    {
      id: 5,
      title: "Competitive Exam Prep",
      description: "Preparation for various competitive exams including SSC, Banking, and Government jobs",
      price: "₹1,799",
      originalPrice: "₹2,999",
      duration: "5 months",
      level: "Competitive",
      students: 145,
      rating: 4.6,
      features: [
        "Current affairs updates",
        "Quantitative aptitude",
        "Reasoning & logic",
        "English proficiency",
        "General knowledge",
        "Interview preparation"
      ],
      instructor: "Competition Experts",
      status: "Enrollment Open"
    },
    {
      id: 6,
      title: "Foundation Course",
      description: "Strong foundation building for students in Class 8th and 9th for future success",
      price: "₹999",
      originalPrice: "₹1,999",
      duration: "4 months",
      level: "Foundation",
      students: 167,
      rating: 4.8,
      features: [
        "Concept building",
        "Interactive learning",
        "Fun activities",
        "Regular assessments",
        "Parent updates",
        "Career guidance"
      ],
      instructor: "Foundation Specialists",
      status: "Enrollment Open"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Expert Batches</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join our carefully designed batches with expert instructors and comprehensive study materials. 
              Choose the perfect batch for your academic goals and start your journey to success.
            </p>
          </div>
        </div>
      </section>

      {/* Batches Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {batches.map((batch) => (
              <Card key={batch.id} className="card-shadow hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <Badge 
                        variant={batch.status === "Starting Soon" ? "outline" : "secondary"}
                        className="mb-2"
                      >
                        {batch.level}
                      </Badge>
                      <Badge 
                        variant={batch.status === "Starting Soon" ? "destructive" : "default"}
                        className="ml-2"
                      >
                        {batch.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{batch.price}</div>
                      <div className="text-sm text-muted-foreground line-through">{batch.originalPrice}</div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{batch.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {batch.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{batch.duration}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{batch.students}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{batch.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      What's Included:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {batch.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Award className="h-4 w-4 text-accent" />
                    <div>
                      <div className="text-sm font-medium">Instructor</div>
                      <div className="text-sm text-muted-foreground">{batch.instructor}</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    asChild
                    disabled={batch.status === "Starting Soon"}
                  >
                    <Link to={`/payment?batch=${batch.id}&title=${encodeURIComponent(batch.title)}&price=${batch.price}`}>
                      {batch.status === "Starting Soon" ? "Notify Me" : "Enroll Now"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Batches */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Our Batches?</h2>
              <p className="text-xl text-muted-foreground">
                We provide more than just courses - we provide a complete learning experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Live Classes</h3>
                <p className="text-sm text-muted-foreground">Interactive live sessions with expert instructors</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Study Materials</h3>
                <p className="text-sm text-muted-foreground">Comprehensive notes and practice materials</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mock Tests</h3>
                <p className="text-sm text-muted-foreground">Regular assessments and performance tracking</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Doubt Support</h3>
                <p className="text-sm text-muted-foreground">24/7 doubt clearing and expert guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Batches;