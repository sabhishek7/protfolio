# 🎨 Portfolio Frontend

This is the React-based frontend for the Portfolio Application. It is built with **Vite** for fast development and bundling, and uses **Supabase** for backend services including authentication and real-time data.

## 🌟 Key Features

- **Modern UI/UX**: Built with React and Vanilla CSS, featuring responsive layouts and smooth transitions.
- **Animations**: Integrated `framer-motion` for engaging page transitions and scroll effects.
- **Dynamic Projects Showcase**: Fetches and displays projects from the Supabase database.
- **Admin Dashboard**: Secure route for content management (add/edit/delete skills, projects, experience).
- **Toast Notifications**: Real-time feedback using `react-hot-toast`.

## 🛠 Tech Stack

- **Core**: React 18, Vite
- **Routing**: React Router DOM v6
- **State Management**: React Context API (`ThemeContext`, `AuthContext`)
- **Styling**: CSS Modules / Global CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios & Supabase Client

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the backend service running. See `../backend/README.md` for instructions.

### 2. Installation
Install the required dependencies:

```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in this directory with your Supabase credentials. These **must** match your Supabase project settings.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
Start the local development server:

```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📦 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 📂 Project Structure

- `src/components`: Reusable UI components (Navbar, Footer, ProjectCard, etc.)
- `src/pages`: Main view components (Home, Projects, Admin/Login)
- `src/context`: Global state providers (Theme, Auth)
- `src/services`: API service functions for fetching data
- `src/assets`: Static images and resources

---

*Part of the PortfolioApp Monorepo*
