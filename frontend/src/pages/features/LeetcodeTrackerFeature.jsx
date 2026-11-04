import { Link } from 'react-router-dom';
import {
  FiCode,
  FiArrowRight,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiActivity,
  FiCommand,
  FiBarChart2,
  FiCalendar,
  FiInfo
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getFeaturePageStructuredData } from '../../utils/structuredData';
import './FeaturePage.css';

export default function LeetcodeTrackerFeature() {
  const pageTitle = "LeetCode Progress Tracker & DSA Interview Dashboard – DevBoard";
  const pageDescription = "Track LeetCode problem difficulty breakdowns (Easy, Medium, Hard), contest rating history, submission consistency, and milestone preparation goals.";
  const canonicalUrl = "https://dev-board-mauve.vercel.app/features/leetcode-tracker";

  const structuredData = getFeaturePageStructuredData({
    name: pageTitle,
    description: pageDescription,
    path: "/features/leetcode-tracker",
    featureName: "LeetCode Progress Tracker"
  });

  return (
    <div className="feature-landing-page">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        robots="index, follow"
        structuredData={structuredData}
      />

      {/* Top Navigation */}
      <nav className="feature-nav" aria-label="Feature navigation">
        <Link to="/" className="feature-nav-brand">
          <FiCommand className="text-primary" /> DevBoard
        </Link>
        <div className="feature-nav-links d-none d-md-flex">
          <Link to="/" className="feature-nav-link">Home</Link>
          <a href="#overview" className="feature-nav-link">Overview</a>
          <a href="#preview" className="feature-nav-link">DSA Metrics</a>
          <a href="#pillars" className="feature-nav-link">Features</a>
          <a href="#workflow" className="feature-nav-link">Workflow</a>
          <Link to="/features/developer-portfolio" className="feature-nav-link">Portfolio</Link>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link to="/login" className="btn btn-secondary-minimal" style={{ border: 'none' }}>
            Sign in
          </Link>
          <Link to="/register" className="btn btn-primary-minimal">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Visible Breadcrumb Trail */}
      <nav className="feature-breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="feature-breadcrumb-list">
          <li className="feature-breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="feature-breadcrumb-separator" aria-hidden="true">/</li>
          <li className="feature-breadcrumb-item">
            <a href="/#features">Features</a>
          </li>
          <li className="feature-breadcrumb-separator" aria-hidden="true">/</li>
          <li className="feature-breadcrumb-item active" aria-current="page">
            LeetCode Progress Tracker
          </li>
        </ol>
      </nav>

      <main role="main">
        {/* Hero Section */}
        <header className="feature-hero" id="overview">
          <div className="feature-pill-badge">
            <FiCode /> Feature Spotlight: Algorithmic Preparation
          </div>
          <h1 className="feature-hero-title">
            LeetCode Progress Tracker &amp; <br />
            <span className="text-gradient">DSA Interview Analytics</span>
          </h1>
          <p className="feature-hero-subtitle">
            Structure your technical interview preparation. Monitor solved problems across Easy, Medium, and Hard tiers, track contest ratings, evaluate submission consistency, and crush your milestone goals.
          </p>
          <div className="feature-hero-actions">
            <Link to="/register" className="btn btn-primary-minimal btn-xl">
              Track Your LeetCode Free <FiArrowRight className="ms-1" />
            </Link>
            <a href="#preview" className="btn btn-secondary-minimal btn-xl">
              Explore Analytics View
            </a>
          </div>
        </header>

        {/* Realistic LeetCode Product Preview */}
        <section className="feature-preview-container" id="preview" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="visually-hidden">LeetCode Metrics Dashboard Preview</h2>
          <div className="feature-preview-card">
            <div className="feature-preview-header">
              <div className="preview-dots">
                <span className="preview-dot red"></span>
                <span className="preview-dot yellow"></span>
                <span className="preview-dot green"></span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="preview-demo-badge">
                  <FiInfo /> Sample preview data (illustrative)
                </span>
                <span className="badge bg-primary-subtle text-primary border extra-small fw-bold">
                  LeetCode Performance &amp; Milestone Analytics
                </span>
              </div>
            </div>
            <div className="feature-preview-body bg-light">
              {/* Stat Counters Bar */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-white rounded-3 border shadow-sm text-center">
                    <div className="text-muted extra-small text-uppercase fw-bold">Demo Total Solved</div>
                    <div className="fs-3 fw-bold text-dark mt-1">486</div>
                    <span className="badge bg-primary-subtle text-primary extra-small mt-1">68.2% Acceptance</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-white rounded-3 border shadow-sm text-center">
                    <div className="text-muted extra-small text-uppercase fw-bold">Demo Contest Rating</div>
                    <div className="fs-3 fw-bold text-success mt-1">1,924</div>
                    <span className="badge bg-success-subtle text-success extra-small mt-1">Sample Rating Demo</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-white rounded-3 border shadow-sm text-center">
                    <div className="text-muted extra-small text-uppercase fw-bold">Demo Practice Streak</div>
                    <div className="fs-3 fw-bold text-warning mt-1">42 Days</div>
                    <span className="badge bg-warning-subtle text-dark extra-small mt-1">Daily Consistent</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-white rounded-3 border shadow-sm text-center">
                    <div className="text-muted extra-small text-uppercase fw-bold">Demo Global Ranking</div>
                    <div className="fs-3 fw-bold text-dark mt-1">32,410</div>
                    <span className="badge bg-secondary-subtle text-secondary extra-small mt-1">Sample Global Rank</span>
                  </div>
                </div>
              </div>

              {/* Difficulty Breakdown Bars */}
              <div className="p-3 bg-white rounded-3 border shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold small text-dark">Solved Problems by Difficulty Tier</span>
                  <span className="extra-small text-muted">Real-Time Sync</span>
                </div>
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <div className="p-2 border rounded-2 bg-light">
                      <div className="d-flex justify-content-between extra-small fw-bold text-success mb-1">
                        <span>Easy (184 Solved)</span>
                        <span>92% target</span>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div className="progress-bar bg-success" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="p-2 border rounded-2 bg-light">
                      <div className="d-flex justify-content-between extra-small fw-bold text-warning mb-1">
                        <span>Medium (248 Solved)</span>
                        <span>82% target</span>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div className="progress-bar bg-warning" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="p-2 border rounded-2 bg-light">
                      <div className="d-flex justify-content-between extra-small fw-bold text-danger mb-1">
                        <span>Hard (54 Solved)</span>
                        <span>54% target</span>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div className="progress-bar bg-danger" style={{ width: '54%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Pillars Grid */}
        <section className="feature-pillars-section" id="pillars" aria-labelledby="capabilities-heading">
          <div className="feature-section-header">
            <h2 id="capabilities-heading">Actionable Coding Interview Intelligence</h2>
            <p>Everything you need to systematically conquer technical phone screens and on-sites.</p>
          </div>
          <div className="feature-grid-3">
            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap indigo">
                <FiBarChart2 />
              </div>
              <h3>Granular Difficulty Progress</h3>
              <p>
                Track counts and percentages for Easy, Medium, and Hard problems with visual progress bars to ensure balanced algorithmic depth.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap emerald">
                <FiAward />
              </div>
              <h3>Contest Rating &amp; Percentile</h3>
              <p>
                Monitor competitive programming standings, contest badges (Knight / Guardian), and global rank percentiles over time.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap amber">
                <FiCalendar />
              </div>
              <h3>Consistency Heatmap</h3>
              <p>
                Visualize your daily practice cadence with an interactive submission activity matrix that highlights preparation momentum.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap purple">
                <FiTarget />
              </div>
              <h3>Custom Milestone Goals</h3>
              <p>
                Set concrete targets (e.g., &quot;Reach 200 Mediums before Google on-site&quot;) and watch your completion percentage advance with every solve.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap sky">
                <FiTrendingUp />
              </div>
              <h3>Language-Specific Stats</h3>
              <p>
                Inspect which languages you use most for algorithmic challenges (Python, C++, Java, or TypeScript) to match interview requirements.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap rose">
                <FiActivity />
              </div>
              <h3>Instant Refresh On-Demand</h3>
              <p>
                Solve a problem on LeetCode and instantly refresh your DevBoard dashboard with a single click to update your career stats.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Steps Section */}
        <section className="feature-workflow-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="feature-section-header">
            <h2 id="workflow-heading">How to Optimize Your Interview Prep</h2>
            <p>From connection to interview-ready confidence in four steps.</p>
          </div>
          <div className="workflow-steps-grid">
            <div className="workflow-step-card">
              <div className="workflow-step-num">01</div>
              <h3>Connect Username</h3>
              <p>Provide your LeetCode handle. No passwords or private tokens required.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">02</div>
              <h3>Sync Problem History</h3>
              <p>DevBoard pulls your real-time solve counts, submission rates, and contest ratings.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">03</div>
              <h3>Define Target Milestones</h3>
              <p>Set specific difficulty targets aligned with top-tier tech company interview standards.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">04</div>
              <h3>Ace Technical Rounds</h3>
              <p>Walk into coding interviews with verified problem-solving confidence and sharp recall.</p>
            </div>
          </div>
        </section>

        {/* Related Features Internal Linking */}
        <section className="related-features-section" aria-labelledby="related-heading">
          <div className="feature-section-header">
            <h2 id="related-heading">Explore the DevBoard Platform</h2>
            <p>Connect your coding stats with active job applications and engineering portfolios.</p>
          </div>
          <div className="related-features-grid">
            <Link to="/features/job-application-tracker" className="related-feature-card">
              <h4>Job Application Tracker <FiArrowRight /></h4>
              <p>Link your interview preparation directly to scheduled company rounds.</p>
            </Link>
            <Link to="/features/github-analytics" className="related-feature-card">
              <h4>GitHub Analytics <FiArrowRight /></h4>
              <p>Balance algorithmic problem solving with real-world open source projects.</p>
            </Link>
            <Link to="/features/developer-portfolio" className="related-feature-card">
              <h4>Portfolio CMS <FiArrowRight /></h4>
              <p>Present full-stack projects alongside your verified LeetCode badges.</p>
            </Link>
            <Link to="/features/ats-resume-builder" className="related-feature-card">
              <h4>ATS Resume Builder <FiArrowRight /></h4>
              <p>Generate clean, keyword-matched resumes for software engineering roles.</p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="feature-cta-banner">
          <div className="feature-cta-content">
            <h2>Track Your Way to Your Dream Tech Role</h2>
            <p>Bring structure, metrics, and consistency to your algorithmic interview preparation.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn btn-primary-minimal btn-xl">
                Start Tracking Free <FiArrowRight className="ms-1" />
              </Link>
              <Link to="/login" className="btn btn-secondary-minimal btn-xl">
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="feature-footer">
        <div className="feature-footer-inner">
          <div>
            <strong>DevBoard</strong> — Unified Developer Career Hub &amp; Portfolio Analytics
          </div>
          <div className="feature-footer-links">
            <Link to="/">Home</Link>
            <Link to="/features/job-application-tracker">Job Tracker</Link>
            <Link to="/features/ats-resume-builder">ATS Resume</Link>
            <Link to="/features/github-analytics">GitHub Sync</Link>
            <Link to="/features/leetcode-tracker">LeetCode Stats</Link>
            <Link to="/features/developer-portfolio">Portfolio</Link>
            <Link to="/features/linkedin-optimizer">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
