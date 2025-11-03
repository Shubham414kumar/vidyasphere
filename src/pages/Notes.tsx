import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search, Upload, Download, Edit, Trash2, Eye, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Note = {
  id: string;
  title: string;
  branch: string;
  semester: string;
  year: number;
  subject: string;
  file_url: string;
  category: string;
  uploaded_by: string;
};

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Navigation state
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const branches = [
    "Computer Science",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electronics & Communication",
    "Electrical Engineering",
    "Chemical Engineering",
  ];

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  useEffect(() => {
    checkAdminStatus();
    fetchNotes();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    }
  };

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
      toast.success("Note deleted successfully");
      fetchNotes();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUniqueValues = (key: keyof Note) => {
    const values = notes
      .filter(note => {
        if (selectedBranch && note.branch !== selectedBranch) return false;
        if (selectedSemester && note.semester !== selectedSemester) return false;
        if (selectedSubject && note.subject !== selectedSubject) return false;
        return true;
      })
      .map(note => note[key])
      .filter(Boolean);
    return Array.from(new Set(values)).sort();
  };

  const filteredNotes = notes.filter(note => {
    if (!selectedBranch || !selectedSemester || !selectedSubject) return false;
    
    const matchesFilters = 
      note.branch === selectedBranch &&
      note.semester === selectedSemester &&
      note.subject === selectedSubject;
    
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilters && matchesSearch;
  });

  const resetNavigation = () => {
    setSelectedBranch(null);
    setSelectedSemester(null);
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-8 shadow-lg animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold flex items-center gap-2 gradient-text">
                <BookOpen className="w-8 h-8" />
                Study Notes
              </h1>
              <button
                onClick={() => navigate("/upload-content?type=note")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-xl transition-all"
              >
                <Upload className="w-4 h-4" />
                Upload Note
              </button>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <button onClick={resetNavigation} className="hover:text-primary transition-colors">
                All Branches
              </button>
              {selectedBranch && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <button onClick={() => { setSelectedSemester(null); setSelectedSubject(null); }} className="hover:text-primary transition-colors">
                    {selectedBranch}
                  </button>
                </>
              )}
              {selectedSemester && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <button onClick={() => setSelectedSubject(null)} className="hover:text-primary transition-colors">
                    Semester {selectedSemester}
                  </button>
                </>
              )}
              {selectedSubject && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-primary font-semibold">{selectedSubject}</span>
                </>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading notes...</p>
              </div>
            ) : (
              <>
                {/* Branch Selection */}
                {!selectedBranch && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {branches.map((branch) => (
                      <button
                        key={branch}
                        onClick={() => setSelectedBranch(branch)}
                        className="p-8 bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border/50 rounded-2xl hover:border-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors relative z-10 mb-2">
                          {branch}
                        </h3>
                        <p className="text-sm text-muted-foreground relative z-10">
                          Click to view semesters
                        </p>
                        <ChevronRight className="w-6 h-6 absolute bottom-4 right-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Semester Selection */}
                {selectedBranch && !selectedSemester && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {semesters.map((sem) => (
                      <button
                        key={sem}
                        onClick={() => setSelectedSemester(sem)}
                        className="p-8 bg-gradient-to-br from-card to-secondary/10 border-2 border-border/50 rounded-2xl hover:border-secondary hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <h3 className="font-bold text-2xl group-hover:text-secondary transition-colors relative z-10">
                          Sem {sem}
                        </h3>
                      </button>
                    ))}
                  </div>
                )}

                {/* Subject Selection */}
                {selectedBranch && selectedSemester && !selectedSubject && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getUniqueValues("subject").length > 0 ? (
                      getUniqueValues("subject").map((subject) => (
                        <button
                          key={subject}
                          onClick={() => setSelectedSubject(subject as string)}
                          className="p-6 bg-gradient-to-br from-card to-accent/10 border-2 border-border/50 rounded-2xl hover:border-accent hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <h3 className="font-semibold text-lg group-hover:text-accent transition-colors relative z-10">
                            {subject}
                          </h3>
                          <ChevronRight className="w-5 h-5 absolute bottom-4 right-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                        </button>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12 text-muted-foreground bg-card/50 rounded-xl border border-dashed">
                        No subjects available for this selection
                      </div>
                    )}
                  </div>
                )}

                {/* Notes List */}
                {selectedBranch && selectedSemester && selectedSubject && (
                  <>
                    <div className="mb-6 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      />
                    </div>

                    {filteredNotes.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground bg-card/50 rounded-xl border border-dashed">
                        No notes found for this selection
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredNotes.map((note) => (
                          <div
                            key={note.id}
                            className="group p-6 bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border/50 rounded-2xl hover:border-primary hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex-1 pr-4">
                                  {note.title}
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                                  {note.branch}
                                </span>
                                <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                                  Sem {note.semester}
                                </span>
                                {note.year && (
                                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                                    {note.year}
                                  </span>
                                )}
                                <span className="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-medium">
                                  {note.subject}
                                </span>
                              </div>
                              <div className="flex gap-2 pt-4 border-t border-border/50">
                                <a
                                  href={note.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg transition-all font-medium"
                                  title="View"
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </a>
                                <a
                                  href={note.file_url}
                                  download
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary hover:text-secondary-foreground rounded-lg transition-all font-medium"
                                  title="Download"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </a>
                                {isAdmin && (
                                  <button
                                    onClick={() => handleDelete(note.id)}
                                    className="px-4 py-2 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-all"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
