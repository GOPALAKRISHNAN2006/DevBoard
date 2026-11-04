import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
const NotFound = lazy(() => import('./pages/notFound/NotFound'));

// Lazy-loaded Feature Landing Pages (Public SEO)
const JobTrackerFeature = lazy(() => import('./pages/features/JobTrackerFeature'));
const ResumeBuilderFeature = lazy(() => import('./pages/features/ResumeBuilderFeature'));
const GithubAnalyticsFeature = lazy(() => import('./pages/features/GithubAnalyticsFeature'));
const LeetcodeTrackerFeature = lazy(() => import('./pages/features/LeetcodeTrackerFeature'));
const PortfolioFeature = lazy(() => import('./pages/features/PortfolioFeature'));
const LinkedinOptimizerFeature = lazy(() => import('./pages/features/LinkedinOptimizerFeature'));

// Lazy-loaded Public Blog & Resource Pages (SEO Content Strategy)
const BlogListing = lazy(() => import('./pages/blog/BlogListing'));
const AtsResumeArticle = lazy(() => import('./pages/blog/AtsResumeArticle'));
const GithubProfileArticle = lazy(() => import('./pages/blog/GithubProfileArticle'));
const CodingInterviewArticle = lazy(() => import('./pages/blog/CodingInterviewArticle'));
const PortfolioGuideArticle = lazy(() => import('./pages/blog/PortfolioGuideArticle'));
const JobTrackingGuideArticle = lazy(() => import('./pages/blog/JobTrackingGuideArticle'));

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
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <Suspense fallback={<Loader full={true} />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/features/job-application-tracker" element={<JobTrackerFeature />} />
                  <Route path="/features/ats-resume-builder" element={<ResumeBuilderFeature />} />
                  <Route path="/features/github-analytics" element={<GithubAnalyticsFeature />} />
                  <Route path="/features/leetcode-tracker" element={<LeetcodeTrackerFeature />} />
                  <Route path="/features/developer-portfolio" element={<PortfolioFeature />} />
                  <Route path="/features/linkedin-optimizer" element={<LinkedinOptimizerFeature />} />
                  <Route path="/blog" element={<BlogListing />} />
                  <Route path="/blog/ats-friendly-developer-resume" element={<AtsResumeArticle />} />
                  <Route path="/blog/improve-github-profile" element={<GithubProfileArticle />} />
                  <Route path="/blog/software-engineering-interview-preparation" element={<CodingInterviewArticle />} />
                  <Route path="/blog/developer-portfolio-guide" element={<PortfolioGuideArticle />} />
                  <Route path="/blog/job-application-tracking-guide" element={<JobTrackingGuideArticle />} />
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

                  {/* Fallback 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster position="top-right" />
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
