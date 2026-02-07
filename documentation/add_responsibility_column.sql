-- 6. Add 'responsibility' column to experience table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='experience' AND column_name='responsibility') THEN
        ALTER TABLE public.experience ADD COLUMN responsibility text;
    END IF;
END $$;

-- 7. Add 'responsibility' column to projects table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='responsibility') THEN
        ALTER TABLE public.projects ADD COLUMN responsibility text;
    END IF;
END $$;
