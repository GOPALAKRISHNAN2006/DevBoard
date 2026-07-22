# 🚀 DevBoard

A production-style MERN stack application for **DevBoard**, a developer portfolio dashboard that combines GitHub analytics, LeetCode statistics, project management, and user profiles into a single platform.

---

## 📌 Features

### 🔐 Authentication & Users
* User Registration & Login
* JWT Authentication & Protected Routes
* User Profile Management (GitHub/LeetCode usernames, Bio, Skills, Location)
* Password Hashing using bcrypt

### 📁 Project Portfolio
* Create, Read, Update, and Delete Projects
* Support for Tech Stack, GitHub/Live URLs, and Featured status

### 🐙 GitHub Integration
* Fetch GitHub Profile and Public Repositories
* GitHub Analytics (Total Repositories, Total Stars/Forks, Most Used Language)

### 💻 LeetCode Integration
* Fetch LeetCode Profile using GraphQL
* Ranking, Reputation, Avatar, and Accepted Submission Statistics

### 📊 Dashboard & UI
* Responsive User Interface built with React and Bootstrap
* Interactive Charts and Data Visualization using Recharts
* Toast Notifications for seamless user experience

---

## 🛠 Tech Stack

### Frontend
* **React 19** (Vite)
* **React Router DOM** for navigation
* **Bootstrap** for responsive styling
* **Recharts** for data visualization
* **Axios** for API requests
* **React Hot Toast** for notifications
* **React Icons**

### Backend
* **Node.js** & **Express.js**
* **MongoDB** & **Mongoose**
* **JWT** & **bcrypt** for Authentication
* **Axios** (GitHub REST API, LeetCode GraphQL API)

---

## 📂 Project Structure

```text
DevBoard/
│
├── backend/          # Express backend application
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers (Auth, User, Projects, GitHub, LeetCode)
│   ├── middleware/   # Custom middlewares (Auth)
│   ├── models/       # Mongoose schemas (User, Project)
│   ├── routes/       # API route definitions
│   ├── services/     # Third-party API services
│   └── server.js     # Entry point
│
└── frontend/         # React frontend application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Page components (Dashboard, Auth, etc.)
    │   ├── App.jsx     # Main React component
    │   └── main.jsx    # Entry point
    └── package.json
```

---

## 📡 API Endpoints (Backend)

* **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
* **User**: `GET /api/users/me`, `PUT /api/users/me`
* **Projects**: `GET /api/projects`, `POST /api/projects`, `PUT /PATCH /DELETE /api/projects/:id`
* **GitHub**: `GET /api/github/profile`, `/api/github/repos`, `/api/github/stats`
* **LeetCode**: `GET /api/leetcode/profile`, `/api/leetcode/stats`

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd DevBoard
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *(Runs on http://localhost:5000)*

3. **Frontend Setup:**
   Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *(Runs on http://localhost:5173)*

---

## 📈 Current Progress
* ✅ Full MERN Stack Setup
* ✅ Authentication (JWT)
* ✅ User Profiles & Project CRUD
* ✅ GitHub & LeetCode Integrations
* ✅ Interactive Frontend Dashboard
* 🚧 Resume Builder & Job Tracker
* 🚧 AI Features

---

## 👨‍💻 Author

**Gopalakrishnan M**
* GitHub: [GOPALAKRISHNAN2006](https://github.com/GOPALAKRISHNAN2006)

---

## 📄 License
This project is licensed under the MIT License.
