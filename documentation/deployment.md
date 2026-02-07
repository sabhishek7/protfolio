# Deployment Instructions

## 1. Database (Supabase)
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Once the project is ready, go to the **SQL Editor** in the left sidebar.
3. Open `documentation/db_schema.sql` from this repository, copy the content, and paste it into the SQL Editor. Click **Run**.
4. Go to **Project Settings -> API** and copy:
   - `Project URL`
   - `anon public` Key
   You will need these for the Environment Variables.

## 2. Backend (Render)
1. Push this project to a GitHub repository.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Name**: `portfolio-backend` (or similar)
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Scroll down to **Environment Variables** and add:
   - `SUPABASE_URL`: (Your Supabase Project URL)
   - `SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
   - `PORT`: 5000 (Optional, Render sets this automatically)
6. Deploy the service.
7. Once deployed, copy the **Service URL** (e.g., `https://portfolio-backend.onrender.com`).

## 3. Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and add a **New Project**.
2. Import the same GitHub repository.
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (Click Edit to change if needed)
4. expand **Environment Variables** and add:
   - `VITE_SUPABASE_URL`: (Your Supabase Project URL)
   - `VITE_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
   - `VITE_API_URL`: `https://YOUR-RENDER-app-url.onrender.com/api` (Make sure to append `/api` if your backend routes are prefixed)
5. Click **Deploy**.

## 4. Final Setup
- Navigate to your deployed Vercel URL.
- Go to `/login`.
- Since you haven't set up an admin user yet, you need to sign up via Supabase Auth or manually insert a user in Supabase Authentication tab if signup is disabled.
- **Tip**: To create the first admin, you can enable "Email/Password" provider in Supabase Auth settings. Then, use the Frontend code to sign up (if you add a signup route temporary) OR simply use the Supabase Dashboard -> Authentication -> Users -> "Invite User" or "Add User" to create the admin account with email/password.
- Once logged in, go to `/admin` to populate your portfolio!
