import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, ChevronRight, Search, Filter } from "lucide-react";
import { toast } from "sonner";

const Batches = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");

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

  const resetFilters = () => {
    setSearchQuery("");
    setFilterYear("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Previous Year Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access previous year question papers organized by branch, semester, and subject
          </p>
        </div>

        {(selectedBranch || selectedSemester || selectedSubject) && (
          <div className="mb-8 flex items-center gap-2 text-sm flex-wrap">
            <button onClick={() => { setSelectedBranch(""); setSelectedSemester(""); setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline">Home</button>
            {selectedBranch && (<><ChevronRight className="w-4 h-4" /><button onClick={() => { setSelectedSemester(""); setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline">{selectedBranch}</button></>)}
            {selectedSemester && (<><ChevronRight className="w-4 h-4" /><button onClick={() => { setSelectedSubject(""); resetFilters(); }} className="text-primary hover:underline">Semester {selectedSemester}</button></>)}
            {selectedSubject && (<><ChevronRight className="w-4 h-4" /><span className="text-foreground font-semibold">{selectedSubject}</span></>)}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
        ) : !selectedBranch ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{branches.map((branch) => (<div key={branch} onClick={() => setSelectedBranch(branch)} className="bg-card border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all hover-lift"><h3 className="text-xl font-bold mb-2">{branch}</h3><p className="text-muted-foreground text-sm">Click to view semesters</p></div>))}</div>
        ) : !selectedSemester ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{semesters.sort().map((semester) => (<div key={semester} onClick={() => setSelectedSemester(semester)} className="bg-card border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all hover-lift text-center"><h3 className="text-2xl font-bold text-primary mb-2">Semester {semester}</h3><p className="text-muted-foreground text-sm">Click to view subjects</p></div>))}</div>
        ) : !selectedSubject ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{subjects.map((subject) => (<div key={subject} onClick={() => setSelectedSubject(subject)} className="bg-card border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all hover-lift"><h3 className="text-lg font-bold mb-2">{subject}</h3><p className="text-muted-foreground text-sm">Click to view question papers</p></div>))}</div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><input type="text" placeholder="Search question papers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" /></div>
                <div className="flex gap-2">
                  <div className="relative"><Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-background"><option value="">All Years</option>{availableYears.map((year) => (<option key={year} value={year}>{year}</option>))}</select></div>
                  {(searchQuery || filterYear) && (<button onClick={resetFilters} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border rounded-lg">Clear</button>)}
                </div>
              </div>
            </div>
            {filteredPyqs && filteredPyqs.length > 0 ? (<div className="grid gap-4">{filteredPyqs.map((pyq) => (<div key={pyq.id} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all"><div className="flex items-start justify-between gap-4"><div className="flex-1"><h3 className="text-lg font-bold mb-2">{pyq.title}</h3><div className="flex flex-wrap gap-2 text-sm text-muted-foreground">{pyq.year && (<span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Year: {pyq.year}</span>)}<span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full">{pyq.category}</span></div></div><button onClick={() => handleDownload(pyq.file_url, pyq.title)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"><Download className="w-5 h-5" />Download</button></div></div>))}</div>) : (<div className="text-center py-12 bg-card border rounded-lg"><p className="text-muted-foreground">{searchQuery || filterYear ? "No question papers found matching your filters" : "No question papers available yet"}</p></div>)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Batches;
