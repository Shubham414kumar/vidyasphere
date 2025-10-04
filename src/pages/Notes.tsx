import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Notes = () => {
  const notes = [
    { id: 1, title: "Engineering Mathematics - Unit 1", category: "Engineering", subject: "Mathematics" },
    { id: 2, title: "Physics - Mechanics Notes", category: "Class 12", subject: "Physics" },
    { id: 3, title: "Chemistry - Organic Chemistry", category: "Class 12", subject: "Chemistry" },
    { id: 4, title: "Science - Complete Notes", category: "Class 10", subject: "Science" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Study Notes</h1>
          <Link to="/upload" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            Upload Notes
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notes.map(note => (
            <div key={note.id} className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <span className="text-sm text-primary font-semibold">{note.category}</span>
              <h3 className="text-lg font-bold mt-2 mb-1">{note.title}</h3>
              <p className="text-sm text-muted-foreground">{note.subject}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
