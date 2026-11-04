import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiCommand,
  FiArrowRight,
  FiBriefcase,
  FiGithub,
  FiCode,
  FiStar,
  FiGitBranch,
  FiFileText,
  FiActivity,
  FiTrendingUp,
  FiLinkedin,
  FiAward,
  FiLayers,
  FiCheckCircle,
  FiTerminal,
  FiCheckSquare,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/SEO";
import { getHomepageStructuredData } from "../../utils/structuredData";
import "./Home.css";

export default function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("jobs");
  const [scrolled, setScrolled] = useState(false);

  // Section Refs for IntersectionObserver Scroll Reveal
  const demoRef = useRef(null);
  const whyRef = useRef(null);
  const featuresRef = useRef(null);
  const ecosystemRef = useRef(null);
  const howRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const mockDashRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    let isPast = false;
    const handleScroll = () => {
      const past = window.scrollY > 40;
      if (past !== isPast) {
        isPast = past;
        setScrolled(past);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Scroll Reveal Observer
    const sections = [
      demoRef,
      whyRef,
      featuresRef,
      ecosystemRef,
      howRef,
      faqRef,
      ctaRef,
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // High-performance 3D Tilt handler using direct DOM transform and requestAnimationFrame
  // Eliminates layout thrashing and prevents full-component React re-renders on mouse movement
  const handleMouseMove = (e) => {
    const card = mockDashRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 4; // max 2 deg
    const rotateY = (x / rect.width) * 4; // max 2 deg

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      if (card) {
        card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    if (mockDashRef.current) {
      mockDashRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div className="home-page">
      <SEO
        title="DevBoard – Developer Career Dashboard & Portfolio Analytics"
        description="Manage your developer career in one place with GitHub analytics, LeetCode tracking, ATS resume building, job application tracking, and portfolio management."
        canonical="https://dev-board-mauve.vercel.app/"
        robots="index, follow"
        structuredData={getHomepageStructuredData()}
      />
      {/* Background Grid Pattern */}
      <div className="bg-grid-pattern" />

      {/* Hero Ambient Dual Glow Spheres */}
      <div className="hero-glow-left" />
      <div className="hero-glow-right" />

      {/* ======================================================== */}
      {/* NAVBAR */}
      {/* ======================================================== */}
      <nav className={`home-nav ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="home-logo">
          <FiCommand className="home-logo-icon" />
          DevBoard
        </Link>

        <div className="home-nav-links d-none d-md-flex">
          <a href="#features" className="nav-link-minimal">
            Features
          </a>
          <a href="#demo" className="nav-link-minimal">
            Interactive Demo
          </a>
          <Link to="/blog" className="nav-link-minimal">
            Resources
          </Link>
          <a href="#faq" className="nav-link-minimal">
            FAQ
          </a>
        </div>

        <div className="home-nav-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary-minimal">
              Dashboard <FiArrowRight className="cta-arrow" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-secondary-minimal"
                style={{ border: "none" }}
              >
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary-minimal">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ======================================================== */}
      {/* MAIN CONTENT */}
      {/* ======================================================== */}
      <main role="main">
        {/* ======================================================== */}
        {/* HERO SECTION */}
        {/* ======================================================== */}
        <header className="hero-section">
          <div className="hero-badge">
            <span className="pulse-dot" /> DEVBOARD &mdash; YOUR DEVELOPER CAREER COMMAND CENTER
          </div>
          <h1 className="hero-title">
            Developer Career Dashboard &amp; <br />
            <span className="text-gradient">Portfolio Analytics Platform</span>
          </h1>
          <p className="hero-subtitle">
            DevBoard consolidates your job application tracker, developer portfolio management, GitHub analytics, LeetCode progress, and ATS resume builder into a single command center.
          </p>

        <div className="hero-cta">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary-minimal btn-xl">
              Open Dashboard <FiArrowRight className="cta-arrow" />
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary-minimal btn-xl">
                Get started free <FiArrowRight className="cta-arrow" />
              </Link>
              <a href="#features" className="btn btn-secondary-minimal btn-xl">
                Explore DevBoard
              </a>
            </>
          )}
        </div>

        {/* Hero Live Stat Banner */}
        <div className="hero-stat-banner d-none d-md-flex">
          <div className="hero-stat-item">
            <span className="hero-stat-num text-primary">100+</span>
            <span className="hero-stat-lbl">Jobs Tracked</span>
          </div>
          <div className="border-end" style={{ height: "24px" }} />
          <div className="hero-stat-item">
            <span className="hero-stat-num text-purple">98%</span>
            <span className="hero-stat-lbl">ATS Match Rate</span>
          </div>
          <div className="border-end" style={{ height: "24px" }} />
          <div className="hero-stat-item">
            <span className="hero-stat-num text-success">2.5k+</span>
            <span className="hero-stat-lbl">GitHub Repos</span>
          </div>
          <div className="border-end" style={{ height: "24px" }} />
          <div className="hero-stat-item">
            <span className="hero-stat-num text-warning">10k+</span>
            <span className="hero-stat-lbl">LeetCode Solved</span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* TRUST / VALUE BAR */}
      {/* ======================================================== */}
      <div className="text-center py-4 bg-white border-top border-bottom">
        <p className="extra-small text-muted fw-bold text-uppercase tracking-wider mb-3">
          Everything you need to manage your developer journey
        </p>
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 px-3 text-secondary extra-small fw-semibold">
          <span className="journey-item d-flex align-items-center gap-1">
            <FiLayers className="text-primary" /> Projects Portfolio
          </span>
          <span className="journey-item d-flex align-items-center gap-1">
            <FiBriefcase className="text-purple" /> Job Applications
          </span>
          <span className="journey-item d-flex align-items-center gap-1">
            <FiFileText className="text-info" /> ATS Resume
          </span>
          <span className="journey-item d-flex align-items-center gap-1">
            <FiGithub className="text-dark" /> GitHub Repos
          </span>
          <span className="journey-item d-flex align-items-center gap-1">
            <FiCode className="text-warning" /> LeetCode Stats
          </span>
          <span className="journey-item d-flex align-items-center gap-1">
            <FiLinkedin className="text-primary" /> LinkedIn Branding
          </span>
          <span className="journey-item d-flex align-items-center gap-1">
            <FiTrendingUp className="text-success" /> Career Analytics
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FEATURE HIGHLIGHT CARDS GRID */}
      {/* ======================================================== */}
      <section className="container py-4 my-2" aria-labelledby="core-features-heading">
        <h2 id="core-features-heading" className="visually-hidden">Core Platform Capabilities</h2>
        <div className="row g-4">
          {/* Card 1: Job Pipeline */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 border shadow-sm h-100 feature-highlight-card">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="p-2 rounded bg-primary-subtle text-primary">
                  <FiBriefcase size={20} />
                </div>
                <span className="badge bg-success-subtle text-success extra-small">Live Sync</span>
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">Pipeline Job Tracker</h3>
              <p className="extra-small text-muted mb-3">Organize applications from Applied to Interview and Offer.</p>
              <div className="progress mb-2" style={{ height: "6px" }}>
                <div className="progress-bar bg-primary" style={{ width: "75%" }} />
              </div>
              <div className="d-flex justify-content-between extra-small text-secondary fw-semibold">
                <span>Applied: 12</span>
                <span>Offer: 1</span>
              </div>
              <div className="mt-2 pt-2 border-top">
                <Link to="/features/job-application-tracker" className="extra-small fw-bold text-primary text-decoration-none">
                  Explore Job Tracker &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: ATS Resume Analyzer */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 border shadow-sm h-100 feature-highlight-card">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="p-2 rounded bg-purple-subtle text-purple">
                  <FiFileText size={20} />
                </div>
                <span className="badge bg-primary-subtle text-primary extra-small">94% Score</span>
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">ATS Resume Builder</h3>
              <p className="extra-small text-muted mb-3">Export ATS-optimized vector PDFs tailored to job specs.</p>
              <div className="d-flex align-items-center gap-2 extra-small text-success fw-bold">
                <FiCheckSquare /> Verified Format Ready
              </div>
              <div className="mt-2 pt-2 border-top">
                <Link to="/features/ats-resume-builder" className="extra-small fw-bold text-primary text-decoration-none">
                  Explore ATS Resume &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: GitHub Analytics */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 border shadow-sm h-100 feature-highlight-card">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="p-2 rounded bg-dark-subtle text-dark">
                  <FiGithub size={20} />
                </div>
                <span className="badge bg-warning-subtle text-warning extra-small">2.1k Stars</span>
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">GitHub Developer Sync</h3>
              <p className="extra-small text-muted mb-3">Analyze repo stars, languages, and commit momentum.</p>
              <div className="d-flex align-items-center gap-2 extra-small text-muted fw-semibold">
                <FiGitBranch /> 402 Forks Tracked
              </div>
              <div className="mt-2 pt-2 border-top">
                <Link to="/features/github-analytics" className="extra-small fw-bold text-primary text-decoration-none">
                  Explore GitHub Sync &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4: LeetCode DSA Progress */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 border shadow-sm h-100 feature-highlight-card">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="p-2 rounded bg-warning-subtle text-warning">
                  <FiCode size={20} />
                </div>
                <span className="badge bg-danger-subtle text-danger extra-small">412 Solved</span>
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">LeetCode Progress</h3>
              <p className="extra-small text-muted mb-3">Daily GraphQL problem difficulty breakdown and ranking.</p>
              <div className="d-flex justify-content-between extra-small fw-semibold">
                <span className="text-success">Easy: 180</span>
                <span className="text-warning">Med: 192</span>
                <span className="text-danger">Hard: 40</span>
              </div>
              <div className="mt-2 pt-2 border-top">
                <Link to="/features/leetcode-tracker" className="extra-small fw-bold text-primary text-decoration-none">
                  Explore LeetCode Tracker &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* INTERACTIVE MOCK DASHBOARD PREVIEW WITH 3D TILT */}
      {/* ======================================================== */}
      <section id="demo" ref={demoRef} className="mock-dashboard-wrapper reveal-section" aria-labelledby="interactive-demo-heading">
        <h2 id="interactive-demo-heading" className="visually-hidden">Interactive Dashboard Experience</h2>
        {/* Floating Micro UI Badges */}
        <div className="floating-badge floating-badge-1">
          <FiBriefcase /> + New Application
        </div>
        <div className="floating-badge floating-badge-2">
          <FiCheckCircle /> Resume Updated 92%
        </div>
        <div className="floating-badge floating-badge-3">
          <FiGithub /> GitHub Synced
        </div>

        <div
          ref={mockDashRef}
          className="mock-dashboard"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Mock Sidebar */}
          <aside className="mock-dash-sidebar">
            <div className="mock-dash-nav-header">Workspace</div>
            <button
              type="button"
              className={`mock-dash-tab ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => setActiveTab("jobs")}
            >
              <FiBriefcase size={16} /> Jobs Tracker
            </button>
            <button
              type="button"
              className={`mock-dash-tab ${activeTab === "github" ? "active" : ""}`}
              onClick={() => setActiveTab("github")}
            >
              <FiGithub size={16} /> GitHub Sync
            </button>
            <button
              type="button"
              className={`mock-dash-tab ${activeTab === "leetcode" ? "active" : ""}`}
              onClick={() => setActiveTab("leetcode")}
            >
              <FiCode size={16} /> LeetCode Stats
            </button>
          </aside>

          {/* Mock Dashboard Body */}
          <div className="mock-dash-main">
            {activeTab === "jobs" && (
              <>
                <div className="mock-dash-header">
                  <h3 className="h4 mock-dash-title mb-0">Applications Overview</h3>
                  <span className="badge bg-primary-subtle text-primary border">
                    3 Active Opportunities
                  </span>
                </div>
                <div className="mock-grid-jobs">
                  <div className="mock-job-card">
                    <div>
                      <span className="mock-job-company">Google</span>
                      <div className="mock-job-role">Software Engineer Intern</div>
                    </div>
                    <span className="mock-job-badge">Applied</span>
                  </div>
                  <div className="mock-job-card">
                    <div>
                      <span className="mock-job-company">Meta</span>
                      <div className="mock-job-role">Frontend Lead</div>
                    </div>
                    <span
                      className="mock-job-badge"
                      style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        color: "#d97706",
                        borderColor: "rgba(245, 158, 11, 0.2)",
                      }}
                    >
                      Assessment
                    </span>
                  </div>
                  <div className="mock-job-card">
                    <div>
                      <span className="mock-job-company">Amazon</span>
                      <div className="mock-job-role">Fullstack Engineer</div>
                    </div>
                    <span
                      className="mock-job-badge"
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "#059669",
                        borderColor: "rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      Offer Received
                    </span>
                  </div>
                </div>
              </>
            )}

            {activeTab === "github" && (
              <>
                <div className="mock-dash-header">
                  <h3 className="h4 mock-dash-title mb-0">GitHub Repository Analytics</h3>
                  <span className="badge bg-dark-subtle text-dark border">
                    Synced Repositories
                  </span>
                </div>
                <div className="mock-git-list">
                  <div className="mock-git-item">
                    <div className="mock-git-title">
                      <FiCommand className="text-primary" /> devboard-platform
                    </div>
                    <div className="mock-git-meta">
                      <span>JavaScript</span>
                      <span>
                        <FiStar /> 2.1k
                      </span>
                      <span>
                        <FiGitBranch /> 402
                      </span>
                    </div>
                  </div>
                  <div className="mock-git-item">
                    <div className="mock-git-title">
                      <FiCommand className="text-primary" /> custom-compiler
                    </div>
                    <div className="mock-git-meta">
                      <span>C++</span>
                      <span>
                        <FiStar /> 890
                      </span>
                      <span>
                        <FiGitBranch /> 54
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "leetcode" && (
              <>
                <div className="mock-dash-header">
                  <h3 className="h4 mock-dash-title mb-0">LeetCode Problem Solving</h3>
                  <span className="badge bg-warning-subtle text-warning border">
                    Daily Stats Sync
                  </span>
                </div>
                <div className="mock-lc-summary">
                  <div className="mock-lc-box">
                    <div className="mock-lc-value text-primary">412</div>
                    <div className="mock-lc-label">Total Solved</div>
                  </div>
                  <div className="mock-lc-box">
                    <div className="mock-lc-value text-success">180</div>
                    <div className="mock-lc-label">Easy</div>
                  </div>
                  <div className="mock-lc-box">
                    <div className="mock-lc-value text-warning">192</div>
                    <div className="mock-lc-label">Medium</div>
                  </div>
                  <div className="mock-lc-box">
                    <div className="mock-lc-value text-danger">40</div>
                    <div className="mock-lc-label">Hard</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* CODE & TERMINAL SHOWCASE CARD */}
      {/* ======================================================== */}
      <section className="container py-4">
        <div className="bg-dark text-white rounded-3 p-4 shadow-lg border border-secondary max-w-850 mx-auto">
          <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary">
            <div className="d-flex align-items-center gap-2">
              <FiTerminal className="text-warning fs-5" />
              <span className="small fw-mono text-light">DevBoard Developer API Sync</span>
            </div>
            <span className="badge bg-success text-dark extra-small">Live Endpoint</span>
          </div>

          <pre className="m-0 text-success small fw-mono" style={{ lineHeight: "1.6" }}>
            <code>
{`// DevBoard Automated Developer Career Engine
const developer = new DevBoard({
  projects: ["MERN Stack Platform", "Custom Compiler", "AI Analyzer"],
  integrations: ["GitHub", "LeetCode", "LinkedIn"],
  targetRole: "Full Stack Engineer"
});

await developer.syncProfileStats();
console.log("Career Readiness Score:", developer.getProfileScore()); // 94% Verified`}
            </code>
          </pre>
        </div>
      </section>

      {/* ======================================================== */}
      {/* WHY DEVBOARD */}
      {/* ======================================================== */}
      <section ref={whyRef} className="bg-white py-5 border-top border-bottom reveal-section">
        <div className="container py-3">
          <div className="text-center max-w-700 mx-auto mb-5">
            <h2 className="section-title mb-2">
              Everything your developer career needs. In one place.
            </h2>
            <p className="text-muted fs-6">
              Stop switching between multiple spreadsheets, notes, and browser tabs to track your progress.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="p-4 bg-light rounded-3 border h-100 bento-card">
                <div className="feature-icon">
                  <FiLayers />
                </div>
                <h3 className="fw-bold text-dark h6">Build Your Portfolio</h3>
                <p className="small text-muted mb-2">
                  Manage, categorize, and showcase your production-ready projects with live demos and GitHub repositories.
                </p>
                <Link to="/features/developer-portfolio" className="extra-small fw-bold text-primary text-decoration-none">
                  Portfolio CMS &rarr;
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="p-4 bg-light rounded-3 border h-100 bento-card">
                <div className="feature-icon">
                  <FiBriefcase />
                </div>
                <h3 className="fw-bold text-dark h6">Track Applications</h3>
                <p className="small text-muted mb-2">
                  Never lose track of a job opportunity. Move applications from Applied to Interview and Offer.
                </p>
                <Link to="/features/job-application-tracker" className="extra-small fw-bold text-primary text-decoration-none">
                  Job Pipeline &rarr;
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="p-4 bg-light rounded-3 border h-100 bento-card">
                <div className="feature-icon">
                  <FiCode />
                </div>
                <h3 className="fw-bold text-dark h6">Measure Your Progress</h3>
                <p className="small text-muted mb-2">
                  Connect GitHub and LeetCode to analyze repository stars, language breakdowns, and problem difficulty.
                </p>
                <Link to="/features/github-analytics" className="extra-small fw-bold text-primary text-decoration-none">
                  GitHub &amp; LeetCode &rarr;
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="p-4 bg-light rounded-3 border h-100 bento-card">
                <div className="feature-icon">
                  <FiAward />
                </div>
                <h3 className="fw-bold text-dark h6">Build a Better Profile</h3>
                <p className="small text-muted mb-2">
                  Generate ATS-friendly resumes, optimize LinkedIn headlines, and maintain a 100% developer footprint.
                </p>
                <Link to="/features/linkedin-optimizer" className="extra-small fw-bold text-primary text-decoration-none">
                  Profile Optimization &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FEATURES BENTO GRID */}
      {/* ======================================================== */}
      <section id="features" ref={featuresRef} className="features-section reveal-section">
        <h2 className="section-title">One workspace. Your entire developer journey.</h2>
        <div className="bento-grid">
          <div className="bento-card bento-large">
            <div className="feature-icon">
              <FiBriefcase />
            </div>
            <h3>Pipeline Job Tracking</h3>
            <p>
              Replace messy spreadsheets with a developer job tracker. Categorize application stages, document target salaries, location details, and maintain private interview notes.
            </p>
            <div className="mt-3">
              <Link to="/features/job-application-tracker" className="extra-small fw-bold text-primary text-decoration-none">
                Explore Job Tracker <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="bento-card">
            <div className="feature-icon">
              <FiFileText />
            </div>
            <h3>Automated Resume Hub</h3>
            <p>
              Build and export ATS-friendly vector PDF layouts containing your skills, work experience history, and projects.
            </p>
            <div className="mt-3">
              <Link to="/features/ats-resume-builder" className="extra-small fw-bold text-primary text-decoration-none">
                ATS Resume Builder <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="bento-card">
            <div className="feature-icon">
              <FiActivity />
            </div>
            <h3>Productivity Notes</h3>
            <p>
              Draft interview notes, tag DSA ideas, and pin critical code snippets with a live markdown editor that auto-saves your thoughts.
            </p>
            <div className="mt-3">
              <Link to="/register" className="extra-small fw-bold text-primary text-decoration-none">
                Open Notes <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="bento-card bento-large">
            <div className="feature-icon">
              <FiCode />
            </div>
            <h3>Activity Feeds &amp; Integrations</h3>
            <p>
              Instantly fetch your repositories and LeetCode stats via official endpoints. Show off your rankings directly in your career portal.
            </p>
            <div className="mt-3 d-flex gap-3">
              <Link to="/features/github-analytics" className="extra-small fw-bold text-primary text-decoration-none">
                GitHub Sync <FiArrowRight />
              </Link>
              <Link to="/features/leetcode-tracker" className="extra-small fw-bold text-primary text-decoration-none">
                LeetCode Stats <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* CAREER COMMAND CENTER ECOSYSTEM */}
      {/* ======================================================== */}
      <section ref={ecosystemRef} className="bg-white py-5 border-top border-bottom reveal-section">
        <div className="container py-3 text-center">
          <h2 className="section-title mb-2">See your entire career at a glance.</h2>
          <p className="text-muted fs-6 mb-4 max-w-700 mx-auto">
            DevBoard connects your development activity, portfolio and career progress so you can make better career decisions.
          </p>

          <div className="p-4 bg-light rounded-3 border max-w-800 mx-auto">
            <div className="badge bg-primary fs-6 px-3 py-2 mb-3">DEVBOARD CORE</div>
            <div className="d-flex justify-content-center gap-3 flex-wrap mb-3">
              <Link to="/features/developer-portfolio" className="badge bg-white text-dark border p-2 fw-semibold text-decoration-none">
                <FiLayers className="text-primary me-1" /> Projects
              </Link>
              <Link to="/features/job-application-tracker" className="badge bg-white text-dark border p-2 fw-semibold text-decoration-none">
                <FiBriefcase className="text-purple me-1" /> Job Tracker
              </Link>
              <Link to="/features/ats-resume-builder" className="badge bg-white text-dark border p-2 fw-semibold text-decoration-none">
                <FiFileText className="text-info me-1" /> Resume Builder
              </Link>
            </div>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/features/github-analytics" className="badge bg-white text-dark border p-2 fw-semibold text-decoration-none">
                <FiGithub className="text-dark me-1" /> GitHub
              </Link>
              <Link to="/features/leetcode-tracker" className="badge bg-white text-dark border p-2 fw-semibold text-decoration-none">
                <FiCode className="text-warning me-1" /> LeetCode
              </Link>
              <Link to="/features/linkedin-optimizer" className="badge bg-white text-dark border p-2 fw-semibold text-decoration-none">
                <FiLinkedin className="text-primary me-1" /> LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* HOW IT WORKS */}
      {/* ======================================================== */}
      <section ref={howRef} className="py-5 reveal-section">
        <div className="container py-3">
          <h2 className="section-title text-center mb-5">
            Start managing your career in minutes.
          </h2>

          <div className="row g-4 text-center">
            <div className="col-12 col-md-3">
              <div className="p-3">
                <div className="h3 fw-bold text-primary mb-2">01</div>
                <h3 className="fw-bold h6 text-dark">Create your profile</h3>
                <p className="extra-small text-muted">
                  Add your skills, location, bio, and career goals.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="p-3">
                <div className="h3 fw-bold text-purple mb-2">02</div>
                <h3 className="fw-bold h6 text-dark">Connect your profiles</h3>
                <p className="extra-small text-muted">
                  Sync GitHub, LeetCode, and LinkedIn handles.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="p-3">
                <div className="h3 fw-bold text-warning mb-2">03</div>
                <h3 className="fw-bold h6 text-dark">Track your progress</h3>
                <p className="extra-small text-muted">
                  Manage projects, job applications, and notes.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="p-3">
                <div className="h3 fw-bold text-success mb-2">04</div>
                <h3 className="fw-bold h6 text-dark">Improve and grow</h3>
                <p className="extra-small text-muted">
                  Use analytics &amp; ATS scores to get hired.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FAQ SECTION */}
      {/* ======================================================== */}
      <section
        id="faq"
        ref={faqRef}
        className="features-section reveal-section"
        style={{ borderTop: "1px solid #e2e8f0", paddingTop: "5rem" }}
      >
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div className="faq-card">
            <h3 className="h5 fw-bold text-dark mb-2">How does GitHub and LeetCode syncing work?</h3>
            <p>
              Once you connect your public usernames inside your Profile Settings, our background services fetch your public profile repository metadata and coding stats directly from official APIs to keep your metrics fresh.
            </p>
          </div>
          <div className="faq-card">
            <h3 className="h5 fw-bold text-dark mb-2">Is my personal job tracking info private?</h3>
            <p>
              Yes. Every job application, notes, and uploaded certification detail is locked down securely to your private database user ID. Other users cannot search or access your dashboard metrics.
            </p>
          </div>
          <div className="faq-card">
            <h3 className="h5 fw-bold text-dark mb-2">Can I export my generated resume?</h3>
            <p>
              Absolutely. The resume section pulls your latest work profile details dynamically, letting you print or save the structured vector layout directly from your browser.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FINAL CTA BLOCK */}
      {/* ======================================================== */}
      <section
        ref={ctaRef}
        className="features-section text-center reveal-section"
        style={{ padding: "4rem 1.5rem" }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "4rem 2rem",
            maxWidth: "800px",
            margin: "0 auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2 className="fs-3 fw-bold mb-2 text-dark">
            Ready to supercharge your developer career?
          </h2>
          <p className="text-muted mb-4 fs-6">
            Join other engineers who are organizing their jobs, profiles, and projects inside DevBoard.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/register" className="btn btn-primary-minimal btn-xl">
              Start Your Workspace Free <FiArrowRight className="cta-arrow" />
            </Link>
            <Link to="/login" className="btn btn-secondary-minimal btn-xl">
              Sign In
            </Link>
          </div>
        </div>
      </section>
      </main>

      {/* ======================================================== */}
      {/* FOOTER */}
      {/* ======================================================== */}
      <footer className="home-footer">
        <div className="container">
          <div className="row g-4 py-4 border-bottom">
            <div className="col-12 col-lg-3">
              <div className="d-flex align-items-center gap-2 fw-bold text-dark fs-5 mb-2">
                <FiCommand className="text-primary" /> DevBoard
              </div>
              <p className="text-muted small mb-0">
                Unified developer career hub and portfolio analytics platform. Master job hunting, code tracking, resume generation, and technical presence.
              </p>
            </div>
            <div className="col-6 col-lg-3">
              <div className="fw-bold text-dark small text-uppercase mb-2">Platform Features</div>
              <ul className="list-unstyled extra-small space-y-1 mb-0">
                <li className="mb-1">
                  <Link to="/features/job-application-tracker" className="text-muted text-decoration-none">
                    Job Application Tracker
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/features/ats-resume-builder" className="text-muted text-decoration-none">
                    ATS Resume Builder &amp; Match
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/features/github-analytics" className="text-muted text-decoration-none">
                    GitHub Developer Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-3">
              <div className="fw-bold text-dark small text-uppercase mb-2">Developer Tools</div>
              <ul className="list-unstyled extra-small space-y-1 mb-0">
                <li className="mb-1">
                  <Link to="/features/leetcode-tracker" className="text-muted text-decoration-none">
                    LeetCode Progress Tracker
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/features/developer-portfolio" className="text-muted text-decoration-none">
                    Portfolio CMS Showcase
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/features/linkedin-optimizer" className="text-muted text-decoration-none">
                    LinkedIn Profile Optimizer
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-3">
              <div className="fw-bold text-dark small text-uppercase mb-2">Career Guides &amp; Resources</div>
              <ul className="list-unstyled extra-small space-y-1 mb-0">
                <li className="mb-1">
                  <Link to="/blog" className="text-muted text-decoration-none">
                    Engineering Career Hub
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/blog/ats-friendly-developer-resume" className="text-muted text-decoration-none">
                    ATS Developer Resume Guide
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/blog/software-engineering-interview-preparation" className="text-muted text-decoration-none">
                    Coding Interview Preparation
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/blog/improve-github-profile" className="text-muted text-decoration-none">
                    GitHub Profile Optimization
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 py-3">
            <div className="small text-muted">
              &copy; {new Date().getFullYear()} DevBoard. All rights reserved.
            </div>
            <div className="d-flex gap-3 extra-small text-muted">
              <Link to="/login" className="text-muted text-decoration-none">Sign In</Link>
              <Link to="/register" className="text-muted text-decoration-none">Register</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
