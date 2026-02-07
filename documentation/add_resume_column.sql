-- Add resume_url column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN resume_url text;

-- (Optional) Policy update provided just in case, though existing policies usually cover all columns
-- No extra policy needed if "for all using (auth.role() = 'authenticated')" is set on the table, which it is.
