import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, ChevronRight, Search, Filter, Eye, Edit2, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Batches = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPyq, setEditingPyq] = useState<any>(null);
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

  const { data: pyqs, isLoading } = useQuery({
    queryKey: ['pyqs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pyqs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('pyqs').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pyqs'] });
      toast.success("PYQ deleted successfully");
    },
    onError: () => toast.error("Failed to delete PYQ"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, title, year }: { id: string; title: string; year: number }) => {
      const { error } = await supabase
        .from('pyqs')
        .update({ title, year })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pyqs'] });
      toast.success("PYQ updated successfully");
      setEditingPyq(null);
    },
    onError: () => toast.error("Failed to update PYQ"),
  });

  const branches = Array.from(new Set(pyqs?.map(p => p.branch).filter(Boolean))) as string[];
  const semesters = Array.from(
    new Set(pyqs?.filter(p => p.branch === selectedBranch).map(p => p.semester).filter(Boolean))
  ) as string[];
  const subjects = Array.from(
    new Set(
      pyqs?.filter(p => p.branch === selectedBranch && p.semester === selectedSemester)
        .map(p => p.subject)
        .filter(Boolean)
    )
  ) as string[];

  const filteredPyqs = pyqs?.filter(p => 
    p.branch === selectedBranch && 
    p.semester === selectedSemester && 
    p.subject === selectedSubject &&
    (searchQuery === "" || p.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterYear === "" || p.year?.toString() === filterYear)
  );

  const availableYears = Array.from(
    new Set(pyqs?.map(p => p.year).filter(Boolean))
  ).sort((a, b) => (b as number) - (a as number));

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

  const resetFilters = () => {
    setSearchQuery("");
    setFilterYear("");
  };

  const handleSaveEdit = () => {
    if (editingPyq) {
      updateMutation.mutate({
        id: editingPyq.id,
        title: editingPyq.title,
        year: editingPyq.year
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Previous Year Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access previous year question papers organized by branch, semester, and subject
          </p>
          <div className="mt-6">
            <Link 
              to="/upload-content?type=pyq" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-xl transition-all font-semibold"
            >
              <Upload className="w-5 h-5" />
              Upload PYQ
            </Link>
          </div>
        </div>

        {(selectedBranch || selectedSemester || selectedSubject) && (
          <div className="mb-8 flex items-center gap-2 text-sm flex-wrap bg-card/50 backdrop-blur-sm p-4 rounded-lg border">
            <button onClick={() => { setSelectedBranch(""); setSelectedSemester(""); setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline font-medium">Home</button>
            {selectedBranch && (<><ChevronRight className="w-4 h-4 text-muted-foreground" /><button onClick={() => { setSelectedSemester(""); setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline font-medium">{selectedBranch}</button></>)}
            {selectedSemester && (<><ChevronRight className="w-4 h-4 text-muted-foreground" /><button onClick={() => { setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline font-medium">Semester {selectedSemester}</button></>)}
            {selectedSubject && (<><ChevronRight className="w-4 h-4 text-muted-foreground" /><span className="text-foreground font-semibold">{selectedSubject}</span></>)}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : !selectedBranch ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div 
                key={branch} 
                onClick={() => setSelectedBranch(branch)} 
                className="group bg-card/80 backdrop-blur-sm border rounded-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white font-bold">{branch.charAt(0).toUpperCase()}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{branch}</h3>
                <p className="text-muted-foreground text-sm">Click to view semesters</p>
              </div>
            ))}
          </div>
        ) : !selectedSemester ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {semesters.sort().map((semester) => (
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
            {subjects.map((subject) => (
              <div 
                key={subject} 
                onClick={() => setSelectedSubject(subject)} 
                className="group bg-card/80 backdrop-blur-sm border rounded-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{subject}</h3>
                <p className="text-muted-foreground text-sm">Click to view question papers</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card/80 backdrop-blur-sm border rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search question papers..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select 
                      value={filterYear} 
                      onChange={(e) => setFilterYear(e.target.value)} 
                      className="pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-background"
                    >
                      <option value="">All Years</option>
                      {availableYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  {(searchQuery || filterYear) && (
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
            
            {filteredPyqs && filteredPyqs.length > 0 ? (
              <div className="grid gap-4">
                {filteredPyqs.map((pyq) => (
                  <div 
                    key={pyq.id} 
                    className="bg-card/80 backdrop-blur-sm border rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                  >
                    {editingPyq?.id === pyq.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editingPyq.title}
                          onChange={(e) => setEditingPyq({ ...editingPyq, title: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        <input
                          type="number"
                          value={editingPyq.year}
                          onChange={(e) => setEditingPyq({ ...editingPyq, year: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPyq(null)}
                            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">{pyq.title}</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            {pyq.year && (
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                Year: {pyq.year}
                              </span>
                            )}
                            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium">
                              {pyq.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleView(pyq.file_url)}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(pyq.file_url, pyq.title)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            <Download className="w-5 h-5" />
                            Download
                          </button>
                          {isAdmin && (
                            <>
                              <button
                                onClick={() => setEditingPyq(pyq)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => deleteMutation.mutate(pyq.id)}
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
                  {searchQuery || filterYear ? "No question papers found matching your filters" : "No question papers available yet"}
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

export default Batches;