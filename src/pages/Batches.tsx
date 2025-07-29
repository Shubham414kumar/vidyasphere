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
      title: "1st Semester - Engineering Mathematics & Physics",
      description: "Complete coverage of Mathematics-I, Applied Physics, and Engineering Graphics for BEU first semester",
      price: "₹1,499",
      originalPrice: "₹2,499",
      duration: "6 months",
      level: "1st Semester",
      students: 124,
      rating: 4.8,
      features: [
        "Engineering Mathematics-I",
        "Applied Physics Lab",
        "Engineering Graphics",
        "Basic Electrical Engineering",
        "Workshop Practice",
        "Previous year papers"
      ],
      instructor: "BEU Faculty",
      status: "Enrollment Open"
    },
    {
      id: 2,
      title: "2nd Semester - Chemistry & Programming",
      description: "Engineering Chemistry, Programming in C, and Mathematics-II specially designed for BEU students",
      price: "₹1,499",
      originalPrice: "₹2,499",
      duration: "6 months",
      level: "2nd Semester",
      students: 98,
      rating: 4.9,
      features: [
        "Engineering Chemistry",
        "Programming in C",
        "Mathematics-II",
        "Basic Electronics",
        "Environmental Studies",
        "Lab practicals included"
      ],
      instructor: "BEU Faculty",
      status: "Enrollment Open"
    },
    {
      id: 3,
      title: "3rd Semester - Core Engineering Subjects",
      description: "Data Structures, Digital Electronics, and Engineering subjects as per BEU curriculum",
      price: "₹1,699",
      originalPrice: "₹2,799",
      duration: "6 months",
      level: "3rd Semester",
      students: 156,
      rating: 4.7,
      features: [
        "Data Structures & Algorithms",
        "Digital Logic Design",
        "Network Theory",
        "Engineering Mechanics",
        "Material Science",
        "Assignment solutions"
      ],
      instructor: "BEU Faculty",
      status: "Enrollment Open"
    },
    {
      id: 4,
      title: "4th Semester - Advanced Programming & Systems",
      description: "Object Oriented Programming, Computer Organization, and Mathematics-III for BEU students",
      price: "₹1,699",
      originalPrice: "₹2,799",
      duration: "6 months",
      level: "4th Semester",
      students: 134,
      rating: 4.8,
      features: [
        "Object Oriented Programming",
        "Computer Organization",
        "Mathematics-III",
        "Electronic Devices",
        "Engineering Economics",
        "Mini project guidance"
      ],
      instructor: "BEU Faculty",
      status: "Enrollment Open"
    },
    {
      id: 5,
      title: "5th Semester - Software Engineering & DBMS",
      description: "Database Management Systems, Software Engineering, and core computer science subjects",
      price: "₹1,899",
      originalPrice: "₹2,999",
      duration: "6 months",
      level: "5th Semester",
      students: 89,
      rating: 4.9,
      features: [
        "Database Management Systems",
        "Software Engineering",
        "Computer Networks",
        "Theory of Computation",
        "Microprocessor & Interfacing",
        "Project work guidance"
      ],
      instructor: "BEU Faculty",
      status: "Enrollment Open"
    },
    {
      id: 6,
      title: "6th Semester - Advanced Computer Science",
      description: "Operating Systems, Compiler Design, and advanced topics as per BEU syllabus",
      price: "₹1,899",
      originalPrice: "₹2,999",
      duration: "6 months",
      level: "6th Semester",
      students: 76,
      rating: 4.8,
      features: [
        "Operating Systems",
        "Compiler Design",
        "Computer Graphics",
        "Artificial Intelligence",
        "Web Technologies",
        "Industry projects"
      ],
      instructor: "BEU Faculty",
      status: "Enrollment Open"
    },
    {
      id: 7,
      title: "7th Semester - Specialization & Electives",
      description: "Machine Learning, Cyber Security, and elective subjects preparation for BEU final year",
      price: "₹2,099",
      originalPrice: "₹3,299",
      duration: "6 months",
      level: "7th Semester",
      students: 67,
      rating: 4.9,
      features: [
        "Machine Learning",
        "Cyber Security",
        "Mobile Application Development",
        "Cloud Computing",
        "Elective subjects",
        "Placement preparation"
      ],
      instructor: "BEU Faculty",
      status: "Enrollment Open"
    },
    {
      id: 8,
      title: "8th Semester - Final Year Project & Placement",
      description: "Major project guidance, placement preparation, and final semester subjects for BEU students",
      price: "₹2,099",
      originalPrice: "₹3,299",
      duration: "6 months",
      level: "8th Semester",
      students: 45,
      rating: 4.9,
      features: [
        "Major Project Guidance",
        "Placement Training",
        "Industrial Training",
        "Technical Interview Prep",
        "Resume Building",
        "Final exam preparation"
      ],
      instructor: "BEU Faculty & Industry Experts",
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
            <h1 className="text-5xl font-bold mb-6">BEU Semester Batches</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Complete semester-wise preparation for Bihar Engineering University (BEU) students. 
              Join our specialized batches covering all 8 semesters of your 4-year engineering program.
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
              <h2 className="text-4xl font-bold mb-4">Why Choose Our BEU Batches?</h2>
              <p className="text-xl text-muted-foreground">
                Specifically designed for Bihar Engineering University curriculum and syllabus
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