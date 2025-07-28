import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Download, 
  Upload, 
  Calendar, 
  FileText,
  Star,
  Eye,
  Filter,
  BookOpen
} from "lucide-react";

const PYQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const categories = ["All", "Engineering", "JEE Main", "JEE Advanced", "NEET", "12th Board", "10th Board", "Competitive"];
  const years = ["All", "2024", "2023", "2022", "2021", "2020", "2019"];

  const pyqs = [
    {
      id: 1,
      title: "JEE Main Mathematics 2024",
      exam: "JEE Main",
      subject: "Mathematics",
      year: "2024",
      category: "Engineering",
      description: "Complete question paper with solutions for JEE Main 2024 Mathematics section",
      questions: 30,
      difficulty: "Medium",
      downloads: 2341,
      rating: 4.9,
      uploadedBy: "VidyaSphere Team",
      date: "2024-02-01",
      hasSolutions: true
    },
    {
      id: 2,
      title: "CBSE Class 12 Physics Board 2023",
      exam: "CBSE Board",
      subject: "Physics",
      year: "2023",
      category: "12th Board",
      description: "CBSE Class 12 Physics board exam question paper with detailed solutions",
      questions: 35,
      difficulty: "Medium",
      downloads: 1876,
      rating: 4.8,
      uploadedBy: "Expert Faculty",
      date: "2023-05-15",
      hasSolutions: true
    },
    {
      id: 3,
      title: "NEET Biology 2024",
      exam: "NEET",
      subject: "Biology",
      year: "2024",
      category: "NEET",
      description: "NEET 2024 Biology questions with comprehensive explanations and concepts",
      questions: 50,
      difficulty: "Hard",
      downloads: 3245,
      rating: 4.9,
      uploadedBy: "Medical Experts",
      date: "2024-05-20",
      hasSolutions: true
    },
    {
      id: 4,
      title: "JEE Advanced Chemistry 2023",
      exam: "JEE Advanced",
      subject: "Chemistry",
      year: "2023",
      category: "Engineering",
      description: "JEE Advanced Chemistry paper with step-by-step solutions and concepts",
      questions: 18,
      difficulty: "Hard",
      downloads: 1567,
      rating: 4.7,
      uploadedBy: "IIT Faculty",
      date: "2023-06-10",
      hasSolutions: true
    },
    {
      id: 5,
      title: "CBSE Class 10 Mathematics 2024",
      exam: "CBSE Board",
      subject: "Mathematics",
      year: "2024",
      category: "10th Board",
      description: "Class 10 board exam mathematics paper with complete solutions",
      questions: 40,
      difficulty: "Easy",
      downloads: 4321,
      rating: 4.6,
      uploadedBy: "Board Teachers",
      date: "2024-03-15",
      hasSolutions: true
    },
    {
      id: 6,
      title: "SSC CGL General Awareness 2023",
      exam: "SSC CGL",
      subject: "General Awareness",
      year: "2023",
      category: "Competitive",
      description: "SSC CGL General Awareness questions with current affairs and static GK",
      questions: 25,
      difficulty: "Medium",
      downloads: 987,
      rating: 4.5,
      uploadedBy: "SSC Experts",
      date: "2023-12-05",
      hasSolutions: false
    }
  ];

  const filteredPYQs = pyqs.filter(pyq => {
    const matchesSearch = pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pyq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pyq.exam.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || pyq.category === selectedCategory;
    const matchesYear = selectedYear === "All" || pyq.year === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Previous Year Questions</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Master your exams with our extensive collection of previous year questions from JEE, NEET, 
              Board exams, and competitive exams. Practice with authentic papers and detailed solutions.
            </p>
            
            {/* Upload Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="mb-8">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload PYQ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Previous Year Question</DialogTitle>
                  <DialogDescription>
                    Help the community by sharing previous year question papers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Exam Name</label>
                    <Input placeholder="e.g., JEE Main, NEET, CBSE Board" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <Input placeholder="e.g., Mathematics, Physics, Chemistry" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Year</label>
                      <Input placeholder="2024" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option>Engineering</option>
                        <option>NEET</option>
                        <option>12th Board</option>
                        <option>10th Board</option>
                        <option>Competitive</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Question Paper</label>
                    <Input type="file" accept=".pdf,.doc,.docx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Solutions (Optional)</label>
                    <Input type="file" accept=".pdf,.doc,.docx" />
                  </div>
                  <Button className="w-full">Upload PYQ</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by exam, subject, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PYQ Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredPYQs.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No PYQs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPYQs.map((pyq) => (
                <Card key={pyq.id} className="card-shadow hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <Badge variant="secondary">{pyq.category}</Badge>
                        <Badge variant="outline" className="ml-2">{pyq.year}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{pyq.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{pyq.title}</CardTitle>
                    <CardDescription className="text-sm">
                      <span className="font-medium">{pyq.exam}</span> • {pyq.subject}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {pyq.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {pyq.questions} questions
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {pyq.downloads} downloads
                      </div>
                      <div>
                        Difficulty: <span className={`font-medium ${
                          pyq.difficulty === 'Easy' ? 'text-green-600' :
                          pyq.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>{pyq.difficulty}</span>
                      </div>
                      <div>
                        {pyq.hasSolutions ? (
                          <span className="text-green-600 font-medium">✓ Solutions</span>
                        ) : (
                          <span className="text-muted-foreground">No solutions</span>
                        )}
                      </div>
                    </div>

                    {/* Upload Info */}
                    <div className="text-xs text-muted-foreground border-t pt-2">
                      Uploaded by: <span className="font-medium">{pyq.uploadedBy}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our PYQ Collection</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive question papers from top exams across India
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Question Papers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Different Exams</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-sm text-muted-foreground">Years Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto card-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Contribute to Our PYQ Database</CardTitle>
              <CardDescription>
                Help fellow students by sharing previous year question papers from your exams
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">Easy Upload</h3>
                  <p className="text-sm text-muted-foreground">Quick and simple upload process</p>
                </div>
                <div>
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <h3 className="font-semibold mb-1">Help Students</h3>
                  <p className="text-sm text-muted-foreground">Your contribution helps thousands</p>
                </div>
                <div>
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold mb-1">Build Reputation</h3>
                  <p className="text-sm text-muted-foreground">Get recognized in the community</p>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload PYQ Paper
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Previous Year Question</DialogTitle>
                    <DialogDescription>
                      Upload authentic question papers to help the community
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Exam name (e.g., JEE Main 2024)" />
                    <Input placeholder="Subject" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Year" />
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option>Category</option>
                        <option>Engineering</option>
                        <option>NEET</option>
                        <option>Board Exam</option>
                        <option>Competitive</option>
                      </select>
                    </div>
                    <Input type="file" accept=".pdf,.doc,.docx" />
                    <textarea 
                      className="w-full px-3 py-2 border border-input rounded-md" 
                      rows={3}
                      placeholder="Description"
                    ></textarea>
                    <Button className="w-full">Upload PYQ</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PYQ;