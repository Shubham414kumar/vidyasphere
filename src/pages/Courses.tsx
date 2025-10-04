import { Link } from "react-router-dom";

const Courses = () => {
  const courses = [
    { id: 1, title: "Engineering - Complete Course", category: "Engineering", price: 4999, image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400" },
    { id: 2, title: "Class 10th - All Subjects", category: "Class 10", price: 2999, image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400" },
    { id: 3, title: "Class 12th - Science Stream", category: "Class 12", price: 3499, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Courses</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-sm text-primary font-semibold">{course.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-4">{course.title}</h3>
                <p className="text-2xl font-bold text-primary mb-4">₹{course.price}</p>
                <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
