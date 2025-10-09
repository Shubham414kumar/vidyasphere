import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, ChevronRight, Search, Filter, Eye, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Notes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const queryClient = useQueryClient();

  // Check if user is admin
  useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      setIsAdmin(data?.role === 'admin');
      return data;
    },
  });

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      fetchNotes();
      toast.success("Note deleted successfully");
    },
    onError: () => toast.error("Failed to delete note"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, title, grade }: { id: string; title: string; grade: string }) => {
      const { error } = await supabase
        .from('notes')
        .update({ title, grade })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      fetchNotes();
      toast.success("Note updated successfully");
      setEditingNote(null);
    },
    onError: () => toast.error("Failed to update note"),
  });

  const branches = [
    { id: 'cse', name: 'Computer Science Engineering' },
    { id: 'ece', name: 'Electronics & Communication Engineering' },
    { id: 'me', name: 'Mechanical Engineering' },
    { id: 'ee', name: 'Electrical Engineering' },
    { id: 'ce', name: 'Civil Engineering' },
  ];

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const getUniqueSubjects = (branch: string, semester: string) => {
    return Array.from(new Set(notes.filter(note => note.branch === branch && note.semester === semester).map(note => note.subject).filter(Boolean)));
  };

  const getNotesBySubject = (branch: string, semester: string, subject: string) => {
    return notes.filter(note => note.branch === branch && note.semester === semester && note.subject === subject && (searchQuery === "" || note.title.toLowerCase().includes(searchQuery.toLowerCase())) && (filterGrade === "" || note.grade === filterGrade));
  };

  const availableGrades = Array.from(new Set(notes.map(n => n.grade).filter(Boolean))).sort();

  const handleDownload = async (fileUrl: string, title: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download started!");
    } catch (error) {
      toast.error("Failed to download file");
    }
  };

  const handleView = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const resetFilters = () => { setSearchQuery(""); setFilterGrade(""); };
  const subjects = selectedBranch && selectedSemester ? getUniqueSubjects(selectedBranch, selectedSemester) : [];
  const filteredNotes = selectedBranch && selectedSemester && selectedSubject ? getNotesBySubject(selectedBranch, selectedSemester, selectedSubject) : [];

  const handleSaveEdit = () => {
    if (editingNote) {
      updateMutation.mutate({
        id: editingNote.id,
        title: editingNote.title,
        grade: editingNote.grade
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Study Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Access comprehensive study notes organized by branch, semester, and subject</p>
        </div>

        {(selectedBranch || selectedSemester || selectedSubject) && (
          <div className="mb-8 flex items-center gap-2 text-sm flex-wrap bg-card/50 backdrop-blur-sm p-4 rounded-lg border">
            <button onClick={() => { setSelectedBranch(""); setSelectedSemester(""); setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline font-medium">Home</button>
            {selectedBranch && (<><ChevronRight className="w-4 h-4 text-muted-foreground" /><button onClick={() => { setSelectedSemester(""); setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline font-medium">{branches.find(b => b.id === selectedBranch)?.name}</button></>)}
            {selectedSemester && (<><ChevronRight className="w-4 h-4 text-muted-foreground" /><button onClick={() => { setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline font-medium">Semester {selectedSemester}</button></>)}
            {selectedSubject && (<><ChevronRight className="w-4 h-4 text-muted-foreground" /><span className="text-foreground font-semibold">{selectedSubject}</span></>)}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 bg-card/80 backdrop-blur-sm border rounded-xl"><p className="text-muted-foreground">No notes available yet</p></div>
        ) : !selectedBranch ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div 
                key={branch.id} 
                onClick={() => setSelectedBranch(branch.id)} 
                className="group bg-card/80 backdrop-blur-sm border rounded-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white font-bold">{branch.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{branch.name}</h3>
                <p className="text-muted-foreground text-sm">Click to view semesters</p>
              </div>
            ))}
          </div>
        ) : !selectedSemester ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {semesters.map((semester) => (
              <div 
                key={semester} 
                onClick={() => setSelectedSemester(semester)} 
                className="group bg-card/80 backdrop-blur-sm border rounded-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center hover:border-primary/50"
              >
                <div className="text-5xl font-bold gradient-text mb-2">{semester}</div>
                <h3 className="text-lg font-semibold mb-1">Semester</h3>
                <p className="text-muted-foreground text-sm">Click to view subjects</p>
              </div>
            ))}
          </div>
        ) : !selectedSubject ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.length > 0 ? subjects.map((subject) => (
              <div 
                key={subject} 
                onClick={() => setSelectedSubject(subject)} 
                className="group bg-card/80 backdrop-blur-sm border rounded-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{subject}</h3>
                <p className="text-muted-foreground text-sm">Click to view notes</p>
              </div>
            )) : (
              <div className="col-span-full text-center py-12 bg-card/80 backdrop-blur-sm border rounded-xl">
                <p className="text-muted-foreground">No subjects available for this combination</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card/80 backdrop-blur-sm border rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search notes..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select 
                      value={filterGrade} 
                      onChange={(e) => setFilterGrade(e.target.value)} 
                      className="pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-background"
                    >
                      <option value="">All Grades</option>
                      {availableGrades.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                  {(searchQuery || filterGrade) && (
                    <button 
                      onClick={resetFilters} 
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border rounded-lg hover:bg-accent transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {filteredNotes.length > 0 ? (
              <div className="grid gap-4">
                {filteredNotes.map((note) => (
                  <div 
                    key={note.id} 
                    className="bg-card/80 backdrop-blur-sm border rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                  >
                    {editingNote?.id === note.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editingNote.title}
                          onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        <input
                          type="text"
                          value={editingNote.grade || ''}
                          onChange={(e) => setEditingNote({ ...editingNote, grade: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Grade"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNote(null)}
                            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">{note.title}</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            {note.grade && (
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                Grade: {note.grade}
                              </span>
                            )}
                            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium">
                              {note.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleView(note.file_url)}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(note.file_url, note.title)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            <Download className="w-5 h-5" />
                            Download
                          </button>
                          {isAdmin && (
                            <>
                              <button
                                onClick={() => setEditingNote(note)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => deleteMutation.mutate(note.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card/80 backdrop-blur-sm border rounded-xl">
                <p className="text-muted-foreground">
                  {searchQuery || filterGrade ? "No notes found matching your filters" : "No notes available yet for this subject"}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Notes;