import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiBookOpen,
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiCommand,
  FiLayers
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getBlogListingStructuredData } from '../../utils/structuredData';
import { BLOG_ARTICLES } from './BlogData';
import './Blog.css';

export default function BlogListing() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const pageTitle = "Developer Career Guides & Engineering Job Search Resources – DevBoard";
  const pageDescription = "Actionable, technical guides on ATS resume optimization, GitHub profile polish, coding interview preparation, developer portfolios, and job search pipelines.";
  const canonicalUrl = "https://dev-board-mauve.vercel.app/blog";

  const categories = ['All', 'Resume & ATS', 'GitHub & Code', 'Interview Prep', 'Portfolio & Projects', 'Career Pipeline'];

  const filteredArticles = selectedCategory === 'All'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter((a) => a.category === selectedCategory);

  const structuredData = getBlogListingStructuredData({
    title: pageTitle,
    description: pageDescription
  });

  return (
    <div className="blog-page">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        robots="index, follow"
        structuredData={structuredData}
      />

      {/* Top Navigation */}
      <nav className="blog-nav" aria-label="Resources navigation">
        <Link to="/" className="blog-nav-brand">
          <FiCommand className="text-primary" /> DevBoard
        </Link>
        <div className="blog-nav-links d-none d-md-flex">
          <Link to="/" className="blog-nav-link">Home</Link>
          <a href="/#features" className="blog-nav-link">Features</a>
          <Link to="/blog" className="blog-nav-link active">Resources</Link>
          <Link to="/features/ats-resume-builder" className="blog-nav-link">ATS Resume</Link>
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
          <li className="blog-breadcrumb-separator" aria-hidden="true">/</li>
          <li className="blog-breadcrumb-item active" aria-current="page">
            Resources
          </li>
        </ol>
      </nav>

      <main role="main">
        {/* Hub Header */}
        <header className="blog-hub-hero">
          <div className="blog-pill-badge">
            <FiBookOpen /> Technical Engineering Guides
          </div>
          <h1 className="blog-hub-title">
            Developer Career Hub &amp; <br />
            <span className="text-gradient">Engineering Job Search Resources</span>
          </h1>
          <p className="blog-hub-subtitle">
            Practical, in-depth guides crafted for software engineers, students, and technical candidates. Learn how automated screeners parse resumes, how to structure GitHub repositories, and how to practice algorithms systematically.
          </p>

          {/* Category Filter */}
          <div className="blog-category-bar" role="tablist" aria-label="Filter guides by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`blog-category-tag ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Articles Grid */}
        <section className="blog-grid" aria-label="Technical career guides">
          {filteredArticles.map((article) => (
            <Link key={article.slug} to={article.path} className="blog-card">
              <div className="blog-card-meta">
                <span className="blog-card-category">{article.category}</span>
                <span className="d-inline-flex align-items-center gap-1">
                  <FiClock size={12} /> {article.readTime}
                </span>
                <span className="d-inline-flex align-items-center gap-1">
                  <FiCalendar size={12} /> Nov 2026
                </span>
              </div>
              <h2 className="blog-card-title">{article.title}</h2>
              <p className="blog-card-excerpt">{article.excerpt}</p>
              <div className="blog-card-footer">
                <span>Read Full Guide</span>
                <FiArrowRight />
              </div>
            </Link>
          ))}
        </section>

        {/* Ecosystem Highlight */}
        <section className="container pb-5 mb-4 text-center">
          <div className="p-4 bg-white border rounded-3 max-w-800 mx-auto shadow-sm">
            <div className="d-inline-flex align-items-center gap-2 text-primary fw-bold small text-uppercase mb-2">
              <FiLayers /> Built into DevBoard
            </div>
            <h3 className="fs-5 fw-bold text-dark mb-2">
              Practice What You Read With Dedicated Developer Tools
            </h3>
            <p className="text-muted small mb-3">
              Explore our built-in suite of engineering career management tools designed to put these guides into practice.
            </p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <Link to="/features/ats-resume-builder" className="btn btn-secondary-minimal btn-sm">
                ATS Resume Builder
              </Link>
              <Link to="/features/github-analytics" className="btn btn-secondary-minimal btn-sm">
                GitHub Analytics
              </Link>
              <Link to="/features/leetcode-tracker" className="btn btn-secondary-minimal btn-sm">
                LeetCode Tracker
              </Link>
              <Link to="/features/developer-portfolio" className="btn btn-secondary-minimal btn-sm">
                Portfolio CMS
              </Link>
              <Link to="/features/job-application-tracker" className="btn btn-secondary-minimal btn-sm">
                Job Application Pipeline
              </Link>
            </div>
          </div>
        </section>
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
