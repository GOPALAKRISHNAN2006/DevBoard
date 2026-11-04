import { Link } from 'react-router-dom';
import {
  FiBriefcase,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiDollarSign,
  FiLayers,
  FiSearch,
  FiCommand,
  FiInfo
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getFeaturePageStructuredData } from '../../utils/structuredData';
import './FeaturePage.css';

export default function JobTrackerFeature() {
  const pageTitle = "Developer Job Application Tracker & Pipeline Kanban – DevBoard";
  const pageDescription = "Track software engineering job applications with a dedicated Kanban pipeline, stage progression tracking, salary notes, and status filtering.";
  const canonicalUrl = "https://dev-board-mauve.vercel.app/features/job-application-tracker";

  const structuredData = getFeaturePageStructuredData({
    name: pageTitle,
    description: pageDescription,
    path: "/features/job-application-tracker",
    featureName: "Job Application Tracker"
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
          <a href="#overview" className="feature-nav-link">Capabilities</a>
          <a href="#preview" className="feature-nav-link">Pipeline View</a>
          <a href="#workflow" className="feature-nav-link">Workflow</a>
          <Link to="/features/ats-resume-builder" className="feature-nav-link">ATS Resume</Link>
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
            Job Application Tracker
          </li>
        </ol>
      </nav>

      <main role="main">
        {/* Hero Section */}
        <header className="feature-hero" id="overview">
          <div className="feature-pill-badge">
            <FiBriefcase /> Feature Spotlight: Career Pipeline
          </div>
          <h1 className="feature-hero-title">
            Developer Job Application Tracker &amp; <br />
            <span className="text-gradient">Pipeline Management Hub</span>
          </h1>
          <p className="feature-hero-subtitle">
            Say goodbye to disorganized spreadsheets. DevBoard provides a streamlined, developer-focused job application tracker with interactive Kanban stages, interview notes, compensation tracking, and search filtering.
          </p>
          <div className="feature-hero-actions">
            <Link to="/register" className="btn btn-primary-minimal btn-xl">
              Start Tracking Free <FiArrowRight className="ms-1" />
            </Link>
            <a href="#preview" className="btn btn-secondary-minimal btn-xl">
              Explore Live Pipeline
            </a>
          </div>
        </header>

        {/* Realistic Kanban Product UI Preview */}
        <section className="feature-preview-container" id="preview" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="visually-hidden">Live Kanban Pipeline Preview</h2>
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
                  DevBoard Pipeline Kanban
                </span>
              </div>
            </div>
            <div className="feature-preview-body bg-light">
              <div className="row g-3">
                {/* Applied Column */}
                <div className="col-12 col-md-4">
                  <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge bg-secondary-subtle text-secondary fw-bold">Applied (1)</span>
                      <span className="extra-small text-muted">Recent</span>
                    </div>
                    <div className="p-2 border rounded-2 bg-light mb-2">
                      <div className="fw-bold text-dark small">Google</div>
                      <div className="text-muted extra-small">Software Engineer – Remote</div>
                      <div className="d-flex justify-content-between align-items-center mt-2 extra-small text-muted">
                        <span>$145k - $165k</span>
                        <span className="badge bg-light text-dark border">Full-time</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interview Column */}
                <div className="col-12 col-md-4">
                  <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge bg-primary-subtle text-primary fw-bold">Interview (2)</span>
                      <span className="extra-small text-primary fw-semibold">In Progress</span>
                    </div>
                    <div className="p-2 border rounded-2 bg-light mb-2 border-primary-subtle">
                      <div className="fw-bold text-dark small">Stripe</div>
                      <div className="text-muted extra-small">Frontend Infrastructure</div>
                      <div className="d-flex justify-content-between align-items-center mt-2 extra-small text-muted">
                        <span className="text-primary fw-semibold">Round 2: System Design</span>
                        <span className="badge bg-primary-subtle text-primary">Hybrid</span>
                      </div>
                    </div>
                    <div className="p-2 border rounded-2 bg-light">
                      <div className="fw-bold text-dark small">Vercel</div>
                      <div className="text-muted extra-small">React / Next.js Engineer</div>
                      <div className="d-flex justify-content-between align-items-center mt-2 extra-small text-muted">
                        <span>Take-Home Review</span>
                        <span className="badge bg-light text-dark border">Remote</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Offer Column */}
                <div className="col-12 col-md-4">
                  <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge bg-success-subtle text-success fw-bold">Offer (1)</span>
                      <span className="extra-small text-success fw-bold">Decision Pending</span>
                    </div>
                    <div className="p-2 border rounded-2 bg-white border-success">
                      <div className="fw-bold text-dark small">GitHub</div>
                      <div className="text-muted extra-small">Senior Developer Advocate</div>
                      <div className="d-flex justify-content-between align-items-center mt-2 extra-small text-success fw-bold">
                        <span>$175,000 + Equity</span>
                        <FiCheckCircle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Pillars Grid */}
        <section className="feature-pillars-section" aria-labelledby="capabilities-heading">
          <div className="feature-section-header">
            <h2 id="capabilities-heading">Engineered for Technical Job Seekers</h2>
            <p>Maintain complete oversight over every opportunity, interview stage, and salary offer without context switching.</p>
          </div>
          <div className="feature-grid-3">
            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap indigo">
                <FiLayers />
              </div>
              <h3>Multi-Stage Kanban Stages</h3>
              <p>
                Organize opportunities across 5 distinct stages: <code>Applied</code>, <code>Assessment</code>, <code>Interview</code>, <code>Offer</code>, and <code>Rejected</code>.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap emerald">
                <FiDollarSign />
              </div>
              <h3>Compensation &amp; Location Tracking</h3>
              <p>
                Document salary expectations, confirmed compensation ranges, job locations (Remote, Hybrid, Onsite), and company notes in one structured card.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap amber">
                <FiFilter />
              </div>
              <h3>Debounced Search &amp; Fast Filters</h3>
              <p>
                Instantly filter across dozens of open roles by company name, job title, status category, or employment type with zero lag.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap purple">
                <FiClock />
              </div>
              <h3>Interview Notes &amp; History</h3>
              <p>
                Attach private preparation notes, technical questions asked, interviewer details, and stage progression directly to the company record.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap sky">
                <FiSearch />
              </div>
              <h3>Dual Kanban &amp; Table Views</h3>
              <p>
                Switch smoothly between high-level visual pipeline columns and dense tabular data views depending on your review workflow.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap rose">
                <FiCheckCircle />
              </div>
              <h3>Zero User Data Exposure</h3>
              <p>
                All your application records, offer details, and personal notes are locked down securely to your private authenticated database account.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Steps Section */}
        <section className="feature-workflow-section" aria-labelledby="workflow-heading">
          <div className="feature-section-header">
            <h2 id="workflow-heading">How DevBoard Accelerates Your Search</h2>
            <p>From initial application submission to final offer negotiation in four steps.</p>
          </div>
          <div className="workflow-steps-grid">
            <div className="workflow-step-card">
              <div className="workflow-step-num">01</div>
              <h3>Add Application</h3>
              <p>Log company name, job role, remote status, target compensation, and job description URL in seconds.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">02</div>
              <h3>Track Assessments</h3>
              <p>Advance cards to Assessment when take-homes arrive. Track interview notes, role details, and status updates directly on each card.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">03</div>
              <h3>Document Rounds</h3>
              <p>Log technical phone screens, coding tests, and behavioral interviews with attached preparation notes.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">04</div>
              <h3>Evaluate Offers</h3>
              <p>Compare total compensation, benefits, and team culture side-by-side to make the best career decision.</p>
            </div>
          </div>
        </section>

        {/* Related Features Internal Linking */}
        <section className="related-features-section" aria-labelledby="related-heading">
          <div className="feature-section-header">
            <h2 id="related-heading">Connected Developer Tools in DevBoard</h2>
            <p>Your job search is stronger when integrated with your resume, coding metrics, and portfolio.</p>
          </div>
          <div className="related-features-grid">
            <Link to="/features/ats-resume-builder" className="related-feature-card">
              <h4>ATS Resume Builder <FiArrowRight /></h4>
              <p>Match your resume keywords directly against job specifications before applying.</p>
            </Link>
            <Link to="/features/github-analytics" className="related-feature-card">
              <h4>GitHub Analytics <FiArrowRight /></h4>
              <p>Showcase repository language dominance and commit frequency to engineering recruiters.</p>
            </Link>
            <Link to="/features/leetcode-tracker" className="related-feature-card">
              <h4>LeetCode Tracker <FiArrowRight /></h4>
              <p>Track algorithmic preparation and problem difficulty distribution for technical interviews.</p>
            </Link>
            <Link to="/features/developer-portfolio" className="related-feature-card">
              <h4>Portfolio CMS <FiArrowRight /></h4>
              <p>Showcase production projects with live demos and repository links to interviewers.</p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="feature-cta-banner">
          <div className="feature-cta-content">
            <h2>Take Control of Your Developer Search</h2>
            <p>Join engineers organizing their career opportunities in a dedicated, unified dashboard.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn btn-primary-minimal btn-xl">
                Create Free Workspace <FiArrowRight className="ms-1" />
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
