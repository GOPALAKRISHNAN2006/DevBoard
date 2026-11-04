import { Link } from 'react-router-dom';
import {
  FiGithub,
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiStar,
  FiGitBranch,
  FiActivity,
  FiCheckSquare,
  FiCommand,
  FiPieChart,
  FiShield
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getFeaturePageStructuredData } from '../../utils/structuredData';
import './FeaturePage.css';

export default function GithubAnalyticsFeature() {
  const pageTitle = "GitHub Developer Analytics & Profile Intelligence Hub – DevBoard";
  const pageDescription = "Analyze your GitHub public activity, repository languages, profile strength checklist, and cross-reference your resume skills against real code.";
  const canonicalUrl = "https://dev-board-mauve.vercel.app/features/github-analytics";

  const structuredData = getFeaturePageStructuredData({
    name: pageTitle,
    description: pageDescription,
    path: "/features/github-analytics",
    featureName: "GitHub Developer Analytics"
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
          <a href="#preview" className="feature-nav-link">Metrics Preview</a>
          <a href="#pillars" className="feature-nav-link">Capabilities</a>
          <a href="#workflow" className="feature-nav-link">Workflow</a>
          <Link to="/features/leetcode-tracker" className="feature-nav-link">LeetCode</Link>
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

      <main role="main">
        {/* Hero Section */}
        <header className="feature-hero" id="overview">
          <div className="feature-pill-badge">
            <FiGithub /> Feature Spotlight: Open Source Presence
          </div>
          <h1 className="feature-hero-title">
            GitHub Developer Analytics &amp; <br />
            <span className="text-gradient">Profile Strength Intelligence</span>
          </h1>
          <p className="feature-hero-subtitle">
            Turn raw GitHub activity into meaningful career metrics. Inspect repository language breakdowns, audit your profile readiness, and cross-verify that the skills on your resume match your actual code.
          </p>
          <div className="feature-hero-actions">
            <Link to="/register" className="btn btn-primary-minimal btn-xl">
              Connect Your GitHub Free <FiArrowRight className="ms-1" />
            </Link>
            <a href="#preview" className="btn btn-secondary-minimal btn-xl">
              View Analytics Demo
            </a>
          </div>
        </header>

        {/* Realistic GitHub Metrics Product Preview */}
        <section className="feature-preview-container" id="preview" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="visually-hidden">GitHub Analytics Dashboard Preview</h2>
          <div className="feature-preview-card">
            <div className="feature-preview-header">
              <div className="preview-dots">
                <span className="preview-dot red"></span>
                <span className="preview-dot yellow"></span>
                <span className="preview-dot green"></span>
              </div>
              <span className="badge bg-primary-subtle text-primary border extra-small fw-bold">
                GitHub Intelligence &amp; Skill Verification
              </span>
            </div>
            <div className="feature-preview-body bg-light">
              {/* Stat Counters Bar */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-white rounded-3 border shadow-sm text-center">
                    <div className="text-muted extra-small text-uppercase fw-bold">Repositories</div>
                    <div className="fs-3 fw-bold text-dark mt-1">34</div>
                    <span className="badge bg-success-subtle text-success extra-small mt-1">28 Public</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-white rounded-3 border shadow-sm text-center">
                    <div className="text-muted extra-small text-uppercase fw-bold">Total Stars</div>
                    <div className="fs-3 fw-bold text-dark mt-1">182</div>
                    <span className="badge bg-warning-subtle text-dark extra-small mt-1"><FiStar /> Top 15%</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-white rounded-3 border shadow-sm text-center">
                    <div className="text-muted extra-small text-uppercase fw-bold">Forks Received</div>
                    <div className="fs-3 fw-bold text-dark mt-1">47</div>
                    <span className="badge bg-primary-subtle text-primary extra-small mt-1"><FiGitBranch /> Active</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-white rounded-3 border shadow-sm text-center">
                    <div className="text-muted extra-small text-uppercase fw-bold">Profile Strength</div>
                    <div className="fs-3 fw-bold text-success mt-1">94%</div>
                    <span className="badge bg-success-subtle text-success extra-small mt-1">Recruiter Ready</span>
                  </div>
                </div>
              </div>

              {/* Language Distribution & Verification */}
              <div className="row g-3">
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold small text-dark">Top Languages Across Repositories</span>
                      <span className="extra-small text-muted">Aggregated from GitHub API</span>
                    </div>
                    <div className="space-y-2">
                      <div className="mb-2">
                        <div className="d-flex justify-content-between extra-small fw-semibold mb-1">
                          <span>TypeScript</span>
                          <span>52.4%</span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div className="progress-bar bg-primary" style={{ width: '52.4%' }}></div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="d-flex justify-content-between extra-small fw-semibold mb-1">
                          <span>JavaScript / Node.js</span>
                          <span>24.8%</span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div className="progress-bar bg-warning" style={{ width: '24.8%' }}></div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="d-flex justify-content-between extra-small fw-semibold mb-1">
                          <span>Python</span>
                          <span>14.2%</span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div className="progress-bar bg-info" style={{ width: '14.2%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex justify-content-between extra-small fw-semibold mb-1">
                          <span>Go &amp; Rust</span>
                          <span>8.6%</span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div className="progress-bar bg-success" style={{ width: '8.6%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-5">
                  <div className="p-3 bg-white rounded-3 border shadow-sm h-100">
                    <span className="fw-bold small text-dark d-block mb-3">Profile Optimization Checklist</span>
                    <ul className="list-unstyled mb-0 extra-small space-y-2">
                      <li className="d-flex align-items-center gap-2 text-success mb-2">
                        <FiCheckCircle /> <span>Custom Profile README active</span>
                      </li>
                      <li className="d-flex align-items-center gap-2 text-success mb-2">
                        <FiCheckCircle /> <span>Bio &amp; social links completed</span>
                      </li>
                      <li className="d-flex align-items-center gap-2 text-success mb-2">
                        <FiCheckCircle /> <span>Pinned showcase repositories (6/6)</span>
                      </li>
                      <li className="d-flex align-items-center gap-2 text-primary">
                        <FiCheckCircle /> <span>Resume skills verified by public commits</span>
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
            <h2 id="capabilities-heading">Comprehensive Developer Presence Metrics</h2>
            <p>Empower your job hunt with verified public open-source signals.</p>
          </div>
          <div className="feature-grid-3">
            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap indigo">
                <FiPieChart />
              </div>
              <h3>Aggregated Language Breakdown</h3>
              <p>
                Analyze exact byte counts and percentages across all your public repositories to establish undeniable proof of your dominant tech stack.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap emerald">
                <FiCheckSquare />
              </div>
              <h3>Profile Strength Scorecard</h3>
              <p>
                Audit your GitHub profile against recruiter expectations: bio clarity, pinned repositories, avatar quality, website link, and profile README.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap amber">
                <FiStar />
              </div>
              <h3>Repository Social Proof</h3>
              <p>
                Aggregate stargazers, forks, and watchers across your portfolio so interviewers immediately recognize your impactful projects.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap purple">
                <FiCode />
              </div>
              <h3>Resume vs. Code Cross-Check</h3>
              <p>
                Compare the programming languages listed on your CV with your genuine GitHub codebase distribution to prevent skill mismatches.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap sky">
                <FiActivity />
              </div>
              <h3>Career &amp; Commitment Insights</h3>
              <p>
                Track consistency, contribution history, and open-source engagement to communicate dedication to engineering teams.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-wrap rose">
                <FiShield />
              </div>
              <h3>Read-Only Public Access</h3>
              <p>
                DevBoard queries public GitHub REST APIs without asking for write permissions or private codebase access. Your code stays private.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Steps Section */}
        <section className="feature-workflow-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="feature-section-header">
            <h2 id="workflow-heading">How to Showcase Your GitHub Presence</h2>
            <p>From username input to verifiable career credentials in four steps.</p>
          </div>
          <div className="workflow-steps-grid">
            <div className="workflow-step-card">
              <div className="workflow-step-num">01</div>
              <h3>Link Your Handle</h3>
              <p>Enter your public GitHub username in your DevBoard dashboard with zero OAuth friction.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">02</div>
              <h3>Aggregate Repositories</h3>
              <p>DevBoard syncs your public repositories, star tallies, fork counts, and primary code languages.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">03</div>
              <h3>Review Optimization Tips</h3>
              <p>Complete the profile checklist to make your GitHub account attractive to technical screeners.</p>
            </div>
            <div className="workflow-step-card">
              <div className="workflow-step-num">04</div>
              <h3>Sync With Portfolio</h3>
              <p>Feature your top repositories and verified languages directly on your public portfolio page.</p>
            </div>
          </div>
        </section>

        {/* Related Features Internal Linking */}
        <section className="related-features-section" aria-labelledby="related-heading">
          <div className="feature-section-header">
            <h2 id="related-heading">Connected DevBoard Ecosystem</h2>
            <p>Combine open-source analytics with interview preparation and portfolio curation.</p>
          </div>
          <div className="related-features-grid">
            <Link to="/features/leetcode-tracker" className="related-feature-card">
              <h4>LeetCode Tracker <FiArrowRight /></h4>
              <p>Pair open-source contributions with algorithmic problem-solving benchmarks.</p>
            </Link>
            <Link to="/features/developer-portfolio" className="related-feature-card">
              <h4>Portfolio CMS <FiArrowRight /></h4>
              <p>Showcase deployed live demos alongside your repository source code.</p>
            </Link>
            <Link to="/features/ats-resume-builder" className="related-feature-card">
              <h4>ATS Resume Builder <FiArrowRight /></h4>
              <p>Build a tailored developer resume backed by your verified GitHub languages.</p>
            </Link>
            <Link to="/features/job-application-tracker" className="related-feature-card">
              <h4>Job Application Tracker <FiArrowRight /></h4>
              <p>Organize interviews and take-home challenges in a focused Kanban pipeline.</p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="feature-cta-banner">
          <div className="feature-cta-content">
            <h2>Put Your Real Code Front and Center</h2>
            <p>Elevate your engineering profile with verifiable GitHub analytics on DevBoard.</p>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
