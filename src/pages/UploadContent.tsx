import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const UploadContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [type, setType] = useState<"note" | "pyq">(
    (searchParams.get("type") as "note" | "pyq") || "note"
  );
  const [title, setTitle] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload only PDF files");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please login to upload content");
      navigate("/auth");
      return;
    }

    setUploading(true);

    try {
      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("Pdf's or Documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("Pdf's or Documents")
        .getPublicUrl(filePath);

      // Insert record into appropriate table
      if (type === "note") {
        const { error: insertError } = await supabase
          .from("notes")
          .insert({
            title,
              branch,
              semester,
              subject,
              year: year ? parseInt(year) : null,
              file_url: publicUrl,
              uploaded_by: user.id,
              category: "study-material",
            });

        if (insertError) throw insertError;
      } else {
        const { error: insertError } = await supabase
          .from("pyqs")
          .insert({
            title,
            branch,
            semester,
            subject,
            year: year ? parseInt(year) : null,
            file_url: publicUrl,
            uploaded_by: user.id,
            category: "previous-year",
          });

        if (insertError) throw insertError;
      }

      toast.success(`${type === "note" ? "Note" : "PYQ"} uploaded successfully!`);
      setTitle("");
      setBranch("");
      setSemester("");
      setSubject("");
      setYear("");
      setFile(null);
      navigate(type === "note" ? "/notes" : "/batches");
      
    } catch (error: any) {
      toast.error(error.message || "Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12 mt-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-8 shadow-lg animate-fade-in">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 gradient-text">
              <Upload className="w-8 h-8" />
              Upload Content
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setType("note")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    type === "note"
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Notes
                </button>
                <button
                  type="button"
                  onClick={() => setType("pyq")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    type === "pyq"
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  PYQ
                </button>
              </div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                required
              />
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                required
              >
                <option value="">Select Branch</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
              </select>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                required
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem.toString()}>
                    Semester {sem}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                required
              />
              <input
                type="number"
                placeholder="Year (e.g., 2023)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                required
              />
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    {file ? file.name : "Click to upload PDF file"}
                  </p>
                </label>
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-xl transition-all disabled:opacity-50 font-semibold"
              >
                {uploading ? "Uploading..." : `Upload ${type === "note" ? "Note" : "PYQ"}`}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadContent;
