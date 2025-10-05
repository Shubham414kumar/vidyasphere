import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download, ChevronRight, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <nav className="bg-card shadow-lg border-b sticky top-0 z-10 backdrop-blur-sm bg-card/90">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition flex items-center gap-2">
            <FileText className="w-8 h-8" />
            <span>← Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">Previous Year Questions</h1>
          <p className="text-muted-foreground text-lg">Access PYQs organized by branch, semester, and subject</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {selectedBranch && (
            <button onClick={() => { setSelectedBranch(null); setSelectedSemester(null); setSelectedSubject(null); }} className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition">
              All Branches
            </button>
          )}
          {selectedSemester && (
            <button onClick={() => { setSelectedSemester(null); setSelectedSubject(null); }} className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition">
              All Semesters
            </button>
          )}
          {selectedSubject && (
            <button onClick={() => setSelectedSubject(null)} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition">
              All Subjects
            </button>
          )}
        </div>

        {!selectedBranch ? (
          <div className="grid md:grid-cols-3 gap-6">
            {branches.map((branch, idx) => (
              <button key={branch} onClick={() => setSelectedBranch(branch)} className="group bg-card border-2 rounded-2xl p-8 hover:border-primary hover:shadow-2xl transition-all duration-300 text-left hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <FolderOpen className="w-12 h-12 text-primary group-hover:scale-110 transition" />
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h3 className="text-2xl font-bold group-hover:text-primary transition">{branch}</h3>
                <p className="text-muted-foreground mt-2">{pyqs?.filter((p) => p.branch === branch).length} PYQs available</p>
              </button>
            ))}
          </div>
        ) : !selectedSemester ? (
          <div className="grid md:grid-cols-4 gap-6">
            {semesters.sort().map((semester, idx) => (
              <button key={semester} onClick={() => setSelectedSemester(semester)} className="group bg-card border-2 rounded-2xl p-6 hover:border-accent hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition">{semester}</div>
                <p className="text-muted-foreground">Semester</p>
                <p className="text-sm text-muted-foreground mt-2">{pyqs?.filter((p) => p.branch === selectedBranch && p.semester === semester).length} PYQs</p>
              </button>
            ))}
          </div>
        ) : !selectedSubject ? (
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((subject, idx) => (
              <button key={subject} onClick={() => setSelectedSubject(subject)} className="group bg-card border-2 rounded-2xl p-6 hover:border-primary hover:shadow-2xl transition-all duration-300 text-left hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <FileText className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold group-hover:text-primary transition">{subject}</h3>
                <p className="text-muted-foreground mt-2">{pyqs?.filter((p) => p.branch === selectedBranch && p.semester === selectedSemester && p.subject === subject).length} PYQs available</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPyqs?.map((pyq, idx) => (
              <div key={pyq.id} className="bg-card border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">{pyq.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">{pyq.branch}</span>
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">Sem {pyq.semester}</span>
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">{pyq.subject}</span>
                      {pyq.year && <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">{pyq.year}</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDownload(pyq.file_url, pyq.title)} className="ml-4 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl hover:scale-105">
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Batches;
