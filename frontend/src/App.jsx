import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// App Pages
import Dashboard from './pages/dashboard/Dashboard';
import Projects from './pages/projects/Projects';
import Jobs from './pages/jobs/Jobs';
import Resume from './pages/resume/Resume';
import Github from './pages/github/Github';
import Leetcode from './pages/leetcode/Leetcode';
import Profile from './pages/profile/Profile';
import Notes from './pages/notes/Notes';
import Analytics from './pages/analytics/Analytics';
import LinkedIn from './pages/linkedin/LinkedIn';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/new" element={<Jobs />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/github" element={<Github />} />
            <Route path="/leetcode" element={<Leetcode />} />
            <Route path="/linkedin" element={<LinkedIn />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
