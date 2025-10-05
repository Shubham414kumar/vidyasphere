import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const UploadContent = () => {
  const [type, setType] = useState<"note" | "pyq">("note");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

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
            category,
            subject,
            file_url: publicUrl,
            uploaded_by: user.id
          });

        if (insertError) throw insertError;
      } else {
        const { error: insertError } = await supabase
          .from("pyqs")
          .insert({
            title,
            category,
            subject,
            file_url: publicUrl,
            uploaded_by: user.id
          });

        if (insertError) throw insertError;
      }

      toast.success(`${type === "note" ? "Note" : "PYQ"} uploaded successfully!`);
      setTitle("");
      setCategory("");
      setSubject("");
      setFile(null);
      
    } catch (error: any) {
      toast.error(error.message || "Failed to upload");
    } finally {
      setUploading(false);
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
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Upload className="w-8 h-8 text-primary" />
              Upload Content
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setType("note")}
                  className={`flex-1 py-2 rounded-lg ${type === "note" ? "bg-primary text-white" : "bg-gray-200"}`}
                >
                  Notes
                </button>
                <button
                  type="button"
                  onClick={() => setType("pyq")}
                  className={`flex-1 py-2 rounded-lg ${type === "pyq" ? "bg-primary text-white" : "bg-gray-200"}`}
                >
                  PYQ
                </button>
              </div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Select Category</option>
                <option value="engineering">Engineering</option>
                <option value="class10">Class 10</option>
                <option value="class12">Class 12</option>
              </select>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    {file ? file.name : "Click to upload PDF file"}
                  </p>
                </label>
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {uploading ? "Uploading..." : `Upload ${type === "note" ? "Note" : "PYQ"}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;
