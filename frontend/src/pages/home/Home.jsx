import { useState } from "react";
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
  FiActivity
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";

export default function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-logo">
          <FiCommand className="home-logo-icon" />
          DevBoard
        </div>
        <div className="home-nav-links d-none d-md-flex">
          <a href="#features" className="nav-link-minimal">Features</a>
          <a href="#demo" className="nav-link-minimal">Interactive Demo</a>
          <a href="#faq" className="nav-link-minimal">FAQ</a>
        </div>
        <div className="home-nav-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary-minimal">
              Dashboard <FiArrowRight />
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary-minimal" style={{ border: "none" }}>
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary-minimal">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <header className="hero-section">
        <div className="hero-badge">
          DevBoard 2.0 &mdash; The career command center
        </div>
        <h1 className="hero-title">
          Track less. <br />
          <span className="text-gradient">Engineer more.</span>
        </h1>
        <p className="hero-subtitle">
          DevBoard consolidates your developer job applications, showcases your production-ready projects, and compiles statistics directly from your GitHub and LeetCode.
        </p>
        <div className="hero-cta">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary-minimal btn-xl">
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary-minimal btn-xl">
                Get started free
              </Link>
              <a href="#features" className="btn btn-secondary-minimal btn-xl">
                Explore Features
              </a>
            </>
          )}
        </div>
      </header>

      {/* Interactive Mock Dashboard */}
      <section id="demo" className="mock-dashboard-wrapper">
        <div className="mock-dashboard">
          {/* Mock Sidebar */}
          <aside className="mock-dash-sidebar">
            <div className="mock-dash-nav-header">Workspace</div>
            <button 
              className={`mock-dash-tab ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => setActiveTab("jobs")}
            >
              <FiBriefcase size={16} /> Jobs Tracker
            </button>
            <button 
              className={`mock-dash-tab ${activeTab === "github" ? "active" : ""}`}
              onClick={() => setActiveTab("github")}
            >
              <FiGithub size={16} /> GitHub Sync
            </button>
            <button 
              className={`mock-dash-tab ${activeTab === "leetcode" ? "active" : ""}`}
              onClick={() => setActiveTab("leetcode")}
            >
              <FiCode size={16} /> LeetCode Stats
            </button>
          </aside>

          {/* Mock Dashboard Body */}
          <main className="mock-dash-main">
            {activeTab === "jobs" && (
              <>
                <div className="mock-dash-header">
                  <h4>Applications</h4>
                  <span className="small">3 Active Opportunities</span>
                </div>
                <div className="mock-grid-jobs">
                  <div className="mock-job-card">
                    <span className="mock-job-company">Google</span>
                    <span className="mock-job-role">Software Engineer</span>
                    <span className="mock-job-badge">Applied</span>
                  </div>
                  <div className="mock-job-card">
                    <span className="mock-job-company">Meta</span>
                    <span className="mock-job-role">Frontend Lead</span>
                    <span className="mock-job-badge">Interview scheduled</span>
                  </div>
                  <div className="mock-job-card">
                    <span className="mock-job-company">Amazon</span>
                    <span className="mock-job-role">Fullstack Engineer</span>
                    <span className="mock-job-badge" style={{ borderColor: "#52525b", color: "#fff" }}>Offer Received</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === "github" && (
              <>
                <div className="mock-dash-header">
                  <h4>GitHub Sync</h4>
                  <span className="small">Synced repositories</span>
                </div>
                <div className="mock-git-list">
                  <div className="mock-git-item">
                    <div className="mock-git-title">
                      <FiCommand /> devboard-platform
                    </div>
                    <div className="mock-git-meta">
                      <span>JavaScript</span>
                      <span><FiStar /> 2.1k</span>
                      <span><FiGitBranch /> 402</span>
                    </div>
                  </div>
                  <div className="mock-git-item">
                    <div className="mock-git-title">
                      <FiCommand /> custom-compiler
                    </div>
                    <div className="mock-git-meta">
                      <span>C++</span>
                      <span><FiStar /> 890</span>
                      <span><FiGitBranch /> 54</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "leetcode" && (
              <>
                <div className="mock-dash-header">
                  <h4>LeetCode Progress</h4>
                  <span className="small">Daily stats sync</span>
                </div>
                <div className="mock-lc-summary">
                  <div className="mock-lc-box">
                    <div className="mock-lc-value">412</div>
                    <div className="mock-lc-label">Total Solved</div>
                  </div>
                  <div className="mock-lc-box">
                    <div className="mock-lc-value" style={{ color: "#a1a1aa" }}>180</div>
                    <div className="mock-lc-label">Easy</div>
                  </div>
                  <div className="mock-lc-box">
                    <div className="mock-lc-value" style={{ color: "#a1a1aa" }}>192</div>
                    <div className="mock-lc-label">Medium</div>
                  </div>
                  <div className="mock-lc-box">
                    <div className="mock-lc-value" style={{ color: "#a1a1aa" }}>40</div>
                    <div className="mock-lc-label">Hard</div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="features-section">
        <h2 className="section-title">All your career workflows, unified.</h2>
        <div className="bento-grid">
          <div className="bento-card bento-large">
            <div className="feature-icon">
              <FiBriefcase />
            </div>
            <h3>Pipeline Job Tracking</h3>
            <p>
              Replace spreadsheets with a developer job tracker. Categorize stages, document salaries, deadlines, and set custom interview notes.
            </p>
          </div>
          <div className="bento-card">
            <div className="feature-icon">
              <FiFileText />
            </div>
            <h3>Automated Resume Hub</h3>
            <p>
              Export standard resume layouts containing your skills, work experience history, and certificates automatically.
            </p>
          </div>
          <div className="bento-card">
            <div className="feature-icon">
              <FiActivity />
            </div>
            <h3>Productivity Notes</h3>
            <p>
              Draft notes, tag ideas, and pin critical snippets with a live markdown editor that auto-saves your thoughts.
            </p>
          </div>
          <div className="bento-card bento-large">
            <div className="feature-icon">
              <FiCode />
            </div>
            <h3>Activity Feeds & Integration</h3>
            <p>
              Instantly fetch your repositories and LeetCode stats. Show off your rankings directly in your career portal.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="features-section" style={{ borderTop: "1px solid #18181b", paddingTop: "5rem" }}>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="faq-card">
            <h5>How does GitHub and LeetCode syncing work?</h5>
            <p>Once you connect your public usernames inside your Profile Settings, our background services fetch your public profile repository metadata and coding stats directly from official APIs to keep your metrics fresh.</p>
          </div>
          <div className="faq-card">
            <h5>Is my personal job tracking info private?</h5>
            <p>Yes. Every job application, notes, and uploaded certification detail is locked down securely to your private database user ID. Other users cannot search or access your dashboard metrics.</p>
          </div>
          <div className="faq-card">
            <h5>Can I export my generated resume?</h5>
            <p>Absolutely. The resume section pulls your latest work profile details dynamically, letting you print or save the structured layout directly from your browser.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="features-section text-center" style={{ padding: "6rem 2rem 2rem" }}>
        <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "16px", padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
          <h3 className="fs-3 mb-2" style={{ color: "#fff" }}>Ready to supercharge your developer career?</h3>
          <p className="text-muted mb-4" style={{ fontSize: "1rem" }}>Join other engineers who are organizing their jobs, profiles, and projects inside DevBoard.</p>
          <Link to="/register" className="btn btn-primary-minimal btn-xl">
            Start Your Workspace Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>
          &copy; {new Date().getFullYear()} DevBoard. Designed with clean outlines.
        </p>
      </footer>
    </div>
  );
}
