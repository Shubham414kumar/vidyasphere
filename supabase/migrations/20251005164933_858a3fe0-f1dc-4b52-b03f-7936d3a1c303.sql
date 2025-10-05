-- Add branch and semester columns to notes table
ALTER TABLE notes ADD COLUMN branch text;
ALTER TABLE notes ADD COLUMN semester text;

-- Add branch and semester columns to pyqs table
ALTER TABLE pyqs ADD COLUMN branch text;
ALTER TABLE pyqs ADD COLUMN semester text;