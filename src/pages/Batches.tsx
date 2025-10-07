import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download, ChevronRight, FolderOpen, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Batches = () => {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: pyqs } = useQuery({
    queryKey: ["pyqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pyqs").select("*");
      if (error) throw error;
      return data;
    },
  });

  const branches = [...new Set(pyqs?.map((p) => p.branch).filter(Boolean))];
  const semesters = selectedBranch
    ? [...new Set(pyqs?.filter((p) => p.branch === selectedBranch).map((p) => p.semester).filter(Boolean))]
    : [];
  const subjects = selectedBranch && selectedSemester
    ? [...new Set(pyqs?.filter((p) => p.branch === selectedBranch && p.semester === selectedSemester).map((p) => p.subject).filter(Boolean))]
    : [];

  const filteredPyqs = pyqs?.filter(
    (p) =>
      (!selectedBranch || p.branch === selectedBranch) &&
      (!selectedSemester || p.semester === selectedSemester) &&
      (!selectedSubject || p.subject === selectedSubject)
  );

  const handleDownload = async (fileUrl: string, title: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: "Success", description: "Download started!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to download file", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Previous Year Questions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access comprehensive PYQs organized by branch, semester, and subject to ace your exams
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center animate-slide-up">
          {selectedBranch && (
            <button 
              onClick={() => { setSelectedBranch(null); setSelectedSemester(null); setSelectedSubject(null); }} 
              className="px-5 py-2.5 bg-white glass-effect border-2 border-primary/20 text-primary rounded-xl hover:border-primary hover:shadow-lg transition-all font-semibold"
            >
              ← All Branches
            </button>
          )}
          {selectedSemester && (
            <button 
              onClick={() => { setSelectedSemester(null); setSelectedSubject(null); }} 
              className="px-5 py-2.5 bg-white glass-effect border-2 border-secondary/20 text-secondary rounded-xl hover:border-secondary hover:shadow-lg transition-all font-semibold"
            >
              ← All Semesters
            </button>
          )}
          {selectedSubject && (
            <button 
              onClick={() => setSelectedSubject(null)} 
              className="px-5 py-2.5 bg-white glass-effect border-2 border-accent/20 text-accent rounded-xl hover:border-accent hover:shadow-lg transition-all font-semibold"
            >
              ← All Subjects
            </button>
          )}
        </div>

        {!selectedBranch ? (
          <div className="grid md:grid-cols-3 gap-6">
            {branches.length > 0 ? (
              branches.map((branch, idx) => (
                <button 
                  key={branch} 
                  onClick={() => setSelectedBranch(branch)} 
                  className="group bg-white glass-effect border-2 border-transparent rounded-2xl p-8 hover:border-primary hover:shadow-2xl transition-all duration-300 text-left hover-lift animate-fade-in" 
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <FolderOpen className="w-8 h-8 text-primary group-hover:scale-110 transition" />
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition">{branch}</h3>
                  <p className="text-muted-foreground">{pyqs?.filter((p) => p.branch === branch).length} PYQs available</p>
                </button>
              ))
            ) : (
              <div className="col-span-full text-center py-16 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">No PYQs Available Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Previous year questions will be available here soon. Check back later or contact us for more information.
                </p>
              </div>
            )}
          </div>
        ) : !selectedSemester ? (
          <div className="grid md:grid-cols-4 gap-6">
            {semesters.sort().map((semester, idx) => (
              <button 
                key={semester} 
                onClick={() => setSelectedSemester(semester)} 
                className="group bg-white glass-effect border-2 border-transparent rounded-2xl p-8 hover:border-secondary hover:shadow-2xl transition-all duration-300 text-center hover-lift animate-fade-in" 
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <div className="text-3xl font-bold text-secondary group-hover:scale-110 transition">{semester}</div>
                </div>
                <p className="font-semibold text-foreground mb-1">Semester {semester}</p>
                <p className="text-sm text-muted-foreground">{pyqs?.filter((p) => p.branch === selectedBranch && p.semester === semester).length} PYQs available</p>
              </button>
            ))}
          </div>
        ) : !selectedSubject ? (
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((subject, idx) => (
              <button 
                key={subject} 
                onClick={() => setSelectedSubject(subject)} 
                className="group bg-white glass-effect border-2 border-transparent rounded-2xl p-6 hover:border-primary hover:shadow-2xl transition-all duration-300 text-left hover-lift animate-fade-in" 
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary group-hover:scale-110 transition" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition">{subject}</h3>
                <p className="text-muted-foreground">{pyqs?.filter((p) => p.branch === selectedBranch && p.semester === selectedSemester && p.subject === subject).length} PYQs available</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto">
            {filteredPyqs?.map((pyq, idx) => (
              <div 
                key={pyq.id} 
                className="bg-white glass-effect border-2 border-transparent rounded-2xl p-6 md:p-8 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group animate-fade-in" 
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:gradient-text transition">{pyq.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-primary/10 to-primary/20 text-primary rounded-full text-sm font-semibold border border-primary/20">
                        {pyq.branch}
                      </span>
                      <span className="px-4 py-1.5 bg-gradient-to-r from-secondary/10 to-secondary/20 text-secondary rounded-full text-sm font-semibold border border-secondary/20">
                        Semester {pyq.semester}
                      </span>
                      <span className="px-4 py-1.5 bg-gradient-to-r from-accent/10 to-accent/20 text-accent rounded-full text-sm font-semibold border border-accent/20">
                        {pyq.subject}
                      </span>
                      {pyq.year && (
                        <span className="px-4 py-1.5 bg-muted/50 text-muted-foreground rounded-full text-sm font-medium border border-border">
                          {pyq.year}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownload(pyq.file_url, pyq.title)} 
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold hover-lift whitespace-nowrap"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Batches;
