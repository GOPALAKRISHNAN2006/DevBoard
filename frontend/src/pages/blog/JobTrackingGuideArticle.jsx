import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiUser,
  FiCommand,
  FiBriefcase
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getArticleStructuredData } from '../../utils/structuredData';
import { getArticleBySlug, getRelatedArticles } from './BlogData';
import './Blog.css';

export default function JobTrackingGuideArticle() {
  const article = getArticleBySlug('job-application-tracking-guide');
  const related = getRelatedArticles('job-application-tracking-guide');

  const structuredData = getArticleStructuredData({
    title: article.title,
    description: article.description,
    path: article.path,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    category: article.category
  });

  return (
    <div className="blog-page">
      <SEO
        title={`${article.title} – DevBoard`}
        description={article.description}
        canonical={`https://dev-board-mauve.vercel.app${article.path}`}
        robots="index, follow"
        structuredData={structuredData}
      />

      {/* Top Navigation */}
      <nav className="blog-nav" aria-label="Article navigation">
        <Link to="/" className="blog-nav-brand">
          <FiCommand className="text-primary" /> DevBoard
        </Link>
        <div className="blog-nav-links d-none d-md-flex">
          <Link to="/" className="blog-nav-link">Home</Link>
          <a href="/#features" className="blog-nav-link">Features</a>
          <Link to="/blog" className="blog-nav-link active">Resources</Link>
          <Link to="/features/job-application-tracker" className="blog-nav-link">Job Tracker</Link>
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
      <nav className="blog-breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="blog-breadcrumb-list">
          <li className="blog-breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="feature-breadcrumb-separator" aria-hidden="true">/</li>
          <li className="blog-breadcrumb-item">
            <Link to="/blog">Resources</Link>
          </li>
          <li className="feature-breadcrumb-separator" aria-hidden="true">/</li>
          <li className="blog-breadcrumb-item active" aria-current="page">
            Job Search Pipeline Guide
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <main role="main" className="article-container">
        <article>
          <header className="article-header">
            <span className="article-category-badge">{article.category}</span>
            <h1 className="article-h1">{article.title}</h1>
            <div className="article-meta-bar">
              <span className="article-meta-item">
                <FiUser /> {article.author}
              </span>
              <span className="article-meta-item">
                <FiCalendar /> November 4, 2026
              </span>
              <span className="article-meta-item">
                <FiClock /> {article.readTime}
              </span>
            </div>
          </header>

          <div className="article-content">
            <p>
              In modern technical hiring, a software engineering job search is rarely a simple two-step process. Between initial recruiter screenings, asynchronous HackerRank assessments, technical phone screens, take-home system design challenges, and multi-round behavioral on-sites, an engineer actively interviewing may juggle a dozen opportunities simultaneously.
            </p>
            <p>
              Most developers default to a standard spreadsheet. While a spreadsheet works well for the first five submissions, it rapidly degrades into chaos once multiple rounds and concurrent take-home challenges overlap. You forget which resume version was sent to which company, scramble to locate interviewer names thirty seconds before a Zoom screen, and struggle to track compensation notes across competing offers.
            </p>
            <p>
              Adopting a visual, developer-focused pipeline workflow eliminates cognitive overload and keeps your interview preparation organized. Here is how to structure your software engineering job pipeline.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiBriefcase className="text-primary" /> Key Takeaway
              </div>
              <p>
                A structured visual Kanban workflow organizes active recruiter threads, preserves technical interview notes, and enables side-by-side offer evaluation without context switching.
              </p>
            </div>

            <h2>1. Why Spreadsheets Break Down During an Active Search</h2>
            <p>
              Spreadsheets are static tables designed for accountants, not dynamic engineering search workflows. The primary friction points developers experience include:
            </p>
            <ul>
              <li><strong>Zero Visual Stage Awareness:</strong> Scrolling across 40 rows of dense spreadsheet cells makes it difficult to see how many opportunities are currently in active technical rounds versus initial submissions.</li>
              <li><strong>Lost Interview Notes:</strong> Notes crammed into a tiny spreadsheet cell are difficult to format and retrieve during a high-stakes phone interview.</li>
              <li><strong>Disorganized Compensation Data:</strong> Tracking base salaries, equity grants, annual bonuses, and hybrid work requirements in plain text leads to fragmented records when negotiation time arrives.</li>
            </ul>

            <h2>2. The 5-Stage Technical Pipeline Architecture</h2>
            <p>
              A Kanban pipeline models your job hunt as a continuous flow of opportunities across five unambiguous states:
            </p>
            <ol>
              <li><strong>Applied:</strong> Roles where you have submitted an application or recruiter reach-out, but have not yet received an assessment invitation. Document the applied date and the job role details.</li>
              <li><strong>Assessment:</strong> Opportunities requiring a technical take-home assignment, HackerRank, or LeetCode automated screen. Keep submission requirements and problem notes attached to the card.</li>
              <li><strong>Interview:</strong> Roles with active live rounds scheduled: recruiter screens, technical phone screens, live coding sessions, and on-site loops.</li>
              <li><strong>Offer:</strong> Roles where a written or verbal offer has been extended. Document confirmed base salary, equity vesting schedules, and decision deadlines.</li>
              <li><strong>Rejected / Archived:</strong> Roles that ended in rejection or withdrawal. Keeping these records helps analyze pass-through rates and prevent redundant re-applications.</li>
            </ol>

            <h2>3. Critical Data Points to Track for Every Engineering Role</h2>
            <p>
              To maintain total control over your pipeline, record these attributes on each opportunity:
            </p>
            <ul>
              <li><strong>Company &amp; Specific Team:</strong> Document the exact company and engineering team (e.g., &quot;Stripe – Billing Infrastructure&quot; or &quot;Datadog – Distributed Tracing&quot;).</li>
              <li><strong>Location &amp; Work Model:</strong> Remote, Hybrid (with required in-office days), or On-site.</li>
              <li><strong>Target Compensation:</strong> The salary range disclosed during the initial recruiter call.</li>
              <li><strong>Private Interview Notes:</strong> Interviewer names, technical questions asked, system design topics covered, and behavioral themes emphasized.</li>
            </ul>

            <h2>4. Handling Technical Take-Home Challenges</h2>
            <p>
              Take-home coding challenges require careful project management. When an assessment arrives:
            </p>
            <ul>
              <li>Create a clean, dedicated GitHub repository with a private visibility setting.</li>
              <li>Review the evaluation rubric: do they prioritize clean unit tests, API performance, or UI polish?</li>
              <li>Include comprehensive setup instructions and Docker containerization so evaluators can run your submission without configuration headaches.</li>
              <li>Attach the assignment prompt and submission confirmation directly to your pipeline card.</li>
            </ul>

            {/* Contextual Feature Callout */}
            <div className="article-feature-callout">
              <div className="article-feature-callout-text">
                <h4>Manage Your Job Search in DevBoard</h4>
                <p>Track engineering applications with interactive Kanban columns, salary notes, and fast filtering.</p>
              </div>
              <Link to="/features/job-application-tracker" className="btn btn-primary-minimal btn-sm">
                Explore Job Tracker <FiArrowRight className="ms-1" />
              </Link>
            </div>

            <h2>5. Side-by-Side Offer Evaluation</h2>
            <p>
              When multiple offers arrive, comparing total compensation requires looking beyond the base salary headline:
            </p>
            <ul>
              <li><strong>Total Compensation (TC):</strong> Base Salary + Guaranteed Bonus + Annual Equity Grant (RSUs or options).</li>
              <li><strong>Equity Structure:</strong> For public companies, evaluate RSU vesting schedules (e.g., 4-year with 1-year cliff vs. monthly vesting). For startups, calculate ownership percentage and strike price.</li>
              <li><strong>Tech Stack &amp; Growth Potential:</strong> Will you work with modern languages and scalable distributed architectures, or will you maintain legacy systems?</li>
            </ul>
          </div>

          {/* Related Articles */}
          <section className="related-articles-section">
            <h3 className="related-articles-title">Related Technical Guides</h3>
            <div className="related-articles-grid">
              {related.map((rel) => (
                <Link key={rel.slug} to={rel.path} className="related-article-card">
                  <h5>{rel.title}</h5>
                  <p>{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <div>
            <strong>DevBoard</strong> — Unified Developer Career Hub &amp; Portfolio Analytics
          </div>
          <div className="blog-footer-links">
            <Link to="/">Home</Link>
            <Link to="/blog">Resources</Link>
            <Link to="/features/job-application-tracker">Job Tracker</Link>
            <Link to="/features/ats-resume-builder">ATS Resume</Link>
            <Link to="/features/leetcode-tracker">LeetCode Stats</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
