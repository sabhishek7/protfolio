# 🚀 Modern Developer Portfolio

A professional, full-stack portfolio application built to showcase skills, projects, and experience dynamically. This project features a responsive React frontend, a robust Node.js/Express backend, and leverages Supabase for real-time database, authentication, and storage solutions.

## ✨ Features

- **Dynamic Content Management**: Easily update Profile, Skills, Education, Projects, and Experience details via a secure backend API.
- **Secure Authentication**: Admin interface protected by Supabase Authentication (Email/Password).
- **Responsive Design**: Mobile-first, modern UI built with Vanilla CSS and Framer Motion for smooth animations.
- **Real-time Database**: Powered by Supabase (PostgreSQL) for reliable data persistence.
- **Image Storage**: Integrated Supabase Storage for project images and profile photos.
- **RESTful API**: Custom Express server managing all data operations with secure endpoints.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Modern, Responsive, Custom Variables)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **HTTP Client**: Axios / Supabase Client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database Integration**: Supabase JS Client
- **Security**: CORS, Dotenv, JWT (via Supabase)

### Database & Services
- **Platform**: Supabase
- **Database**: PostgreSQL
- **Storage**: Supabase Storage Buckets (`portfolio-images`)
- **Authentication**: Supabase Auth

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v16+)
- npm or yarn
- A Supabase account and project

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-app.git
cd PortfolioApp
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

---

## 📂 Project Structure

```bash
PortfolioApp/
├── backend/               # Node.js/Express Server
│   ├── check_storage.js   # Script to verify/create Supabase buckets
│   ├── server.js          # Main application entry point & API routes
│   └── package.json       # Backend dependencies
├── frontend/              # React Application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── content/       # Context API providers
│   │   ├── pages/         # Page components (Home, Admin, etc.)
│   │   ├── services/      # API service functions
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # React entry point
│   └── package.json       # Frontend dependencies
└── documentation/         # SQL scripts and project docs
```

## 📡 API Endpoints

The backend exposes the following RESTful endpoints:

| Method | Endpoint          | Description               | Auth Required |
|--------|-------------------|---------------------------|---------------|
| GET    | `/api/profile`    | Get profile details       | No            |
| PUT    | `/api/profile`    | Update profile (Admin)    | Yes           |
| GET    | `/api/skills`     | List all skills           | No            |
| POST   | `/api/skills`     | Add a new skill           | Yes           |
| GET    | `/api/projects`   | List all projects         | No            |
| POST   | `/api/projects`   | Add a project             | Yes           |
| GET    | `/api/experience` | List experience           | No            |
| GET    | `/api/education`  | List education            | No            |

## 📄 License
This project is licensed under the MIT License.
