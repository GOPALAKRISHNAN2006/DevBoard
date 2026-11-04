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
                <FiCalendar /> Published Nov 1, 2026 · Updated Nov 4, 2026
              </span>
              <span className="article-meta-item">
                <FiClock /> {article.readTime}
              </span>
            </div>
          </header>

          <div className="article-content">
            <p>
              Among software developers seeking their next role, few topics generate as much frustration and misunderstanding as Applicant Tracking Systems (ATS). Common career myths suggest that mysterious AI algorithms instantly reject the vast majority of submissions for trivial typographical quirks.
            </p>
            <p>
              In reality, ATS platforms—such as Greenhouse, Lever, Workday, and iCIMS—differ substantially in their underlying architecture and workflows. Some serve primarily as workflow management systems with relational candidate databases, others integrate text-parsing and indexing engines, and many present candidate resumes directly to recruiters for manual review. When recruiters manage high applicant volumes, they often rely on keyword filtering, structured questionnaire answers, and candidate tags to prioritize reviews.
            </p>
            <p>
              Different systems handle document ingestion differently: some extract text into structured database fields (contact info, work history, skill lists), while others display the formatted document alongside extracted search terms. Because parser accuracy varies across systems, adopting clean document structures maximizes the likelihood that your credentials parse cleanly into recruiter search filters.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiFileText className="text-primary" /> Key Takeaway
              </div>
              <p>
                An ATS is primarily a recruiting workflow tool, not a single monolithic ranking engine. Using clean, readable linear text and standard headings helps ensure your skills and experience are accurately indexed across diverse parsing engines.
              </p>
            </div>

            <h2>1. Layout Recommendations for Broad Parser Compatibility</h2>
            <p>
              Document parsers extract text by analyzing structural document streams. While modern enterprise parsers continue to improve, complex visual templates built in graphic design software often introduce nested layout tables, floating text boxes, or unusual bounding boxes that can cause text from separate columns to become jumbled when parsed.
            </p>
            <ul>
              <li><strong>Recommended Single-Column Layout:</strong> A clean, single-column linear layout is a practical industry recommendation rather than an absolute software mandate. It provides broad compatibility across diverse parsers by ensuring text flows sequentially.</li>
              <li><strong>Standard Section Headings:</strong> Use clear, standard headings such as <code>Technical Skills</code>, <code>Work Experience</code>, <code>Projects</code>, and <code>Education</code>. Unconventional phrases (e.g., &quot;Where I&apos;ve Been&quot;) risk being miscategorized by automated taxonomy parsers.</li>
              <li><strong>Text Selectability &amp; Document Formats:</strong> Ensuring that text in your exported PDF or DOCX file can be highlighted and copied in plain text generally makes document content easier for text-extraction and parsing systems to process. In contrast, scanned documents and flattened graphics can create extraction difficulties, often requiring OCR that introduces character transcription errors. While text-based PDFs and DOCX files are common practical formats, compatibility depends on the specific ATS and its parser version. Importantly, submitting a document with selectable text does not guarantee correct parsing, accurate field extraction, or successful advancement in the hiring process.</li>
              <li><strong>Omit Arbitrary Graphic Meters:</strong> Graphical progress bars (e.g., &quot;React: 4/5 stars&quot; or &quot;Python: 85%&quot;) provide no meaningful text for search indexing and take up space better spent on concrete technical accomplishments.</li>
            </ul>

            <h2>2. Writing High-Impact Engineering Bullets (The XYZ Framework)</h2>
            <p>
              Once your resume passes initial screening, engineering hiring managers evaluate your practical contributions. A widely recommended approach for writing impactful technical bullets is the XYZ framework popularized by former Google Senior Vice President of People Operations Laszlo Bock and referenced in{' '}
              <a
                href="https://careers.google.com/how-we-hire/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Careers hiring guidance
              </a>
              : <em>&quot;Accomplished [X], as measured by [Y], by doing [Z]&quot;</em>.
            </p>

            <div className="comparison-grid">
              <div className="comparison-box weak">
                <div className="comparison-box-title">
                  <FiXCircle /> Passive Phrasing (Low Signal)
                </div>
                <p>
                  &quot;Worked on backend microservices in Node.js and improved API performance for user authentication.&quot;
                </p>
              </div>
              <div className="comparison-box strong">
                <div className="comparison-box-title">
                  <FiCheckCircle /> Quantified Impact (Illustrative Example)
                </div>
                <p>
                  &quot;Refactored authentication microservices using Node.js and Redis caching, reducing p99 API latency by 42% across 1.8M daily active requests.&quot;
                </p>
              </div>
            </div>

            <p className="extra-small text-muted fst-italic mt-2 mb-3">
              Note: The metrics and figures shown in the strong bullet example above are illustrative sample demonstrations to illustrate phrasing structure, not verified benchmarks from a real developer or DevBoard user.
            </p>

            <p>
              Where authentic data is available, incorporating concrete scale metrics—such as request volume, execution time reductions, query optimization, or test coverage gains—helps convey the engineering scope of your work.
            </p>

            <h2>3. Structuring Your Technical Skills Taxonomy</h2>
            <p>
              Avoid an unstructured wall of 40 disjointed keywords. Grouping your skills into logical engineering categories enables human reviewers to quickly scan your stack and assess role alignment:
            </p>
            <div className="article-code-block">
              <code>
{`Technical Skills (Sample Taxonomy):
• Languages: TypeScript, JavaScript (ES6+), Python, Go, SQL
• Frontend: React 19, Redux Toolkit, Next.js, HTML5/CSS3, Tailwind CSS
• Backend & APIs: Node.js, Express 5, RESTful APIs, GraphQL, gRPC
• Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, ECS), CI/CD`}
              </code>
            </div>
            <p className="extra-small text-muted fst-italic mt-1 mb-3">
              Note: The taxonomy above is an illustrative formatting template demonstrating category grouping.
            </p>

            <h2>4. Aligning With Target Job Specifications</h2>
            <p>
              Recruiters frequently query candidate repositories or ATS filters for the key technologies stated in the job requisition. If a role emphasizes <code>TypeScript</code> and <code>Docker</code>, ensuring those competencies are accurately documented in your skills section and project descriptions improves search visibility.
            </p>
            <p>
              However, avoid artificial tactics such as hidden white-text keywords or repetitive keyword repetition. Modern ATS parsers strip styling and present normalized text views directly to human reviewers, making deceptive keyword stuffing immediately apparent.
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

            <h2>5. ATS Resume Pre-Flight Verification Checklist</h2>
            <p>Before submitting your resume, review this practical verification checklist:</p>
            <ul>
              <li>[ ] Clean linear, single-column layout recommended for broad parser compatibility.</li>
              <li>[ ] Text is cleanly selectable in PDF or DOCX format to facilitate extraction (avoiding flattened scans).</li>
              <li>[ ] Clear contact links: email, phone, LinkedIn, GitHub, and portfolio URL at top.</li>
              <li>[ ] Work experience listed in reverse-chronological order with month and year dates.</li>
              <li>[ ] Experience bullets highlight engineering context, actions taken, and measurable results.</li>
              <li>[ ] Technical skills grouped logically into Languages, Frameworks, Databases, and Tools.</li>
              <li>[ ] Relevant technologies from the target job posting genuinely represented in your text.</li>
              <li>[ ] Avoided decorative rating bars, embedded tables, and hidden keyword text.</li>
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

