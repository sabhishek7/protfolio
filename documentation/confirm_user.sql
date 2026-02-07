-- Confirm Admin User Email Manually
-- Run this in the Supabase SQL Editor to verify the admin user immediately.

UPDATE auth.users
SET email_confirmed_at = now(),
    confirmed_at = now(),
    last_sign_in_at = now(),
    raw_app_meta_data = '{"provider": "email", "providers": ["email"]}'
WHERE email = 'admin@portfolio.com';
