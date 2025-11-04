-- Fix storage policies for the "Pdf's or Documents" bucket
-- First, drop existing policies if any
DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files" ON storage.objects;

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload files to their folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'Pdf''s or Documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow anyone to view/download files (since bucket is public)
CREATE POLICY "Anyone can view files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'Pdf''s or Documents');

-- Allow users to update their own files
CREATE POLICY "Users can update their own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'Pdf''s or Documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'Pdf''s or Documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);