import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Users, Calendar, BookOpen } from "lucide-react";

const Courses = () => {
  const courses = [
    { id: 1, title: "Engineering - Complete Course", category: "Engineering", price: 4999, image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400" },
    { id: 2, title: "Class 10th - All Subjects", category: "Class 10", price: 2999, image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400" },
    { id: 3, title: "Class 12th - Science Stream", category: "Class 12", price: 3499, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400" },
  ];

  const { data: batches } = useQuery({
    queryKey: ["batches"],
    queryFn: async () => {
      const { data, error } = await supabase.from("batches").select("*");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <nav className="bg-card shadow-lg border-b sticky top-0 z-10 backdrop-blur-sm bg-card/90">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition flex items-center gap-2">
            <GraduationCap className="w-8 h-8" />
            <span>← Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">Our Courses & Batches</h1>
          <p className="text-muted-foreground text-lg">Choose from our comprehensive courses and live batch sessions</p>
        </div>

        {/* Courses Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Available Courses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div key={course.id} className="group bg-card border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {course.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition">{course.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-3xl font-bold text-primary">₹{course.price}</p>
                    <span className="text-sm text-muted-foreground">one-time</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Batches Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-accent" />
            <h2 className="text-3xl font-bold">Live Batch Sessions</h2>
          </div>
          {batches && batches.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {batches.map((batch, idx) => (
                <div key={batch.id} className="group bg-card border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold flex-1">{batch.name}</h3>
                  </div>
                  <div className="space-y-3 mb-6">
                    <p className="text-muted-foreground flex items-center gap-2">
                      <span className="font-semibold text-foreground">Schedule:</span> {batch.schedule}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <span className="font-semibold text-foreground">Available Seats:</span> 
                      <span className="text-accent font-bold">{batch.max_students - batch.current_students}</span>
                    </p>
                    {batch.start_date && (
                      <p className="text-muted-foreground flex items-center gap-2">
                        <span className="font-semibold text-foreground">Starts:</span> {new Date(batch.start_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-3xl font-bold text-accent">₹{batch.price}</p>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl">
                    Join Batch
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border rounded-2xl p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No batches available at the moment. Check back soon!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Courses;
