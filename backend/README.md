# 🔌 Portfolio Backend API

The backend for the Portfolio Application is a **Node.js** and **Express** server that acts as a secure middleware between the frontend and the **Supabase** database. It handles API requests, manages authentication verification, and ensures data integrity.

## 🛡️ Features

- **RESTful API**: Endpoints for Profiles, Skills, Education, Projects, and Experience.
- **Authentication**: Verifies Supabase JWT tokens to protect write/delete routes.
- **Supabase Integration**: Uses `@supabase/supabase-js` for database interaction using the service role or authenticated user context.
- **CORS Support**: Configured to allow requests from the frontend application.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via Supabase)
- **Utilities**: `dotenv` for env management, `cors` for cross-origin resource sharing, `nodemon` for dev.

## 🚀 Getting Started

### 1. Installation
Install the necessary dependencies:

```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in this directory. You will need your Supabase project URL and keys. 
**Important**: `SUPABASE_ANON_KEY` is required for public reads.

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Running the Server

**Development Mode** (with auto-restart):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server runs on port `5000` by default.

## 📡 API Endpoints

### Public Routes
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/profile` | Get user profile info |
| `GET` | `/api/skills` | List all skills |
| `GET` | `/api/projects` | List all projects |
| `GET` | `/api/experience` | List experience history |
| `GET` | `/api/education` | List education history |

### Protected Routes (Requires Auth Header)
*Header format*: `Authorization: Bearer <access_token>`

| Method | Endpoint | Description |
|:---|:---|:---|
| `PUT` | `/api/profile` | Update profile details |
| `POST` | `/api/skills` | Add a new skill |
| `DELETE` | `/api/skills/:id` | Delete a skill |
| `POST` | `/api/projects` | Add a new project |
| `DELETE` | `/api/projects/:id` | Delete a project |
| `POST` | `/api/experience` | Add new experience |
| `DELETE` | `/api/experience/:id` | Delete experience |
| `POST` | `/api/education` | Add new education |
| `DELETE` | `/api/education/:id` | Delete education |

---

*Part of the PortfolioApp Monorepo*
