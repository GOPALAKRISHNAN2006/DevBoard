import { Link } from 'react-router-dom';
import {
  FiFolder,
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiGithub,
  FiStar,
  FiGrid,
  FiCommand,
  FiFilter,
  FiCode,
  FiInfo
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getFeaturePageStructuredData } from '../../utils/structuredData';
import './FeaturePage.css';

export default function PortfolioFeature() {
  const pageTitle = "Developer Portfolio CMS & Project Showcase – DevBoard";
  const pageDescription = "Organize and showcase your software engineering projects, tech stack tags, live demo links, and GitHub repositories in a recruiter-ready portfolio CMS.";
  const canonicalUrl = "https://dev-board-mauve.vercel.app/features/developer-portfolio";

  const structuredData = getFeaturePageStructuredData({
    name: pageTitle,
    description: pageDescription,
    path: "/features/developer-portfolio",
    featureName: "Developer Portfolio CMS"
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
          <a href="#preview" className="feature-nav-link">Showcase View</a>
          <a href="#pillars" className="feature-nav-link">Capabilities</a>
          <a href="#workflow" className="feature-nav-link">Workflow</a>
          <Link to="/features/linkedin-optimizer" className="feature-nav-link">LinkedIn</Link>
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
            Developer Portfolio CMS
          </li>
        </ol>
      </nav>

      <main role="main">
        {/* Hero Section */}
        <header className="feature-hero" id="overview">
          <div className="feature-pill-badge">
            <FiFolder /> Feature Spotlight: Project Showcase
          </div>
          <h1 className="feature-hero-title">
            Developer Portfolio CMS &amp; <br />
            <span className="text-gradient">Engineering Project Showcase</span>
          </h1>
          <p className="feature-hero-subtitle">
            Curate and present your technical work with elegance. DevBoard gives engineers a dedicated project management hub with live demo links, repository badges, tech stack tagging, and featured project highlights.
          </p>
          <div className="feature-hero-actions">
            <Link to="/register" className="btn btn-primary-minimal btn-xl">
              Build Your Showcase Free <FiArrowRight className="ms-1" />
            </Link>
            <a href="#preview" className="btn btn-secondary-minimal btn-xl">
              View Showcase Layout
            </a>
          </div>
        </header>

        {/* Realistic Project Showcase Product Preview */}
        <section className="feature-preview-container" id="preview" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="visually-hidden">Developer Portfolio CMS Layout Preview</h2>
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
                  Project Catalog &amp; Technical Highlights
                </span>
              </div>
            </div>
            <div className="feature-preview-body bg-light">
              <div className="row g-3">
                {/* Project Card 1 */}
                <div className="col-12 col-md-6">
                  <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-warning-subtle text-dark border border-warning-subtle extra-small fw-bold">
                        <FiStar className="me-1 text-warning" /> Featured Project
                      </span>
                      <span className="badge bg-success-subtle text-success extra-small">Completed</span>
                    </div>
                    <h3 className="fs-6 fw-bold text-dark mb-1">DevBoard – Career Analytics Platform</h3>
                    <p className="extra-small text-muted mb-3">
                      Unified career hub with Vite 8, React 19, and Express 5. Real-time GitHub and LeetCode sync with ATS resume match analyzer.
                    </p>
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      <span className="badge bg-light text-dark border extra-small">React 19</span>
                      <span className="badge bg-light text-dark border extra-small">Node.js</span>
                      <span className="badge bg-light text-dark border extra-small">MongoDB</span>
                      <span className="badge bg-light text-dark border extra-small">Vite 8</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top extra-small text-muted">
                      <span className="d-inline-flex align-items-center gap-1 text-dark fw-semibold">
                        <FiGithub /> github.com/user/devboard
                      </span>
                      <span className="d-inline-flex align-items-center gap-1 text-primary fw-semibold">
                        <FiExternalLink /> Live Demo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Card 2 */}
                <div className="col-12 col-md-6">
                  <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle extra-small fw-bold">
                        Systems Engineering
                      </span>
                      <span className="badge bg-success-subtle text-success extra-small">Completed</span>
                    </div>
                    <h3 className="fs-6 fw-bold text-dark mb-1">HyperDB – Distributed Vector Index</h3>
                    <p className="extra-small text-muted mb-3">
                      High-throughput vector similarity search engine implemented in Go with sub-5ms p99 latency for LLM embedding retrieval.
                    </p>
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      <span className="badge bg-light text-dark border extra-small">Go</span>
                      <span className="badge bg-light text-dark border extra-small">gRPC</span>
                      <span className="badge bg-light text-dark border extra-small">Docker</span>
                      <span className="badge bg-light text-dark border extra-small">Raft</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top extra-small text-muted">
                      <span className="d-inline-flex align-items-center gap-1 text-dark fw-semibold">
                        <FiGithub /> github.com/user/hyper-db
                      </span>
                      <span className="d-inline-flex align-items-center gap-1 text-primary fw-semibold">
                        <FiExternalLink /> Docs Site
                      </span>
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
            <h2 id="capabilities-heading">Curated for Technical Hiring Managers</h2>
            <p>Give interviewers immediate, frictionless proof of your architectural capabilities.</p>
          </div>
          <div className="feature-grid-3">
            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap indigo">
                <FiGrid />
              </div>
              <h3>Dual Grid &amp; List Layouts</h3>
              <p>
                Toggle between visual card grids and compact tabular views to scan your personal repository archive with ease.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap emerald">
                <FiCode />
              </div>
              <h3>Granular Tech Stack Tags</h3>
              <p>
                Tag projects with specific languages, frameworks, cloud services, and databases (e.g., PostgreSQL, Redis, Kubernetes, React).
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap amber">
                <FiStar />
              </div>
              <h3>Featured Project Priority</h3>
              <p>
                Pin your top architectural triumphs to the top of your portfolio with prominent visual badges to guide recruiter attention.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap purple">
                <FiExternalLink />
              </div>
              <h3>Direct Deployment Links</h3>
              <p>
                Attach live production URLs and GitHub source repositories directly so evaluators can test running applications with one click.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap sky">
                <FiFilter />
              </div>
              <h3>Instant Search &amp; Status Filtering</h3>
              <p>
                Filter items dynamically across In Progress, Completed, and Planned statuses with responsive debounced search queries.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap rose">
                <FiCheckCircle />
              </div>
              <h3>Resume &amp; Profile Integration</h3>
              <p>
                Seamlessly transfer your top projects onto your ATS resume and LinkedIn profile without re-typing descriptions or URLs.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Steps Section */}
        <section className="feature-workflow-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="feature-section-header">
            <h2 id="workflow-heading">Organize Your Engineering Portfolio</h2>
            <p>From initial side project to polished showcase in four steps.</p>
          </div>
          <div className="workflow-steps-grid">
            <div className="workflow-step-card">
              <div className="workflow-step-num">01</div>
              <h3>Add Project Info</h3>
              <p>Input project title, technical description, repository URL, and live production deployment link.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">02</div>
              <h3>Assign Tech Stack</h3>
              <p>Specify the frontend, backend, database, and infrastructure technologies implemented.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">03</div>
              <h3>Pin Featured Work</h3>
              <p>Highlight your most complex and impactful applications for immediate visibility.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">04</div>
              <h3>Share With Recruiters</h3>
              <p>Link your portfolio in job applications, interview follow-ups, and resume header sections.</p>
            </div>
          </div>
        </section>

        {/* Related Features Internal Linking */}
        <section className="related-features-section" aria-labelledby="related-heading">
          <div className="feature-section-header">
            <h2 id="related-heading">Complementary Tools in DevBoard</h2>
            <p>A unified suite designed for modern software engineers.</p>
          </div>
          <div className="related-features-grid">
            <Link to="/features/ats-resume-builder" className="related-feature-card">
              <h4>ATS Resume Builder <FiArrowRight /></h4>
              <p>Export your top projects directly into an ATS-friendly developer resume.</p>
            </Link>
            <Link to="/features/github-analytics" className="related-feature-card">
              <h4>GitHub Analytics <FiArrowRight /></h4>
              <p>Showcase repository language distribution alongside your project catalog.</p>
            </Link>
            <Link to="/features/job-application-tracker" className="related-feature-card">
              <h4>Job Application Tracker <FiArrowRight /></h4>
              <p>Track which portfolio projects you submitted for specific open roles.</p>
            </Link>
            <Link to="/features/linkedin-optimizer" className="related-feature-card">
              <h4>LinkedIn Optimizer <FiArrowRight /></h4>
              <p>Feature project descriptions and live links on your professional profile.</p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="feature-cta-banner">
          <div className="feature-cta-content">
            <h2>Showcase What You Build</h2>
            <p>Present your software engineering projects with the precision and design they deserve.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn btn-primary-minimal btn-xl">
                Get Started Free <FiArrowRight className="ms-1" />
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

