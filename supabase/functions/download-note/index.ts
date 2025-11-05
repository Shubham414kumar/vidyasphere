// Edge function: download-note
// Streams a Supabase Storage object to the browser to bypass client-side blocking/extensions

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function getContentType(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { ...corsHeaders } });
  }

  try {
    const url = new URL(req.url);
    const fileUrl = url.searchParams.get("file_url");
    const mode = url.searchParams.get("mode") ?? "view"; // view | download

    if (!fileUrl) {
      return new Response(JSON.stringify({ error: "Missing file_url" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Parse the storage public URL to extract bucket and object path
    // Expected: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
    const parsed = new URL(fileUrl);
    const parts = parsed.pathname.split("/object/public/");
    if (parts.length < 2) {
      return new Response(JSON.stringify({ error: "Invalid storage public URL" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const after = parts[1];
    const segs = after.split("/");
    const bucket = decodeURIComponent(segs.shift() || "");
    const objectPath = decodeURIComponent(segs.join("/"));

    if (!bucket || !objectPath) {
      return new Response(JSON.stringify({ error: "Invalid bucket or path" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.storage
      .from(bucket)
      .download(objectPath);

    if (error || !data) {
      console.error("download-note error:", error);
      return new Response(JSON.stringify({ error: error?.message || "Download failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const filename = objectPath.split("/").pop() || "file";
    const contentType = getContentType(filename);
    const buffer = await data.arrayBuffer();

    const headers = new Headers({
      "Content-Type": contentType,
      ...corsHeaders,
    });

    const disposition = mode === "download" ? "attachment" : "inline";
    headers.set("Content-Disposition", `${disposition}; filename="${filename}"`);

    return new Response(buffer, { status: 200, headers });
  } catch (e) {
    console.error("download-note exception:", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});