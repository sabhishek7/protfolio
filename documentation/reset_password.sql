-- Reset Admin Password
-- Run this in Supabase SQL Editor to instantly change the password.

-- EXTENSION: Ensure pgcrypto is enabled (standard on Supabase)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- UPDATE PASSWORD
-- Replace 'YourNewPasswordHere' below with your desired password
UPDATE auth.users
SET encrypted_password = crypt('YourNewPasswordHere', gen_salt('bf')),
    updated_at = now()
WHERE email = 'admin@portfolio.com';
