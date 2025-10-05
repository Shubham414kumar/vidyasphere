import { Link } from "react-router-dom";
import { FileText, Download, ChevronRight, BookOpen, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Notes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const branches = [
    { id: "computer-science", name: "Computer Science" },
    { id: "civil-engineering", name: "Civil Engineering" },
    { id: "mechanical-engineering", name: "Mechanical Engineering" },
    { id: "ece", name: "Electronics & Communication" },
    { id: "electrical-engineering", name: "Electrical Engineering" },
    { id: "chemical-engineering", name: "Chemical Engineering" },
  ];

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const getUniqueSubjects = (branch: string, semester: string) => {
    return [...new Set(
      notes
        .filter(note => note.branch === branch && note.semester === semester)
        .map(note => note.subject)
    )];
  };

  const getNotesBySubject = (branch: string, semester: string, subject: string) => {
    return notes.filter(
      note => note.branch === branch && note.semester === semester && note.subject === subject
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <nav className="bg-card shadow-lg border-b sticky top-0 z-10 backdrop-blur-sm bg-card/90">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            <span>← Back to Home</span>
          </Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12 animate-fade-in">
          <div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">Study Notes</h1>
            <p className="text-muted-foreground text-lg">Access comprehensive notes organized by branch and semester</p>
          </div>
          <Link to="/upload" className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition font-semibold shadow-lg hover:shadow-xl">
            Upload Notes
          </Link>
        </div>
        
        {loading ? (
          <p className="text-center text-muted-foreground text-lg">Loading notes...</p>
        ) : notes.length === 0 ? (
          <div className="bg-card border rounded-2xl p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No notes available yet. Be the first to upload!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Branch Selection */}
            {!selectedBranch && (
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <FolderOpen className="w-8 h-8 text-primary" />
                  Select Branch
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {branches.map((branch, idx) => (
                    <button
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch.id)}
                      className="group bg-card border-2 rounded-2xl p-8 hover:border-primary hover:shadow-2xl transition-all duration-300 text-left hover:-translate-y-2 animate-fade-in"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <FolderOpen className="w-12 h-12 text-primary group-hover:scale-110 transition" />
                        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition" />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition">{branch.name}</h3>
                      <p className="text-muted-foreground mt-2">{notes.filter(n => n.branch === branch.id).length} notes available</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Semester Selection */}
            {selectedBranch && !selectedSemester && (
              <div>
                <button 
                  onClick={() => setSelectedBranch(null)}
                  className="text-primary mb-6 hover:underline font-semibold flex items-center gap-2"
                >
                  ← Back to Branches
                </button>
                <h2 className="text-3xl font-bold mb-6">Select Semester</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {semesters.map((sem, idx) => (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className="group bg-card border-2 rounded-2xl p-6 hover:border-accent hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-2 animate-fade-in"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition">{sem}</div>
                      <p className="text-muted-foreground">Semester</p>
                      <p className="text-sm text-muted-foreground mt-2">{notes.filter(n => n.branch === selectedBranch && n.semester === sem).length} notes</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subject & Notes Display */}
            {selectedBranch && selectedSemester && (
              <div>
                <button 
                  onClick={() => setSelectedSemester(null)}
                  className="text-primary mb-6 hover:underline font-semibold flex items-center gap-2"
                >
                  ← Back to Semesters
                </button>
                <h2 className="text-3xl font-bold mb-6">Subjects</h2>
                {getUniqueSubjects(selectedBranch, selectedSemester).length === 0 ? (
                  <div className="bg-card border rounded-2xl p-12 text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">No notes available for this semester yet.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {getUniqueSubjects(selectedBranch, selectedSemester).map((subject, idx) => (
                      <div key={subject} className="bg-card border-2 rounded-2xl p-6 hover:shadow-xl transition-all animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                          {subject}
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getNotesBySubject(selectedBranch, selectedSemester, subject).map((note) => (
                            <div key={note.id} className="group bg-background border rounded-xl p-5 hover:shadow-lg hover:border-primary transition-all hover:-translate-y-1">
                              <h4 className="font-bold mb-4 group-hover:text-primary transition">{note.title}</h4>
                              {note.grade && (
                                <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm mb-3">
                                  {note.grade}
                                </span>
                              )}
                              <a 
                                href={note.file_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
