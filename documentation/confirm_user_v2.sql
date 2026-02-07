-- Corrected SQL to Confirm Admin User
-- We only need to update 'email_confirmed_at'. 
-- 'confirmed_at' is often a generated column in newer Supabase versions and cannot be set manually.

UPDATE auth.users
SET email_confirmed_at = now(),
    updated_at = now()
WHERE email = 'admin@portfolio.com';
