import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Clock, Users, Calendar, IndianRupee, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Engineering Mathematics",
      description: "Complete mathematics course for engineering students",
      price: 2999,
      duration: "3 months",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500"
    },
    {
      id: 2,
      title: "Class 10 Science",
      description: "Comprehensive science preparation for CBSE board exams",
      price: 1999,
      duration: "6 months",
      category: "Class 10",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500"
    },
    {
      id: 3,
      title: "Class 12 Physics",
      description: "Advanced physics concepts with practical applications",
      price: 2499,
      duration: "4 months",
      category: "Class 12",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500"
    }
  ];

  const { data: batches, isLoading } = useQuery({
    queryKey: ["batches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("batches")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const categories = ["all", "Engineering", "Class 10", "Class 12"];

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0wLTRoLTJ2Mmgydi0yem0yIDJ2LTJoLTJ2Mmgyem0wIDR2LTJoLTJ2Mmgyem0yLTJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0tMi00di0yaC0ydjJoMnptLTItMnYtMmgtMnYyaDJ6bTItMnYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0wLTRoLTJ2Mmgydi0yem0yIDJ2LTJoLTJ2Mmgyem0wIDR2LTJoLTJ2Mmgyem0yLTJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-slide-down">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Courses</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Explore Our <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "0.1s"}}>
            Choose from our expertly designed courses for Engineering, Class 10, and Class 12 students
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter by Category:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {cat === "all" ? "All Courses" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <div 
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover-lift animate-fade-in"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary">
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-semibold text-foreground">{course.price}</span>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Batches Section */}
      {batches && batches.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Live Sessions</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Active <span className="gradient-text">Batches</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our ongoing batches for interactive learning experiences
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {batches.map((batch, idx) => (
                  <div 
                    key={batch.id}
                    className="bg-white rounded-2xl p-6 border border-border hover-lift animate-fade-in"
                    style={{animationDelay: `${idx * 0.1}s`}}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold">{batch.name}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {batch.schedule && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm">{batch.schedule}</span>
                        </div>
                      )}
                      {batch.start_date && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm">Starts: {new Date(batch.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          {batch.current_students}/{batch.max_students} students enrolled
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-bold gradient-text">
                          {batch.price}
                        </span>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                      Join Batch
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Courses;
