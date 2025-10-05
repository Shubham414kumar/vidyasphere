import { Link } from "react-router-dom";
import { FileText, Download, ChevronRight } from "lucide-react";
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
        
        {loading ? (
          <p className="text-center">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-muted-foreground">No notes available yet. Be the first to upload!</p>
        ) : (
          <div className="space-y-6">
            {/* Branch Selection */}
            {!selectedBranch && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Select Branch</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {branches.map(branch => (
                    <button
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch.id)}
                      className="p-6 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
                    >
                      <h3 className="text-xl font-bold flex items-center justify-between">
                        {branch.name}
                        <ChevronRight className="w-5 h-5" />
                      </h3>
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
                  className="text-primary mb-4 hover:underline"
                >
                  ← Back to Branches
                </button>
                <h2 className="text-2xl font-bold mb-4">Select Semester</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  {semesters.map(sem => (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className="p-6 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition"
                    >
                      <h3 className="text-xl font-bold flex items-center justify-between">
                        Semester {sem}
                        <ChevronRight className="w-5 h-5" />
                      </h3>
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
                  className="text-primary mb-4 hover:underline"
                >
                  ← Back to Semesters
                </button>
                <h2 className="text-2xl font-bold mb-4">Subjects</h2>
                {getUniqueSubjects(selectedBranch, selectedSemester).length === 0 ? (
                  <p className="text-center text-muted-foreground">No notes available for this semester yet.</p>
                ) : (
                  <div className="space-y-8">
                    {getUniqueSubjects(selectedBranch, selectedSemester).map(subject => (
                      <div key={subject} className="border rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <FileText className="w-6 h-6 text-primary" />
                          {subject}
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getNotesBySubject(selectedBranch, selectedSemester, subject).map(note => (
                            <div key={note.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                              <h4 className="font-bold mb-2">{note.title}</h4>
                              <a 
                                href={note.file_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
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
