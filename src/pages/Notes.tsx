import { Link } from "react-router-dom";
import { FileText, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Notes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <div key={note.id} className="border rounded-lg p-6 hover:shadow-lg transition">
                <FileText className="w-12 h-12 text-primary mb-4" />
                <span className="text-sm text-primary font-semibold">{note.category}</span>
                <h3 className="text-lg font-bold mt-2 mb-1">{note.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{note.subject}</p>
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
        )}
      </div>
    </div>
  );
};

export default Notes;
