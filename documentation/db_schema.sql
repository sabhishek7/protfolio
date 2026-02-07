-- Enable Row Level Security (RLS) is recommended for all tables, 
-- but since we are using a Node.js backend with Service Role (likely) or just checking auth,
-- we will set up tables and basic policies.

-- 1. PROFILES Table
create table public.profiles (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  title text,
  bio text,
  photo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. SKILLS Table
create table public.skills (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text, -- e.g., 'Frontend', 'Backend', 'Tools'
  level integer, -- 1-100 or 1-5
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. EDUCATION Table
create table public.education (
  id uuid default gen_random_uuid() primary key,
  institution text not null,
  degree text not null,
  start_date date,
  end_date date, -- null implies 'Present'
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. PROJECTS Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  live_link text,
  repo_link text,
  tags text[], -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. EXPERIENCE Table
create table public.experience (
  id uuid default gen_random_uuid() primary key,
  company text not null,
  role text not null,
  start_date date,
  end_date date,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- OUTPUT deployment info
-- Create Storage Bucket for images if needed
insert into storage.buckets (id, name) values ('portfolio', 'portfolio');
create policy "Public Access" on storage.objects for select using ( bucket_id = 'portfolio' );
create policy "Authenticated Insert" on storage.objects for insert with check ( bucket_id = 'portfolio' and auth.role() = 'authenticated' );

-- RLS Policies (Optional if Backend uses Service Key, but good practice)
alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.education enable row level security;
alter table public.projects enable row level security;
alter table public.experience enable row level security;

-- Allow read access to everyone
create policy "Allow Public Read Profiles" on public.profiles for select using (true);
create policy "Allow Public Read Skills" on public.skills for select using (true);
create policy "Allow Public Read Education" on public.education for select using (true);
create policy "Allow Public Read Projects" on public.projects for select using (true);
create policy "Allow Public Read Experience" on public.experience for select using (true);

-- Allow full access to authenticated users (The Admin)
create policy "Allow Admin All Profiles" on public.profiles for all using (auth.role() = 'authenticated');
create policy "Allow Admin All Skills" on public.skills for all using (auth.role() = 'authenticated');
create policy "Allow Admin All Education" on public.education for all using (auth.role() = 'authenticated');
create policy "Allow Admin All Projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Allow Admin All Experience" on public.experience for all using (auth.role() = 'authenticated');
