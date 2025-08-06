import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Calendar, User, Clock, Search, Lightbulb, TrendingUp } from "lucide-react";
import { useState } from "react";

const Blogs = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);

  const blogPosts = [
    {
      id: 1,
      title: "10 Effective Study Techniques for Board Exams",
      excerpt: "Discover proven study methods that can help you score better in your board examinations.",
      author: "Shubham Kumar",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Study Tips",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Mathematics Made Easy: Calculus Fundamentals",
      excerpt: "Breaking down complex calculus concepts into simple, understandable parts for engineering students.",
      author: "Shubham Kumar",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Mathematics",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Time Management Tips for Students",
      excerpt: "Learn how to balance studies, extracurricular activities, and personal time effectively.",
      author: "Shubham Kumar",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Physics Problem-Solving Strategies",
      excerpt: "Master the art of solving physics problems with these systematic approaches and techniques.",
      author: "Shubham Kumar",
      date: "2024-01-01",
      readTime: "7 min read",
      category: "Physics",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop&crop=center"
    }
  ];

  const categories = ["All", "Study Tips", "Mathematics", "Physics", "Productivity", "Career"];

  const generateTitleSuggestions = () => {
    if (!contentInput.trim()) {
      setSuggestedTitles([]);
      return;
    }

    // Simple AI-like title suggestions based on content keywords
    const suggestions = [
      "Mastering the Art of " + contentInput.split(' ').slice(0, 3).join(' '),
      "Complete Guide to " + contentInput.split(' ').slice(0, 3).join(' '),
      "Top 10 Tips for " + contentInput.split(' ').slice(0, 3).join(' '),
      "Understanding " + contentInput.split(' ').slice(0, 3).join(' ') + " Better",
      "Advanced Techniques in " + contentInput.split(' ').slice(0, 3).join(' ')
    ];
    
    setSuggestedTitles(suggestions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <PenTool className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">EduMitra Blogs</h1>
            <p className="text-xl leading-relaxed opacity-90">
              Knowledge sharing, study tips, and educational insights to help you in your academic journey.
              Learn from experiences and expert advice.
            </p>
          </div>
        </div>
      </section>

      {/* AI Blog Title Generator */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="card-shadow">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  AI Blog Title Generator
                </CardTitle>
                <CardDescription>
                  Enter your blog content snippet and get AI-powered title suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Blog Content Preview</label>
                  <Textarea
                    placeholder="Enter a snippet of your blog content here..."
                    value={contentInput}
                    onChange={(e) => setContentInput(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button onClick={generateTitleSuggestions} className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Title Suggestions
                </Button>
                
                {suggestedTitles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">Suggested Titles:</h3>
                    <div className="space-y-2">
                      {suggestedTitles.map((title, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto p-3"
                          onClick={() => setTitleInput(title)}
                        >
                          {title}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {titleInput && (
                  <div className="mt-4">
                    <label className="text-sm font-medium mb-2 block">Selected Title</label>
                    <Input
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder="Your blog title"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search blog posts..." className="pl-10" />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button key={category} variant="outline" size="sm" className="whitespace-nowrap">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="card-shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2 hover:text-primary cursor-pointer">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Write a Blog CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Share Your Knowledge</h2>
            <p className="text-muted-foreground mb-6">
              Have valuable insights or study tips? Write a blog post and help fellow students in their learning journey.
            </p>
            <Button size="lg">
              <PenTool className="h-5 w-5 mr-2" />
              Write a Blog Post
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;