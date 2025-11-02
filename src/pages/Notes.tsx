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
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
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
  const years = [2020, 2021, 2022, 2023, 2024, 2025];

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
        if (selectedYear && note.year !== selectedYear) return false;
        if (selectedSubject && note.subject !== selectedSubject) return false;
        return true;
      })
      .map(note => note[key])
      .filter(Boolean);
    return Array.from(new Set(values)).sort();
  };

  const filteredNotes = notes.filter(note => {
    if (!selectedBranch || !selectedSemester || !selectedYear || !selectedSubject) return false;
    
    const matchesFilters = 
      note.branch === selectedBranch &&
      note.semester === selectedSemester &&
      note.year === selectedYear &&
      note.subject === selectedSubject;
    
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilters && matchesSearch;
  });

  const resetNavigation = () => {
    setSelectedBranch(null);
    setSelectedSemester(null);
    setSelectedYear(null);
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
                  <button onClick={() => { setSelectedSemester(null); setSelectedYear(null); setSelectedSubject(null); }} className="hover:text-primary transition-colors">
                    {selectedBranch}
                  </button>
                </>
              )}
              {selectedSemester && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <button onClick={() => { setSelectedYear(null); setSelectedSubject(null); }} className="hover:text-primary transition-colors">
                    Semester {selectedSemester}
                  </button>
                </>
              )}
              {selectedYear && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <button onClick={() => setSelectedSubject(null)} className="hover:text-primary transition-colors">
                    Year {selectedYear}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {branches.map((branch) => (
                      <button
                        key={branch}
                        onClick={() => setSelectedBranch(branch)}
                        className="p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all text-left group"
                      >
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {branch}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Click to view semesters
                        </p>
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
                        className="p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all group"
                      >
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          Semester {sem}
                        </h3>
                      </button>
                    ))}
                  </div>
                )}

                {/* Year Selection */}
                {selectedBranch && selectedSemester && !selectedYear && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className="p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all group"
                      >
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          Year {year}
                        </h3>
                      </button>
                    ))}
                  </div>
                )}

                {/* Subject Selection */}
                {selectedBranch && selectedSemester && selectedYear && !selectedSubject && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getUniqueValues("subject").length > 0 ? (
                      getUniqueValues("subject").map((subject) => (
                        <button
                          key={subject}
                          onClick={() => setSelectedSubject(subject as string)}
                          className="p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all text-left group"
                        >
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {subject}
                          </h3>
                        </button>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12 text-muted-foreground">
                        No subjects available for this selection
                      </div>
                    )}
                  </div>
                )}

                {/* Notes List */}
                {selectedBranch && selectedSemester && selectedYear && selectedSubject && (
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
                      <div className="text-center py-12 text-muted-foreground">
                        No notes found for this selection
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredNotes.map((note) => (
                          <div
                            key={note.id}
                            className="p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                  <span className="px-3 py-1 bg-primary/10 rounded-full">
                                    {note.branch}
                                  </span>
                                  <span className="px-3 py-1 bg-secondary/10 rounded-full">
                                    Sem {note.semester}
                                  </span>
                                  <span className="px-3 py-1 bg-accent/10 rounded-full">
                                    {note.year}
                                  </span>
                                  <span className="px-3 py-1 bg-muted rounded-full">
                                    {note.subject}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <a
                                  href={note.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <Eye className="w-5 h-5" />
                                </a>
                                <a
                                  href={note.file_url}
                                  download
                                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                  title="Download"
                                >
                                  <Download className="w-5 h-5" />
                                </a>
                                {isAdmin && (
                                  <button
                                    onClick={() => handleDelete(note.id)}
                                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-5 h-5" />
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
