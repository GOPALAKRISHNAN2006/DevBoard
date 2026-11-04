import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiUser,
  FiCommand,
  FiGithub
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getArticleStructuredData } from '../../utils/structuredData';
import { getArticleBySlug, getRelatedArticles } from './BlogData';
import './Blog.css';

export default function GithubProfileArticle() {
  const article = getArticleBySlug('improve-github-profile');
  const related = getRelatedArticles('improve-github-profile');

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
          <Link to="/features/github-analytics" className="blog-nav-link">GitHub Sync</Link>
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
            GitHub Profile Guide
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
                <FiCalendar /> Published Nov 2, 2026 · Updated Nov 4, 2026
              </span>
              <span className="article-meta-item">
                <FiClock /> {article.readTime}
              </span>
            </div>
          </header>

          <div className="article-content">
            <p>
              For entry-level software developers, bootcamp graduates, and computer science students, GitHub is often considered a critical portfolio showcase. Yet many candidates operate under a fundamental misconception: they assume technical interviewers spend hours analyzing every historical commit and pull request.
            </p>
            <p>
              In reality, technical screeners and hiring managers often review candidate profiles quickly during initial evaluations. Rather than digging into thousands of lines of raw code, they typically look for clear indicators of <strong>engineering discipline, clear documentation, and evidence of building functional software</strong> beyond introductory coursework.
            </p>
            <p>
              A profile cluttered with dozens of unmaintained tutorial repositories can obscure your strongest work. Conversely, a focused GitHub profile featuring a few well-documented, deployed projects provides immediate clarity. Here is a practical guide to auditing and organizing your GitHub presence.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiGithub className="text-primary" /> Key Takeaway
              </div>
              <p>
                Many engineering teams value documentation, live deployments, and version control hygiene over raw commit volume. A few polished repositories with clear READMEs provide much stronger signal than dozens of uncustomized clones.
              </p>
            </div>

            <h2>1. Curating Your Pinned Repositories</h2>
            <p>
              By default, GitHub displays repositories ordered by most recent activity. This means a quick sandbox test or incomplete scratch repo pushed recently can displace your best work on your public profile.
            </p>
            <p>
              Use GitHub&apos;s <strong>Pin</strong> feature as a suggested curation tool to highlight relevant work:
            </p>
            <ul>
              <li><strong>Highlight 3 to 5 Selected Projects:</strong> Filling your pinned slots with 3 to 5 functional, well-documented repositories provides a clear snapshot of your capabilities without overwhelming the reviewer.</li>
              <li><strong>Prioritize Relevant Stack Depth:</strong> Pin repositories that reflect the technologies you are targeting (e.g., a React application with state management, an authenticated API service, or a containerized utility).</li>
              <li><strong>Add Informative Descriptions:</strong> Include a concise one-sentence description and relevant topic tags (e.g., <code>typescript</code>, <code>rest-api</code>, <code>docker</code>, <code>vitest</code>) to summarize the project at a glance.</li>
            </ul>

            <h2>2. Addressing Introductory Tutorial Projects</h2>
            <p>
              A frequent observation shared across developer hiring discussions is the proliferation of identical beginner tutorial clones (such as basic counter apps or uncustomized weather widgets). While these exercises are valuable learning milestones, presenting them as signature portfolio pieces provides little distinction.
            </p>
            <p>
              When auditing your public repositories, consider two practical options:
            </p>
            <ol>
              <li><strong>Archive or Make Private:</strong> If an exercise was purely for initial syntax practice and does not reflect independent architectural decisions, archiving it keeps your public profile focused on original work.</li>
              <li><strong>Extend With Original Functionality:</strong> If you want to showcase the project, expand upon the tutorial foundation. Add proper authentication, implement database persistence, write unit and integration tests, containerize the setup, and deploy it to a live hosting environment.</li>
            </ol>

            <h2>3. Structuring Informative Repository READMEs</h2>
            <p>
              When a technical interviewer clicks into one of your pinned projects, the <code>README.md</code> is the first document they evaluate. If the README is blank or contains only default Create React App boilerplate, reviewers almost never inspect the source code.
            </p>
            <p>Recommended components of a comprehensive repository README include:</p>
            <ul>
              <li><strong>Live Production URL:</strong> Prominently placed at the top of the README. Reviewers frequently appreciate a quick live link or demo recording to verify functionality without cloning the project locally.</li>
              <li><strong>Problem Statement &amp; Architecture:</strong> A concise explanation of the problem solved and the high-level architecture.</li>
              <li><strong>Architecture Diagram or Visual Demo:</strong> A screenshot or short walkthrough illustrating core user flows.</li>
              <li><strong>Tech Stack Overview:</strong> A clear summary of the frontend framework, runtime, database, authentication provider, and hosting environment.</li>
              <li><strong>Local Setup &amp; Test Instructions:</strong> Reproducible terminal commands to clone, configure environment variables (using a sample <code>.env.example</code>), and execute automated tests.</li>
            </ul>

            <h2>4. Git Hygiene &amp; Commit Discipline</h2>
            <p>
              The commit history of your pinned projects communicates how you will collaborate on an engineering team. Common hygiene mistakes include:
            </p>
            <ul>
              <li><strong>Accidental Secret Commits:</strong> Committing <code>node_modules</code>, <code>.DS_Store</code>, or private API keys. Always maintain a comprehensive <code>.gitignore</code> file.</li>
              <li><strong>Single-Commit Dumps:</strong> Pushing an entire 10,000-line application in a single commit titled &quot;Initial commit&quot; or &quot;Upload files&quot;. Reviewers want to see incremental, logical feature progression.</li>
              <li>
                <strong>Structured Commit Messages:</strong> Following a standard format such as the{' '}
                <a
                  href="https://www.conventionalcommits.org/en/v1.0.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conventional Commits specification
                </a>{' '}
                (e.g., <code>feat: implement JWT token refresh flow</code> or <code>fix: resolve race condition in database connection pool</code>) signals software maturity and makes commit histories readable for collaborators.
              </li>
            </ul>

            {/* Contextual Feature Callout */}
            <div className="article-feature-callout">
              <div className="article-feature-callout-text">
                <h4>Audit Your GitHub Developer Presence</h4>
                <p>DevBoard syncs your public repositories to audit language breakdowns and profile completeness.</p>
              </div>
              <Link to="/features/github-analytics" className="btn btn-primary-minimal btn-sm">
                Explore GitHub Analytics <FiArrowRight className="ms-1" />
              </Link>
            </div>

            <h2>5. Junior Developer GitHub Audit Checklist</h2>
            <p>Run through this checklist to ensure your GitHub profile presents a clean, hiring-ready image:</p>
            <ul>
              <li>[ ] Professional username and clear avatar configured.</li>
              <li>[ ] Concise bio with target engineering role, core languages, and portfolio link.</li>
              <li>[ ] Pinned 3 to 4 standout repositories with descriptive titles and topic tags.</li>
              <li>[ ] Zero uncustomized tutorial clones or abandoned 1-commit repos in pinned items.</li>
              <li>[ ] Every pinned repository contains a live deployment link right at the top.</li>
              <li>[ ] Every pinned repository includes a comprehensive README with setup commands.</li>
              <li>[ ] Clean <code>.gitignore</code> prevents build folders or secrets from entering git history.</li>
              <li>[ ] Commit history demonstrates incremental, descriptive commit messages.</li>
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
            <Link to="/features/github-analytics">GitHub Sync</Link>
            <Link to="/features/developer-portfolio">Portfolio</Link>
            <Link to="/features/job-application-tracker">Job Tracker</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

