import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Preview = () => {
  const query = useQuery();
  const fileUrl = query.get("file") || "";
  const noteId = query.get("id");
  const title = query.get("title") || "Preview";

  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${title} | Preview`;
  }, [title]);

  useEffect(() => {
    // Increment view count in a fire-and-forget manner
    if (noteId) {
      (async () => { try { await supabase.rpc("increment_note_view_count", { note_id: noteId }); } catch {} })();
    }
  }, [noteId]);

  useEffect(() => {
    let revoked = false;
    const load = async () => {
      try {
        setError(null);
        const res = await fetch(fileUrl, { mode: "cors" });
        if (!res.ok) throw new Error("Failed to load file");
        const ct = res.headers.get("content-type");
        if (ct) setContentType(ct);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (!revoked) setBlobUrl(url);
      } catch (e: any) {
        setError(e?.message || "Could not load preview");
      }
    };

    if (fileUrl) load();

    return () => {
      revoked = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [fileUrl]);

  const isPdf = (ct?: string | null) => (ct ?? contentType ?? "").includes("pdf") || fileUrl.toLowerCase().endsWith(".pdf");
  const isImage = (ct?: string | null) => (ct ?? contentType ?? "").startsWith("image/");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">Secure in-app preview</p>
          <link rel="canonical" href={`${window.location.origin}/preview`} />
        </header>

        {!fileUrl ? (
          <div className="bg-card border rounded-xl p-6 text-muted-foreground">No file URL provided.</div>
        ) : error ? (
          <div className="bg-card border rounded-xl p-6">
            <p className="text-destructive mb-3">Preview blocked or failed.</p>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            >
              Open Directly
            </a>
          </div>
        ) : !blobUrl ? (
          <div className="bg-card border rounded-xl p-6">Loading preview…</div>
        ) : (
          <section className="bg-card border rounded-xl overflow-hidden">
            {isPdf() ? (
              <iframe title={`${title} PDF preview`} src={blobUrl} className="w-full h-[80vh]" />
            ) : isImage() ? (
              <img src={blobUrl} alt={`${title} preview image`} className="w-full h-auto" />
            ) : (
              <div className="p-6">
                <p className="mb-3">This file type cannot be embedded.</p>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground"
                >
                  Open Directly
                </a>
              </div>
            )}
          </section>
        )}

        <div className="mt-6">
          <a
            href={fileUrl}
            download
            className="inline-block px-4 py-2 rounded-lg bg-secondary text-secondary-foreground"
            onClick={() => toast.message("Preparing download…")}
          >
            Download file
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Preview;
