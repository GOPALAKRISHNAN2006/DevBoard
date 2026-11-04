import { Link } from 'react-router-dom';
import {
  FiFileText,
  FiArrowRight,
  FiCheckCircle,
  FiDownload,
  FiTarget,
  FiLayers,
  FiSearch,
  FiCommand,
  FiCpu,
  FiAlertCircle,
  FiInfo
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getFeaturePageStructuredData } from '../../utils/structuredData';
import './FeaturePage.css';

export default function ResumeBuilderFeature() {
  const pageTitle = "ATS Resume Builder & Job Match Analyzer for Developers – DevBoard";
  const pageDescription = "Build clean, ATS-compliant developer resumes and analyze keyword alignment against job descriptions with on-demand match scoring and PDF export.";
  const canonicalUrl = "https://dev-board-mauve.vercel.app/features/ats-resume-builder";

  const structuredData = getFeaturePageStructuredData({
    name: pageTitle,
    description: pageDescription,
    path: "/features/ats-resume-builder",
    featureName: "ATS Resume Builder & Job Match Analyzer"
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
          <a href="#preview" className="feature-nav-link">Match Analyzer</a>
          <a href="#pillars" className="feature-nav-link">Key Capabilities</a>
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
            ATS Resume Builder &amp; Job Match Analyzer
          </li>
        </ol>
      </nav>

      <main role="main">
        {/* Hero Section */}
        <header className="feature-hero" id="overview">
          <div className="feature-pill-badge">
            <FiFileText /> Feature Spotlight: Career Documents
          </div>
          <h1 className="feature-hero-title">
            ATS Resume Builder &amp; <br />
            <span className="text-gradient">Targeted Job Match Analyzer</span>
          </h1>
          <p className="feature-hero-subtitle">
            Format your engineering experience into a scannable, applicant-tracking-system-friendly layout. Test your resume against target job requirements, spot missing keywords, and export high-resolution PDFs.
          </p>
          <div className="feature-hero-actions">
            <Link to="/register" className="btn btn-primary-minimal btn-xl">
              Build Your Resume Free <FiArrowRight className="ms-1" />
            </Link>
            <a href="#preview" className="btn btn-secondary-minimal btn-xl">
              See Match Analyzer
            </a>
          </div>
        </header>

        {/* Realistic Match Analyzer Product Preview */}
        <section className="feature-preview-container" id="preview" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="visually-hidden">ATS Job Match Analyzer Preview</h2>
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
                  ATS Compatibility &amp; Keyword Match Engine
                </span>
              </div>
            </div>
            <div className="feature-preview-body bg-light">
              <div className="row g-4 align-items-center">
                {/* Score & Gauge Column */}
                <div className="col-12 col-md-5">
                  <div className="p-4 bg-white rounded-3 border shadow-sm text-center">
                    <span className="text-muted extra-small text-uppercase fw-bold letter-spacing-wide">
                      Sample Job Match Alignment (Demo)
                    </span>
                    <div className="display-4 fw-bold text-success my-2">
                      88<span className="fs-4 text-muted">%</span>
                    </div>
                    <div className="progress mb-3" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: '88%' }}
                        aria-valuenow="88"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="extra-small text-muted mb-0">
                      Illustrative analysis: 14 sample technical keywords matched out of 16 in the target job spec.
                    </p>
                  </div>
                </div>

                {/* Keyword Analysis Breakdown */}
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-white rounded-3 border shadow-sm">
                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-1 extra-small fw-bold text-success mb-2">
                        <FiCheckCircle /> Matched Keywords (14)
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {['React 19', 'TypeScript', 'Node.js', 'REST API', 'PostgreSQL', 'Docker', 'CI/CD', 'Git', 'Agile', 'Unit Testing'].map((skill) => (
                          <span key={skill} className="badge bg-success-subtle text-success border border-success-subtle extra-small">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="d-flex align-items-center gap-1 extra-small fw-bold text-warning mb-2">
                        <FiAlertCircle /> Missing / Recommended Keywords (2)
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {['Kubernetes', 'GraphQL'].map((missing) => (
                          <span key={missing} className="badge bg-warning-subtle text-dark border border-warning-subtle extra-small">
                            + {missing}
                          </span>
                        ))}
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
            <h2 id="capabilities-heading">Built to Pass Automated Screeners</h2>
            <p>Every element is structured to parse cleanly through Workday, Greenhouse, Lever, and Taleo.</p>
          </div>
          <div className="feature-grid-3">
            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap indigo">
                <FiTarget />
              </div>
              <h3>Automated Job Match Scoring</h3>
              <p>
                Paste any job description to instantly compare your resume's vocabulary with the exact required technologies, credentials, and years of experience.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap emerald">
                <FiLayers />
              </div>
              <h3>Structured Section Architecture</h3>
              <p>
                Dedicated fields for summary, work history, projects, education, technical certifications, and skill categories prevent parsing corruption.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap amber">
                <FiSearch />
              </div>
              <h3>Missing Keyword Gap Detection</h3>
              <p>
                Identify high-frequency terms present in the employer's posting that are absent from your resume before you click submit.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap purple">
                <FiDownload />
              </div>
              <h3>ATS-Compliant PDF Export</h3>
              <p>
                Generate clean, machine-readable PDFs formatted with single-column linear text, standard typography, and clean headings for optimal OCR ingestion.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap sky">
                <FiCpu />
              </div>
              <h3>On-Demand Module Loading</h3>
              <p>
                PDF generation libraries are dynamically loaded only when you request an export, keeping your app load instant and lightweight.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap rose">
                <FiCheckCircle />
              </div>
              <h3>Private &amp; Secure Storage</h3>
              <p>
                Your resume data, career history, and job match searches belong exclusively to you and are never shared or indexed publicly.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Steps Section */}
        <section className="feature-workflow-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="feature-section-header">
            <h2 id="workflow-heading">Four Steps to a Targeted Application</h2>
            <p>Tailor your resume for specific engineering roles in minutes.</p>
          </div>
          <div className="workflow-steps-grid">
            <div className="workflow-step-card">
              <div className="workflow-step-num">01</div>
              <h3>Enter Experience</h3>
              <p>Populate structured sections with your employment history, measurable engineering impact, and tech stacks.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">02</div>
              <h3>Paste Job Spec</h3>
              <p>Copy the job requirements and tech stack from any posting to analyze alignment against your resume.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">03</div>
              <h3>Bridge Skill Gaps</h3>
              <p>Review the automated keyword gap breakdown and weave in genuine relevant competencies you possess.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">04</div>
              <h3>Export Clean PDF</h3>
              <p>Download a pristine, ATS-verified PDF ready to upload directly into any recruitment portal.</p>
            </div>
          </div>
        </section>

        {/* Related Features Internal Linking */}
        <section className="related-features-section" aria-labelledby="related-heading">
          <div className="feature-section-header">
            <h2 id="related-heading">Complementary Developer Career Tools</h2>
            <p>Combine targeted resumes with pipeline management and verified coding credentials.</p>
          </div>
          <div className="related-features-grid">
            <Link to="/features/job-application-tracker" className="related-feature-card">
              <h4>Job Application Tracker <FiArrowRight /></h4>
              <p>Track your applications across custom Kanban stages and monitor interview rounds.</p>
            </Link>
            <Link to="/features/github-analytics" className="related-feature-card">
              <h4>GitHub Analytics <FiArrowRight /></h4>
              <p>Verify your language experience and open-source contributions directly from GitHub.</p>
            </Link>
            <Link to="/features/leetcode-tracker" className="related-feature-card">
              <h4>LeetCode Tracker <FiArrowRight /></h4>
              <p>Demonstrate algorithmic problem solving and interview readiness across difficulty levels.</p>
            </Link>
            <Link to="/features/linkedin-optimizer" className="related-feature-card">
              <h4>LinkedIn Optimizer <FiArrowRight /></h4>
              <p>Align your professional social profile with the keywords on your targeted tech resume.</p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="feature-cta-banner">
          <div className="feature-cta-content">
            <h2>Land More Developer Interviews</h2>
            <p>Stop sending generic resumes. Build targeted, ATS-optimized developer resumes with DevBoard.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn btn-primary-minimal btn-xl">
                Create Free Resume <FiArrowRight className="ms-1" />
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

