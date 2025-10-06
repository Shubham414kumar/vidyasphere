import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const Blogs = () => {
  const blogs = [
    { id: 1, title: "How to Prepare for Engineering Exams", category: "Engineering", date: "2025-01-15" },
    { id: 2, title: "Top Tips for Board Exams", category: "Boards", date: "2025-01-10" },
    { id: 3, title: "Time Management for Students", category: "Study Tips", date: "2025-01-05" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Blogs</h1>
        <div className="space-y-6">
          {blogs.map(blog => (
            <div key={blog.id} className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
              <span className="text-sm text-primary font-semibold">{blog.category}</span>
              <h3 className="text-2xl font-bold mt-2 mb-2">{blog.title}</h3>
              <p className="text-sm text-muted-foreground">Published on {blog.date}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
