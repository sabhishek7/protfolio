-- Seed Data for Portfolio App
-- Run this in the Supabase SQL Editor to populate your app with sample data.

-- 1. Insert Profile
INSERT INTO public.profiles (full_name, title, bio, photo_url)
VALUES (
  'Alex Dev',
  'Full Stack Developer',
  'Passionate developer with 5 years of experience building scalable web applications. I love React, Node.js, and cloud technologies.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&q=80'
);

-- 2. Insert Skills
INSERT INTO public.skills (name, category, level) VALUES
('JavaScript', 'Frontend', 90),
('React', 'Frontend', 85),
('Node.js', 'Backend', 80),
('PostgreSQL', 'Database', 75),
('Docker', 'DevOps', 60),
('Python', 'Backend', 70);

-- 3. Insert Education
INSERT INTO public.education (institution, degree, start_date, end_date, description) VALUES
('Tech University', 'B.S. Computer Science', '2016-09-01', '2020-05-20', 'Graduated with Honors. Focused on Software Engineering and Algorithms.'),
('Coding Bootcamp', 'Full Stack Certification', '2020-06-01', '2020-09-01', 'Intensive 12-week program covering modern web development stack.');

-- 4. Insert Experience
INSERT INTO public.experience (company, role, start_date, end_date, description) VALUES
('Tech Innovators Inc', 'Senior Developer', '2023-01-15', NULL, 'Leading the frontend team, migrating legacy apps to React, and mentoring junior developers.'),
('Web Solutions LLC', 'Software Engineer', '2020-10-01', '2022-12-31', 'Developed and maintained client websites using MERN stack. Improved site performance by 40%.');

-- 5. Insert Projects
INSERT INTO public.projects (title, description, image_url, live_link, repo_link, tags) VALUES
(
  'E-Commerce Platform',
  'A fully functional e-commerce site with cart, checkout, and payment integration.',
  'https://images.unsplash.com/photo-1557821552-17105176677c?fit=crop&w=400&q=80',
  'https://example.com/shop',
  'https://github.com/example/shop',
  ARRAY['React', 'Redux', 'Node.js', 'Stripe']
),
(
  'Task Manager API',
  'RESTful API for managing tasks with authentication and team collaboration features.',
  NULL, -- No image
  NULL,
  'https://github.com/example/task-api',
  ARRAY['Express', 'MongoDB', 'JWT']
),
(
  'Portfolio Site',
  'A personal portfolio website with a custom CMS admin panel.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=400&q=80',
  'https://example.com/portfolio',
  'https://github.com/example/portfolio',
  ARRAY['React', 'Supabase', 'Vite']
);
