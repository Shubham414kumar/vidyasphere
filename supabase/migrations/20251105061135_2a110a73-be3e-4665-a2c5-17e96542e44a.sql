-- Add view_count and download_count columns to notes table
ALTER TABLE public.notes
ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS download_count integer DEFAULT 0 NOT NULL;

-- Create function to increment view count
CREATE OR REPLACE FUNCTION public.increment_note_view_count(note_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.notes
  SET view_count = view_count + 1
  WHERE id = note_id;
END;
$$;

-- Create function to increment download count
CREATE OR REPLACE FUNCTION public.increment_note_download_count(note_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.notes
  SET download_count = download_count + 1
  WHERE id = note_id;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_note_view_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_note_download_count(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_note_view_count(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_note_download_count(uuid) TO anon;