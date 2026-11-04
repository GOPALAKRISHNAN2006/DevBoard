import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiUser,
  FiCommand,
  FiFolder
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getArticleStructuredData } from '../../utils/structuredData';
import { getArticleBySlug, getRelatedArticles } from './BlogData';
import './Blog.css';

export default function PortfolioGuideArticle() {
  const article = getArticleBySlug('developer-portfolio-guide');
  const related = getRelatedArticles('developer-portfolio-guide');

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
          <Link to="/features/developer-portfolio" className="blog-nav-link">Portfolio CMS</Link>
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
            Developer Portfolio Guide
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
              Every year, thousands of aspiring software engineers build personal portfolio websites featuring identical projects: a basic Todo app, an unauthenticated weather widget, or a Netflix landing page clone copied verbatim from a tutorial.
            </p>
            <p>
              When technical hiring managers review candidates, these cookie-cutter projects are an immediate red flag. They signal that a candidate can copy code from a video, but provide zero proof that they understand software architecture, error handling, state management, or deployment workflows.
            </p>
            <p>
              In competitive hiring markets, a portfolio acts as a critical <strong>tie-breaker</strong>—especially for junior developers who lack years of commercial experience. When an engineering manager compares two resumes with similar credentials, the candidate who has shipped 2 or 3 robust, deployed, well-documented applications almost always gets the interview call.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiFolder className="text-primary" /> Key Takeaway
              </div>
              <p>
                Two production-ready, fully deployed full-stack applications with real authentication, database persistence, and automated tests are worth twenty half-finished tutorial clones.
              </p>
            </div>

            <h2>1. What Engineering Leads Actually Want to See</h2>
            <p>
              Engineering managers do not have time to clone your GitHub repository, configure environment variables, run database migrations, and build your container locally just to see if your project works.
            </p>
            <p>If you want a hiring manager to evaluate your work, your projects must have:</p>
            <ul>
              <li><strong>One-Click Live Deployment:</strong> A working, fast-loading URL hosted on Vercel, Render, Railway, or AWS. If there is no live demo link, 90% of evaluators will simply close the tab.</li>
              <li><strong>Real Problem Solving:</strong> Projects that solve a specific problem—even a niche developer utility, internal dashboard, or automated workflow—stand out immediately over generic consumer clones.</li>
              <li><strong>System Architecture Context:</strong> Managers want to read <em>how</em> you solved technical hurdles: why you chose PostgreSQL over MongoDB, how you structured caching with Redis, or how you handled race conditions in async operations.</li>
            </ul>

            <h2>2. Moving Beyond Tutorial Clones: High-Impact Project Ideas</h2>
            <p>
              To make your portfolio unforgettable, build applications that reflect genuine commercial software engineering:
            </p>
            <ol>
              <li><strong>Full-Stack Developer Productivity Tools:</strong> Build an interactive dashboard that integrates third-party APIs (e.g., GitHub webhooks, Slack bots, or LeetCode metrics), featuring real user authentication, relational schemas, and responsive dashboards.</li>
              <li><strong>Distributed Systems / CLI Utilities:</strong> Create a high-performance command-line tool in Go or Rust that processes large CSV/JSON streams, interacts with SQLite, or benchmarks network latency.</li>
              <li><strong>Data Pipeline or Analytics Dashboards:</strong> Ingest real public datasets (e.g., public transit data, financial transactions, or weather records), process them through asynchronous background workers, and render interactive charts with filters.</li>
            </ol>

            <h2>3. The 4-Part Project Showcase Framework</h2>
            <p>
              When presenting a project on your portfolio or in a case study, format the description using this four-part structure:
            </p>
            <ul>
              <li><strong>The Problem:</strong> What operational or developer challenge does this application address? Who is the target user?</li>
              <li><strong>The Architecture &amp; Tech Stack:</strong> What languages, frameworks, databases, and third-party services power the system? (e.g., React 19, Node.js, Express, PostgreSQL, Docker, Vitest).</li>
              <li><strong>Technical Challenges &amp; Trade-offs:</strong> What engineering obstacles did you overcome? Mention concurrency handling, caching strategies, or state management decisions.</li>
              <li><strong>Live Production Links:</strong> Clear, prominent buttons linking to the running web application and the clean GitHub source repository.</li>
            </ul>

            {/* Contextual Feature Callout */}
            <div className="article-feature-callout">
              <div className="article-feature-callout-text">
                <h4>Organize Your Projects in DevBoard</h4>
                <p>Curate your engineering portfolio with tech stack tags, live demo links, and GitHub repository badges.</p>
              </div>
              <Link to="/features/developer-portfolio" className="btn btn-primary-minimal btn-sm">
                Explore Portfolio CMS <FiArrowRight className="ms-1" />
              </Link>
            </div>

            <h2>4. Production Readiness Checklist</h2>
            <p>Before pinning a project to your developer portfolio, ensure it meets these engineering standards:</p>
            <ul>
              <li>[ ] Application is deployed to a live URL with HTTPS enabled and zero broken routes.</li>
              <li>[ ] Mobile responsive layout verified across standard smartphone and tablet viewports.</li>
              <li>[ ] Authentication includes proper input validation, password hashing, and secure session/token management.</li>
              <li>[ ] Error boundaries prevent the application from crashing into a white screen when an API fails.</li>
              <li>[ ] Database interactions use parameterized queries or ORM models to prevent injection vulnerabilities.</li>
              <li>[ ] Repository README includes screenshots, tech stack overview, and local setup commands.</li>
              <li>[ ] Zero hardcoded secrets, test API keys, or build artifacts committed to the repository.</li>
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
            <Link to="/features/developer-portfolio">Portfolio CMS</Link>
            <Link to="/features/github-analytics">GitHub Sync</Link>
            <Link to="/features/ats-resume-builder">ATS Resume</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
