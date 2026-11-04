import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiUser,
  FiCommand,
  FiCode
} from 'react-icons/fi';
import SEO from '../../components/SEO';
import { getArticleStructuredData } from '../../utils/structuredData';
import { getArticleBySlug, getRelatedArticles } from './BlogData';
import './Blog.css';

export default function CodingInterviewArticle() {
  const article = getArticleBySlug('software-engineering-interview-preparation');
  const related = getRelatedArticles('software-engineering-interview-preparation');

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
          <Link to="/features/leetcode-tracker" className="blog-nav-link">LeetCode Stats</Link>
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
            Coding Interview Prep Guide
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
              Preparing for data structures and algorithms (DSA) interviews is one of the most demanding phases of a software engineering job search. Many candidates adopt a brute-force approach: they attempt to solve 400 or 500 problems at random on LeetCode, only to discover during real interviews that slight problem variations leave them completely stuck.
            </p>
            <p>
              Random problem grinding fails because it treats algorithms as isolated puzzles to memorize rather than structural patterns to recognize. Top-tier candidates who prepare efficiently rarely solve thousands of problems; instead, they master roughly <strong>15 foundational algorithmic archetypes</strong> and practice applying them across diverse problem domains.
            </p>
            <p>
              Here is a proven, systematic methodology for preparing for coding interviews without burning out.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiCode className="text-primary" /> Key Takeaway
              </div>
              <p>
                Algorithmic interviews test pattern recognition and communication, not memorization. Categorizing problems by underlying data structures and timeboxing practice sessions yields superior retention and confidence.
              </p>
            </div>

            <h2>1. The 15 Core Algorithmic Patterns You Actually Need</h2>
            <p>
              Virtually all standard interview questions asked at top tech companies are variations of a small set of recurring structural patterns:
            </p>
            <ul>
              <li><strong>Two Pointers:</strong> Used for sorted arrays and palindrome verification (e.g., Two Sum II, 3Sum, Container With Most Water).</li>
              <li><strong>Sliding Window:</strong> Used for sub-array or sub-string problems requiring contiguous elements (e.g., Longest Substring Without Repeating Characters, Minimum Window Substring).</li>
              <li><strong>Fast &amp; Slow Pointers (Floyd&apos;s Cycle):</strong> Used for cyclic graphs and linked list middle-node detection.</li>
              <li><strong>Merge Intervals:</strong> Used when intervals overlap and need consolidation (e.g., Merge Intervals, Non-overlapping Intervals).</li>
              <li><strong>Matrix Breadth-First / Depth-First Search:</strong> Used for connected component counting and shortest path on grids (e.g., Number of Islands, Rotting Oranges).</li>
              <li><strong>Monotonic Stack:</strong> Used for finding next greater or smaller elements in linear time (e.g., Daily Temperatures, Next Greater Element).</li>
              <li><strong>Top &apos;K&apos; Elements (Heaps):</strong> Used for finding the kth largest/smallest elements without sorting the entire collection.</li>
              <li><strong>Dynamic Programming (1D &amp; 2D):</strong> Used for optimal substructure and overlapping subproblems (e.g., Coin Change, Longest Common Subsequence).</li>
            </ul>

            <h2>2. The 25-Minute Timebox Rule</h2>
            <p>
              A major trap for self-taught developers is spending three hours spinning their wheels on a single hard problem. This produces frustration, wastes time, and destroys study momentum.
            </p>
            <p>Adopt a strict timebox workflow:</p>
            <ol>
              <li><strong>Minutes 0–25 (Active Independent Attempt):</strong> Read the prompt carefully, clarify edge cases (empty arrays, negative numbers, duplicates), and write out a brute-force approach. Try to identify which of the 15 core patterns applies.</li>
              <li><strong>Minute 25 (The Editorial Pivot):</strong> If you do not have a working O(n) or O(n log n) solution after 25 minutes, stop coding. Open the official editorial, discussion tab, or a trusted video walkthrough (such as NeetCode).</li>
              <li><strong>Minutes 25–40 (Deconstruction):</strong> Do not simply copy-paste the code. Study <em>why</em> the specific data structure was chosen, trace the logic through a dry run on paper, and write out the time and space complexity yourself.</li>
            </ol>

            <h2>3. Active Recall and the Two-Pass System</h2>
            <p>
              Reading a solution gives the illusion of understanding. If you don&apos;t practice active recall, the logic will vanish within 48 hours.
            </p>
            <ul>
              <li><strong>Pass 1 (Concept Acquisition):</strong> Solve problems grouped by pattern (e.g., do 6 Sliding Window questions back-to-back to internalize the template).</li>
              <li><strong>Pass 2 (Spaced Testing 7–14 Days Later):</strong> Revisit the same problems two weeks later in a blank editor without viewing your previous code or hints. If you can implement the solution cleanly from scratch, the pattern has successfully transitioned into your permanent working memory.</li>
            </ul>

            <h2>4. Simulating Real Technical Phone Screens</h2>
            <p>
              Solving a problem on LeetCode with instant test-suite feedback and autocomplete is very different from solving a problem in front of an engineer on a blank Google Doc or Coderpad.
            </p>
            <p>During the final weeks of interview preparation:</p>
            <ul>
              <li><strong>Turn Off Auto-Complete:</strong> Practice typing out standard library methods (e.g., <code>Map</code>, <code>Set</code>, priority queues) without compiler assistance.</li>
              <li><strong>Verbalize Your Thoughts Out Loud:</strong> Interviewers evaluate how you communicate trade-offs, not just whether you pass tests. Talk through your brute-force approach first, explain why its complexity is suboptimal, and propose your optimized approach before writing a single line of code.</li>
              <li><strong>Dry-Run Test Cases Manually:</strong> Before telling the interviewer you are done, step through your code line-by-line with a small test input and an edge case on your screen. Catching your own off-by-one errors demonstrates seniority.</li>
            </ul>

            {/* Contextual Feature Callout */}
            <div className="article-feature-callout">
              <div className="article-feature-callout-text">
                <h4>Track Your DSA Interview Milestones</h4>
                <p>DevBoard syncs your LeetCode problem difficulty counts and contest rankings in one dashboard.</p>
              </div>
              <Link to="/features/leetcode-tracker" className="btn btn-primary-minimal btn-sm">
                Explore LeetCode Tracker <FiArrowRight className="ms-1" />
              </Link>
            </div>

            <h2>5. 8-Week Systematic Preparation Roadmap</h2>
            <ul>
              <li><strong>Weeks 1–2:</strong> Arrays, Strings, Two Pointers, and Sliding Window (NeetCode 150 foundation).</li>
              <li><strong>Weeks 3–4:</strong> Linked Lists, Trees, and Graph Traversals (BFS/DFS, Topological Sort).</li>
              <li><strong>Weeks 5–6:</strong> Heaps, Monotonic Stacks, and Binary Search variations.</li>
              <li><strong>Week 7:</strong> Dynamic Programming patterns (Memoization and Tabulation).</li>
              <li><strong>Week 8:</strong> Full timed mocks on blank text editors with peer feedback.</li>
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
            <Link to="/features/leetcode-tracker">LeetCode Stats</Link>
            <Link to="/features/job-application-tracker">Job Tracker</Link>
            <Link to="/features/ats-resume-builder">ATS Resume</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
