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
                <FiCalendar /> Published Nov 3, 2026 · Updated Nov 4, 2026
              </span>
              <span className="article-meta-item">
                <FiClock /> {article.readTime}
              </span>
            </div>
          </header>

          <div className="article-content">
            <p>
              Every year, aspiring software engineers build personal portfolio websites featuring similar starter projects: a basic Todo app, an unauthenticated weather widget, or a static landing page clone followed step-by-step from a video.
            </p>
            <p>
              When technical hiring teams evaluate candidates, uncustomized tutorial clones provide limited insight into an engineer&apos;s independent problem-solving skills. They demonstrate that a candidate can follow along with a guide, but reveal little about how they design architectures, handle error states, or configure deployment workflows.
            </p>
            <p>
              In competitive hiring markets, a thoughtful portfolio can serve as a meaningful differentiator—especially for candidates seeking early-career roles without extensive commercial experience. Demonstrating a few functional, well-documented, and deployed applications often provides a distinct advantage when credentials are otherwise comparable.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiFolder className="text-primary" /> Key Takeaway
              </div>
              <p>
                Two or three production-ready, deployed full-stack applications with persistent storage, automated testing, and clear documentation provide significantly more signal than dozens of uncustomized tutorial clones.
              </p>
            </div>

            <h2>1. Practical Attributes Reviewers Often Value</h2>
            <p>
              Technical evaluators rarely have the bandwidth to clone a repository, configure local environment variables, run database migrations, and build containers just to determine whether a project functions.
            </p>
            <p>To make evaluating your work as seamless as possible, consider these practical attributes:</p>
            <ul>
              <li><strong>One-Click Live Deployment:</strong> A responsive, fast-loading production URL (hosted on platforms like Vercel, Render, Railway, or AWS). Without an easily accessible live link or recorded demo, reviewers are often reluctant to invest time manually setting up a local development environment.</li>
              <li><strong>Real Problem Solving:</strong> Projects that solve a specific problem—such as a developer utility, an automated workflow, or an internal dashboard—typically stand out more than generic consumer clones.</li>
              <li><strong>Architectural Context:</strong> Explain <em>why</em> specific design decisions were made: why a relational database was selected over a document store, how caching was implemented, or how asynchronous states are managed.</li>
            </ul>

            <h2>2. Moving Beyond Tutorial Clones: Suggested Project Archetypes</h2>
            <p>
              To showcase depth, consider building applications that mirror genuine commercial software development:
            </p>
            <ol>
              <li><strong>Developer Productivity Tools:</strong> Build an interactive application that integrates third-party APIs (e.g., GitHub, Slack, or public data feeds), incorporating secure user authentication and relational database persistence.</li>
              <li><strong>Systems &amp; CLI Utilities:</strong> Create a performant command-line utility in Go, Rust, or Node.js that parses data streams, interacts with local databases, or monitors network health.</li>
              <li><strong>Data Pipeline or Analytics Dashboards:</strong> Ingest open public datasets, process information with background tasks, and render responsive, filterable visual interfaces.</li>
            </ol>
            <p className="extra-small text-muted fst-italic mt-1 mb-3">
              Note: The project archetypes above are illustrative suggestions to help inspire original engineering ideas, rather than rigid requirements.
            </p>

            <h2>3. The 4-Part Project Case Study Structure (Suggested Framework)</h2>
            <p>
              When documenting a project on your portfolio, structuring your case study with these four sections helps reviewers evaluate your technical thought process:
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

