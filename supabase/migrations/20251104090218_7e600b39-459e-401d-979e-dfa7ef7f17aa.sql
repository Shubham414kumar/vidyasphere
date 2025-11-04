-- Remove foreign key constraints from notes and pyqs tables
-- These should just store user_id without strict foreign key constraints

-- Drop foreign key constraint on notes table if exists
ALTER TABLE public.notes 
DROP CONSTRAINT IF EXISTS notes_uploaded_by_fkey;

-- Drop foreign key constraint on pyqs table if exists
ALTER TABLE public.pyqs 
DROP CONSTRAINT IF EXISTS pyqs_uploaded_by_fkey;

-- Ensure uploaded_by columns are not nullable for proper RLS
ALTER TABLE public.notes 
ALTER COLUMN uploaded_by SET NOT NULL;

ALTER TABLE public.pyqs 
ALTER COLUMN uploaded_by SET NOT NULL;