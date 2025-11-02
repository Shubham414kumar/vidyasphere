-- Add year column to notes table
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS year integer;

-- Add year column to pyqs table if not exists (it should already exist)
-- pyqs table already has year column, so this is just to ensure consistency

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_notes_branch_semester_year_subject ON public.notes(branch, semester, year, subject);
CREATE INDEX IF NOT EXISTS idx_pyqs_branch_semester_year_subject ON public.pyqs(branch, semester, year, subject);