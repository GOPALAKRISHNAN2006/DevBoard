# 🚀 DevBoard Backend

A production-style MERN backend for **DevBoard**, a developer portfolio dashboard that combines GitHub analytics, LeetCode statistics, project management, and user profiles into a single platform.

---

## 📌 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt

### 👤 User Profile

* Get Logged-in User Profile
* Update User Profile
* GitHub Username
* LeetCode Username
* Bio
* Location
* Skills

### 📁 Project Portfolio

* Create Project
* Get All Projects
* Get Project by ID
* Update Project (PUT)
* Partial Update (PATCH)
* Delete Project

Each project supports:

* Title
* Description
* Tech Stack
* GitHub URL
* Live URL
* LeetCode URL (optional)
* Featured Project

### 🐙 GitHub Integration

* Fetch GitHub Profile
* Fetch Public Repositories
* GitHub Analytics

  * Total Repositories
  * Total Stars
  * Total Forks
  * Most Used Language
  * Top Repository

### 💻 LeetCode Integration

* Fetch LeetCode Profile using GraphQL
* Ranking
* Reputation
* Avatar
* Accepted Submission Statistics

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (jsonwebtoken)
* bcrypt

### API Integration

* Axios
* GitHub REST API
* LeetCode GraphQL API

### Development Tools

* Nodemon
* dotenv

---

## 📂 Project Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── projectController.js
│   ├── githubController.js
│   └── leetcodeController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Project.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   ├── githubRoutes.js
│   └── leetcodeRoutes.js
│
├── services/
│   ├── github.service.js
│   └── leetcode.service.js
│
├── .env
├── server.js
└── package.json
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

---

### User

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | `/api/users/me` | Get Profile    |
| PUT    | `/api/users/me` | Update Profile |

---

### Projects

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | `/api/projects`     | Create Project   |
| GET    | `/api/projects`     | Get All Projects |
| GET    | `/api/projects/:id` | Get Project      |
| PUT    | `/api/projects/:id` | Update Project   |
| PATCH  | `/api/projects/:id` | Partial Update   |
| DELETE | `/api/projects/:id` | Delete Project   |

---

### GitHub

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/github/profile` | GitHub Profile      |
| GET    | `/api/github/repos`   | GitHub Repositories |
| GET    | `/api/github/stats`   | GitHub Analytics    |

---

### LeetCode

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/api/leetcode/profile` | LeetCode Profile                |
| GET    | `/api/leetcode/stats`   | LeetCode Analytics *(Upcoming)* |

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

## ▶️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file.

Run the development server:

```bash
npm run dev
```

---

## 📈 Current Progress

* ✅ Authentication
* ✅ JWT Authorization
* ✅ User Profile
* ✅ Project Portfolio CRUD
* ✅ GitHub Profile Integration
* ✅ GitHub Repository Integration
* ✅ GitHub Analytics
* ✅ LeetCode GraphQL Integration
* 🚧 LeetCode Analytics
* 🚧 Resume Builder
* 🚧 Job Tracker
* 🚧 AI Features

---

## 🎯 Future Enhancements

* Resume Builder
* Job Application Tracker
* AI Resume Review
* AI Interview Preparation
* AI Project Suggestions
* Cloudinary Image Upload
* Email Verification
* Refresh Tokens
* Role-Based Authorization
* API Documentation with Swagger

---

## 👨‍💻 Author

**Gopalakrishnan M**

* GitHub: https://github.com/GOPALAKRISHNAN2006

---

## 📄 License

This project is licensed under the MIT License.
