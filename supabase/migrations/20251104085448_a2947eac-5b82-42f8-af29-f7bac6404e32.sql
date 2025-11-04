-- Drop the foreign key constraint on attendance table
ALTER TABLE public.attendance 
DROP CONSTRAINT IF EXISTS attendance_user_id_fkey;

-- Drop the foreign key constraint on subjects table (if exists)
ALTER TABLE public.subjects 
DROP CONSTRAINT IF EXISTS subjects_user_id_fkey;

-- Make sure user_id columns are not nullable for proper RLS
ALTER TABLE public.attendance 
ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE public.subjects 
ALTER COLUMN user_id SET NOT NULL;