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
                <FiCalendar /> November 4, 2026
              </span>
              <span className="article-meta-item">
                <FiClock /> {article.readTime}
              </span>
            </div>
          </header>

          <div className="article-content">
            <p>
              For entry-level software developers, bootcamp graduates, and computer science students, GitHub is often considered a critical portfolio showcase. Yet many candidates operate under a fundamental misconception: they assume technical interviewers spend an hour analyzing every commit and pull request.
            </p>
            <p>
              In reality, hiring managers review GitHub profiles in thirty seconds or less. They look for immediate signals of <strong>professional hygiene, communication clarity through documentation, and evidence that you can build and ship software</strong> beyond class homework.
            </p>
            <p>
              A chaotic profile littered with dozens of unmaintained tutorial repositories actually damages your candidacy. Conversely, a clean, intentional GitHub profile featuring 3 to 4 well-documented, deployed projects establishes immediate credibility. Here is how to audit and optimize your GitHub account for technical hiring teams.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiGithub className="text-primary" /> Key Takeaway
              </div>
              <p>
                Engineering leaders prioritize documentation, live deployments, and version control discipline over raw commit counts. Four polished repositories with comprehensive READMEs beat forty abandoned clones.
              </p>
            </div>

            <h2>1. Curating Your Pinned Repositories</h2>
            <p>
              By default, GitHub displays repositories ordered by most recent activity. This means a messy school lab or a quick weekend test repo you pushed yesterday can occupy prime real estate on your public profile.
            </p>
            <p>
              Use GitHub&apos;s <strong>Pin</strong> feature to deliberately control what evaluators see first:
            </p>
            <ul>
              <li><strong>Select Your Best 3 to 5 Projects:</strong> Never leave all 6 pin slots filled with low-effort work. Three solid repositories look significantly more focused than six repositories where half are broken.</li>
              <li><strong>Prioritize Full-Stack and Systems Depth:</strong> Pin repositories that reflect the exact stack you are applying for (e.g., a React + Go API service, an authenticated PostgreSQL application, or a distributed CLI tool).</li>
              <li><strong>Add Short Repository Descriptions:</strong> Ensure each pinned repository has a clear, one-sentence description and relevant topic tags (e.g., <code>typescript</code>, <code>rest-api</code>, <code>docker</code>, <code>vitest</code>).</li>
            </ul>

            <h2>2. Eliminating the &quot;Tutorial Graveyard&quot;</h2>
            <p>
              One of the most common red flags hiring managers report on developer forums is the &quot;tutorial graveyard&quot;: profiles featuring standard clones copied line-for-line from Udemy or YouTube courses (e.g., a basic Todo app, simple calculator, or weather widget).
            </p>
            <p>
              If your profile currently contains generic tutorial projects, take one of two actions:
            </p>
            <ol>
              <li><strong>Make Them Private:</strong> If the project was purely an educational exercise and does not represent original engineering, archive or make the repository private.</li>
              <li><strong>Extend Them With Real Complexity:</strong> If you want to keep the foundation, make it genuinely yours. Add robust JWT authentication, migrate the database to PostgreSQL, write end-to-end integration tests in Playwright, containerize the application with Docker, and deploy it to a live production URL.</li>
            </ol>

            <h2>3. Writing Repository READMEs That Engineers Respect</h2>
            <p>
              When a technical interviewer clicks into one of your pinned projects, the <code>README.md</code> is the first document they evaluate. If the README is blank or contains only default Create React App boilerplate, reviewers almost never inspect the source code.
            </p>
            <p>A professional repository README must include:</p>
            <ul>
              <li><strong>Live Production URL:</strong> Prominently placed at the top of the README. Hiring managers rarely have time to clone a repository and install local dependencies to see if your app works.</li>
              <li><strong>Problem Statement &amp; Architecture:</strong> A concise 2-sentence explanation of what problem the application solves and how data flows through the system.</li>
              <li><strong>Architecture Diagram or Visual Demo:</strong> A high-resolution screenshot or short animated GIF showing the core user workflow.</li>
              <li><strong>Complete Tech Stack Breakdown:</strong> Clear bullet points detailing the frontend framework, backend runtime, database, authentication provider, and deployment host.</li>
              <li><strong>Local Setup &amp; Test Instructions:</strong> Concrete shell commands detailing how to clone, configure environment variables (providing a clean <code>.env.example</code>), and execute automated test suites.</li>
            </ul>

            <h2>4. Git Hygiene &amp; Commit Discipline</h2>
            <p>
              The commit history of your pinned projects communicates how you will collaborate on an engineering team. Common hygiene mistakes include:
            </p>
            <ul>
              <li><strong>Accidental Secret Commits:</strong> Committing <code>node_modules</code>, <code>.DS_Store</code>, or private API keys. Always maintain a comprehensive <code>.gitignore</code> file.</li>
              <li><strong>Single-Commit Dumps:</strong> Pushing an entire 10,000-line application in a single commit titled &quot;Initial commit&quot; or &quot;Upload files&quot;. Reviewers want to see incremental, logical feature progression.</li>
              <li><strong>Structured Commit Messages:</strong> Practice Conventional Commits (e.g., <code>feat: implement JWT token refresh flow</code> or <code>fix: resolve race condition in database connection pool</code>). It signals software maturity.</li>
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
