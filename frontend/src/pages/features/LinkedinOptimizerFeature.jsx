import { Link } from 'react-router-dom';
import {
  FiLinkedin,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiUserCheck,
  FiFileText,
  FiCommand,
  FiTarget,
  FiCheckSquare,
  FiInfo
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getFeaturePageStructuredData } from '../../utils/structuredData';
import './FeaturePage.css';

export default function LinkedinOptimizerFeature() {
  const pageTitle = "LinkedIn Profile Optimizer for Software Engineers – DevBoard";
  const pageDescription = "Audit your LinkedIn technical profile strength, improve profile completeness, and cross-reference profile consistency against your resume.";
  const canonicalUrl = "https://dev-board-mauve.vercel.app/features/linkedin-optimizer";

  const structuredData = getFeaturePageStructuredData({
    name: pageTitle,
    description: pageDescription,
    path: "/features/linkedin-optimizer",
    featureName: "LinkedIn Profile Optimizer"
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
          <a href="#preview" className="feature-nav-link">Strength Audit</a>
          <a href="#pillars" className="feature-nav-link">Capabilities</a>
          <a href="#workflow" className="feature-nav-link">Workflow</a>
          <Link to="/features/job-application-tracker" className="feature-nav-link">Job Tracker</Link>
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
            LinkedIn Profile Optimizer
          </li>
        </ol>
      </nav>

      <main role="main">
        {/* Hero Section */}
        <header className="feature-hero" id="overview">
          <div className="feature-pill-badge">
            <FiLinkedin /> Feature Spotlight: Professional Branding
          </div>
          <h1 className="feature-hero-title">
            LinkedIn Profile Optimizer &amp; <br />
            <span className="text-gradient">Profile Strength Hub</span>
          </h1>
          <p className="feature-hero-subtitle">
            Stand out in technical recruiter searches. DevBoard evaluates your profile completeness, highlights key engineering skills, and cross-checks your profile against your resume for seamless career consistency.
          </p>
          <div className="feature-hero-actions">
            <Link to="/register" className="btn btn-primary-minimal btn-xl">
              Audit Your Profile Free <FiArrowRight className="ms-1" />
            </Link>
            <a href="#preview" className="btn btn-secondary-minimal btn-xl">
              See Strength Audit
            </a>
          </div>
        </header>

        {/* Realistic LinkedIn Optimizer Product Preview */}
        <section className="feature-preview-container" id="preview" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="visually-hidden">LinkedIn Profile Strength Card Preview</h2>
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
                  DevBoard Profile Strength Card
                </span>
              </div>
            </div>
            <div className="feature-preview-body bg-light">
              <div className="row g-4 align-items-center">
                {/* Scorecard Column */}
                <div className="col-12 col-md-5">
                  <div className="p-4 bg-white rounded-3 border shadow-sm text-center">
                    <span className="text-muted extra-small text-uppercase fw-bold letter-spacing-wide">
                      Profile Completeness (Demo)
                    </span>
                    <div className="display-4 fw-bold text-success my-2">
                      91<span className="fs-4 text-muted">%</span>
                    </div>
                    <div className="progress mb-3" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: '91%' }}
                        aria-valuenow="91"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className="badge bg-success-subtle text-success extra-small fw-bold">
                      Illustrative Completeness Indicator
                    </span>
                    <p className="extra-small text-muted mt-2 mb-0">
                      Sample preview: headline, skills, and experience sections completed with verified consistency.
                    </p>
                  </div>
                </div>

                {/* Audit Checklist Column */}
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-white rounded-3 border shadow-sm">
                    <span className="fw-bold small text-dark d-block mb-3">Optimization Action Items</span>
                    <ul className="list-unstyled mb-0 extra-small space-y-2">
                      <li className="d-flex align-items-center gap-2 text-success mb-2">
                        <FiCheckCircle /> <strong>Technical Headline:</strong> Clear primary role, seniority, and key languages present.
                      </li>
                      <li className="d-flex align-items-center gap-2 text-success mb-2">
                        <FiCheckCircle /> <strong>Skills Endorsements:</strong> 15+ verified developer skills categorized.
                      </li>
                      <li className="d-flex align-items-center gap-2 text-warning mb-2">
                        <FiAlertCircle /> <strong>About Summary:</strong> Add quantified engineering metrics (e.g. &quot;scaled API to 20k RPS&quot;).
                      </li>
                      <li className="d-flex align-items-center gap-2 text-primary">
                        <FiCheckCircle /> <strong>Resume Alignment:</strong> Job titles and employment dates match your DevBoard resume.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Pillars Grid */}
        <section className="feature-pillars-section" id="pillars" aria-labelledby="capabilities-heading">
          <div className="feature-section-header">
            <h2 id="capabilities-heading">Engineered for Technical Career Growth</h2>
            <p>Maximize inbound recruiter pipeline with targeted optimization tools.</p>
          </div>
          <div className="feature-grid-3">
            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap indigo">
                <FiTarget />
              </div>
              <h3>Profile Completeness Scorecard</h3>
              <p>
                Get a transparent, objective score of your profile&apos;s completeness and section coverage to build a well-rounded technical footprint.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap emerald">
                <FiCheckSquare />
              </div>
              <h3>Actionable Profile Checklist</h3>
              <p>
                Review a structured checklist covering headline clarity, about elevator pitch, skills taxonomy, and featured portfolio artifacts.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap amber">
                <FiTrendingUp />
              </div>
              <h3>Recruiter Keyword Optimization</h3>
              <p>
                Ensure essential engineering terms (e.g., CI/CD, microservices, cloud infrastructure, TypeScript) are strategically placed.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap purple">
                <FiFileText />
              </div>
              <h3>Resume vs. LinkedIn Cross-Check</h3>
              <p>
                Detect discrepancies between your submitted ATS resumes and your public LinkedIn profile before recruiters conduct background screens.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap sky">
                <FiUserCheck />
              </div>
              <h3>Career Narrative Suggestions</h3>
              <p>
                Get concrete suggestions on transforming passive job descriptions into measurable, result-oriented software engineering accomplishments.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap rose">
                <FiCheckCircle />
              </div>
              <h3>Privacy-Preserving Design</h3>
              <p>
                Your career analysis and notes remain strictly within your authenticated DevBoard dashboard. We never scrape or violate terms.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Steps Section */}
        <section className="feature-workflow-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="feature-section-header">
            <h2 id="workflow-heading">Four Steps to Higher Inbound Outreach</h2>
            <p>Transform your LinkedIn profile into a recruiter magnet.</p>
          </div>
          <div className="workflow-steps-grid">
            <div className="workflow-step-card">
              <div className="workflow-step-num">01</div>
              <h3>Audit Current Profile</h3>
              <p>Review your headline, about section, and experience against developer benchmarks.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">02</div>
              <h3>Check Resume Consistency</h3>
              <p>Run the automated comparison tool to ensure dates, titles, and skills match your resume.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">03</div>
              <h3>Incorporate Tech Keywords</h3>
              <p>Add high-demand framework and systems keywords where recruiters actively search.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">04</div>
              <h3>Receive Inbound Inquiries</h3>
              <p>Convert higher recruiter search impressions into scheduled phone screens and interviews.</p>
            </div>
          </div>
        </section>

        {/* Related Features Internal Linking */}
        <section className="related-features-section" aria-labelledby="related-heading">
          <div className="feature-section-header">
            <h2 id="related-heading">Connected Career Hub Tools</h2>
            <p>Unify your entire developer career ecosystem in one place.</p>
          </div>
          <div className="related-features-grid">
            <Link to="/features/ats-resume-builder" className="related-feature-card">
              <h4>ATS Resume Builder <FiArrowRight /></h4>
              <p>Build matching resumes that echo your optimized LinkedIn profile.</p>
            </Link>
            <Link to="/features/job-application-tracker" className="related-feature-card">
              <h4>Job Application Tracker <FiArrowRight /></h4>
              <p>Track inbound recruiter opportunities directly in your Kanban pipeline.</p>
            </Link>
            <Link to="/features/github-analytics" className="related-feature-card">
              <h4>GitHub Analytics <FiArrowRight /></h4>
              <p>Back up your LinkedIn claims with verified public repository statistics.</p>
            </Link>
            <Link to="/features/developer-portfolio" className="related-feature-card">
              <h4>Portfolio CMS <FiArrowRight /></h4>
              <p>Link your best projects directly in your LinkedIn featured section.</p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="feature-cta-banner">
          <div className="feature-cta-content">
            <h2>Optimize Your Tech Career Branding</h2>
            <p>Make sure recruiters find you for the engineering roles you actually want.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn btn-primary-minimal btn-xl">
                Start Optimizing Free <FiArrowRight className="ms-1" />
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
            <Link to="/blog">Career Guides</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

