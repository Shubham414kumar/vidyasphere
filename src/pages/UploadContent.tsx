import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const UploadContent = () => {
  const [type, setType] = useState<"note" | "pyq">("note");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Upload functionality coming soon!");
    setTitle("");
    setCategory("");
    setSubject("");
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
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-muted-foreground">Click to upload file</p>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Upload {type === "note" ? "Note" : "PYQ"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;
