import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Lazy-loaded Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

// Lazy-loaded Public Pages
const Home = lazy(() => import('./pages/home/Home'));

// Lazy-loaded App Pages
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Projects = lazy(() => import('./pages/projects/Projects'));
const Jobs = lazy(() => import('./pages/jobs/Jobs'));
const Resume = lazy(() => import('./pages/resume/Resume'));
const Github = lazy(() => import('./pages/github/Github'));
const Leetcode = lazy(() => import('./pages/leetcode/Leetcode'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Notes = lazy(() => import('./pages/notes/Notes'));
const Analytics = lazy(() => import('./pages/analytics/Analytics'));
const LinkedIn = lazy(() => import('./pages/linkedin/LinkedIn'));

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<Loader full={true} />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
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
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
