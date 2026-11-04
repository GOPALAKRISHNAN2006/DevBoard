import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiCommand,
  FiFileText
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getArticleStructuredData } from '../../utils/structuredData';
import { getArticleBySlug, getRelatedArticles } from './BlogData';
import './Blog.css';

export default function AtsResumeArticle() {
  const article = getArticleBySlug('ats-friendly-developer-resume');
  const related = getRelatedArticles('ats-friendly-developer-resume');

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
          <Link to="/features/ats-resume-builder" className="blog-nav-link">ATS Resume</Link>
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
            ATS Developer Resume Guide
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
              Among software developers seeking their next role, few topics generate as much frustration and misunderstanding as Applicant Tracking Systems (ATS). Common career myths suggest that mysterious AI algorithms instantly reject 90% of submissions for trivial typographical quirks.
            </p>
            <p>
              In reality, platforms such as Greenhouse, Lever, Workday, and iCIMS operate primarily as <strong>searchable document relational databases</strong>. When a corporate technical recruiter opens a req for a Senior React Engineer, they do not read 600 PDFs sequentially. Instead, they execute targeted database queries filtering by programming languages, frameworks, years of experience, and geographic location.
            </p>
            <p>
              If your resume cannot be parsed cleanly into structured database fields (name, contact email, job titles, dates, and skill tags), your candidacy never surfaces in recruiter search results. Here is the concrete, technical blueprint for ensuring your software engineering resume parses reliably every time.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiFileText className="text-primary" /> Key Takeaway
              </div>
              <p>
                An ATS is a search index, not a judge. Clean single-column linear text ensures your skills, work history, and project impact parse into recruiter search filters without formatting corruption.
              </p>
            </div>

            <h2>1. Structural Layout Rules That Guarantee Machine Readability</h2>
            <p>
              Parsing engines read documents strictly linearly: from left to right, top to bottom. Visually creative templates built in graphic design tools (such as Canva or Photoshop) typically rely on floating text boxes, multi-column CSS tables, and embedded raster shapes that turn into jumbled text when ingested by OCR parsers.
            </p>
            <ul>
              <li><strong>Strict Single-Column Flow:</strong> Avoid multi-column layouts, sidebars, or two-column contact blocks. Multi-column structures frequently cause parsers to merge unrelated text from parallel columns across lines.</li>
              <li><strong>Standard Section Headings:</strong> Use standard, recognizable headings: <code>Technical Skills</code>, <code>Work Experience</code>, <code>Projects</code>, and <code>Education</code>. Non-standard phrases like &quot;Where I&apos;ve Been&quot; or &quot;Core Competencies Matrix&quot; confuse parser categorization algorithms.</li>
              <li><strong>Text-Selectable Vector PDF:</strong> Always verify that text in your exported PDF can be highlighted, copied, and pasted into a plain text editor. Scanned images or canvas-rendered PDFs are completely unsearchable.</li>
              <li><strong>Omit Graphics and Skill Bars:</strong> Visual ratings (e.g., &quot;React: 4/5 stars&quot; or &quot;Python: 85%&quot;) provide zero parseable text data and waste valuable document space.</li>
            </ul>

            <h2>2. Writing High-Impact Engineering Bullets (The XYZ Formula)</h2>
            <p>
              Once your resume surfaces in a recruiter query, a human engineering lead evaluates your impact. The most common failure among developer resumes is listing passive day-to-day responsibilities rather than measurable business or architectural outcomes.
            </p>
            <p>
              Adopt Google&apos;s proven XYZ formula: <em>&quot;Accomplished [X], as measured by [Y], by doing [Z]&quot;</em>.
            </p>

            <div className="comparison-grid">
              <div className="comparison-box weak">
                <div className="comparison-box-title">
                  <FiXCircle /> Weak (Passive Responsibility)
                </div>
                <p>
                  &quot;Worked on backend microservices in Node.js and improved API performance for user authentication.&quot;
                </p>
              </div>
              <div className="comparison-box strong">
                <div className="comparison-box-title">
                  <FiCheckCircle /> Strong (Quantified Engineering Impact)
                </div>
                <p>
                  &quot;Refactored authentication microservices using Node.js and Redis caching, reducing p99 API latency by 42% across 1.8M daily active requests.&quot;
                </p>
              </div>
            </div>

            <p>
              Whenever possible, include metrics of scale: daily active users (DAU), transactions per second, database query execution reductions, test coverage gains, or build pipeline execution speedups.
            </p>

            <h2>3. Structuring Your Technical Skills Taxonomy</h2>
            <p>
              Do not drop a massive unstructured wall of 40 disjointed buzzwords. Group your skills logically into recognizable engineering categories so human screeners can assess your stack in 5 seconds:
            </p>
            <div className="article-code-block">
              <code>
{`Technical Skills:
• Languages: TypeScript, JavaScript (ES6+), Python, Go, SQL
• Frontend: React 19, Redux Toolkit, Next.js, HTML5/CSS3, Tailwind CSS
• Backend & APIs: Node.js, Express 5, RESTful APIs, GraphQL, gRPC
• Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, ECS), CI/CD`}
              </code>
            </div>

            <h2>4. Aligning With Target Job Specifications</h2>
            <p>
              Recruiters query their ATS for the exact spelling used in the job requisition. If a job description repeatedly emphasizes <code>TypeScript</code> and <code>Docker</code>, having those terms explicitly documented in your skills taxonomy and employment bullet points is essential for search relevance.
            </p>
            <p>
              However, never practice deceptive techniques such as hiding white-text keywords in headers or footers. Modern applicant tracking systems strip styling and display plain text views directly to human screeners, resulting in immediate rejection.
            </p>

            {/* Contextual Feature Callout */}
            <div className="article-feature-callout">
              <div className="article-feature-callout-text">
                <h4>Analyze Your Resume Against Job Specs</h4>
                <p>DevBoard includes an on-demand ATS resume builder and job description keyword match analyzer.</p>
              </div>
              <Link to="/features/ats-resume-builder" className="btn btn-primary-minimal btn-sm">
                Explore ATS Builder <FiArrowRight className="ms-1" />
              </Link>
            </div>

            <h2>5. ATS Resume Pre-Flight Checklist</h2>
            <p>Before submitting your resume for any technical role, review this verification checklist:</p>
            <ul>
              <li>[ ] Single-column, linear layout without tables, floating columns, or text boxes.</li>
              <li>[ ] File exported as text-selectable vector PDF named <code>Firstname-Lastname-Resume.pdf</code>.</li>
              <li>[ ] Standard contact links: LinkedIn, GitHub, and portfolio URL included at the top.</li>
              <li>[ ] Professional experience listed in reverse-chronological order with month/year dates.</li>
              <li>[ ] Every experience bullet includes an action verb, engineering context, and quantified outcome.</li>
              <li>[ ] Technical skills grouped logically into Languages, Frameworks, Databases, and Tools.</li>
              <li>[ ] Critical technologies from the target job posting genuinely represented in your text.</li>
              <li>[ ] Zero graphical progress bars, rating meters, or decorative icons.</li>
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
            <Link to="/features/ats-resume-builder">ATS Resume</Link>
            <Link to="/features/github-analytics">GitHub Sync</Link>
            <Link to="/features/job-application-tracker">Job Tracker</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
