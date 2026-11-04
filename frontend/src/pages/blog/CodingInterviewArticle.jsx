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
                <FiCalendar /> Published Nov 3, 2026 · Updated Nov 4, 2026
              </span>
              <span className="article-meta-item">
                <FiClock /> {article.readTime}
              </span>
            </div>
          </header>

          <div className="article-content">
            <p>
              Preparing for data structures and algorithms (DSA) interviews is often one of the most demanding phases of a software engineering job search. Many candidates adopt an ad-hoc approach: they attempt to solve hundreds of problems at random on LeetCode, only to find during live interviews that unfamiliar problem variations remain challenging.
            </p>
            <p>
              Rather than attempting to memorize hundreds of individual problems in isolation, many candidates and competitive programming educators recommend focusing on recurring algorithmic patterns. Curated community roadmaps—such as Yangshun Tay&apos;s{' '}
              <a
                href="https://www.techinterviewhandbook.org/best-practice-questions/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blind 75 list in the Tech Interview Handbook
              </a>{' '}
              and the{' '}
              <a
                href="https://neetcode.io/practice"
                target="_blank"
                rel="noopener noreferrer"
              >
                NeetCode 150 practice roadmap
              </a>{' '}
              —popularized this pattern-based approach. Practicing how to recognize and adapt structural patterns across different problem formulations helps build broader problem-solving versatility.
            </p>
            <p>
              Below is a structured study methodology designed to help organize algorithmic practice efficiently.
            </p>

            <div className="article-takeaway">
              <div className="article-takeaway-title">
                <FiCode className="text-primary" /> Key Takeaway
              </div>
              <p>
                Technical coding interviews emphasize pattern recognition, time-space complexity trade-offs, and communication. Grouping practice by data structures and setting reasonable study time boundaries helps maintain steady progress.
              </p>
            </div>

            <h2>1. Core Algorithmic Patterns (Community Curated Frameworks)</h2>
            <p>
              While different educational resources categorize coding interview questions into anywhere between 14 to 20+ archetypes, many frequently asked problems build on these familiar patterns:
            </p>
            <ul>
              <li><strong>Two Pointers:</strong> Often applied to sorted arrays, strings, and palindrome checks (e.g., Two Sum II, 3Sum, Container With Most Water).</li>
              <li><strong>Sliding Window:</strong> Useful for finding optimal contiguous subarrays or substrings (e.g., Longest Substring Without Repeating Characters, Minimum Window Substring).</li>
              <li><strong>Fast &amp; Slow Pointers (Floyd&apos;s Cycle Finding):</strong> Commonly used for cycle detection in linked lists and arrays.</li>
              <li><strong>Merge Intervals:</strong> Applied when intervals overlap and need consolidation (e.g., Merge Intervals, Non-overlapping Intervals).</li>
              <li><strong>Grid Breadth-First &amp; Depth-First Search:</strong> Useful for connected component counting and shortest path algorithms on matrices (e.g., Number of Islands, Rotting Oranges).</li>
              <li><strong>Monotonic Stack:</strong> Helpful for identifying next greater or smaller elements in linear time (e.g., Daily Temperatures, Next Greater Element).</li>
              <li><strong>Top &apos;K&apos; Elements (Heaps):</strong> Used for selecting extremes without full array sorting.</li>
              <li><strong>Dynamic Programming (1D &amp; 2D):</strong> Used when problems exhibit optimal substructure and overlapping subproblems (e.g., Coin Change, Longest Common Subsequence).</li>
            </ul>

            <h2>2. A Suggested Study Heuristic: Timeboxing Problem Attempts (20–30 Minutes)</h2>
            <p>
              A common pitfall during self-directed interview preparation is spending multiple hours struggling through a single problem without making progress. Many engineering mentors recommend setting a structured practice boundary—such as 20 to 30 minutes—as a study heuristic to sustain momentum:
            </p>
            <ol>
              <li><strong>Minutes 0–25 (Active Independent Attempt):</strong> Read the prompt carefully, clarify constraints and edge cases (empty inputs, negative values, duplicates), and draft a brute-force approach before attempting optimizations.</li>
              <li><strong>Minute 25 (Consulting Solutions When Blocked):</strong> If you do not have a working approach after 20–25 minutes, reviewing the official editorial, discussion tab, or a video walkthrough can provide timely conceptual guidance.</li>
              <li><strong>Minutes 25–40 (Concept Deconstruction):</strong> Rather than copying the code, trace <em>why</em> the specific data structure was chosen, perform a dry run of the logic on paper, and calculate time and space complexity independently.</li>
            </ol>
            <p className="extra-small text-muted fst-italic mt-1 mb-3">
              Note: The 20–25 minute boundary described above is a personal study heuristic to prevent burnout during practice, not an official rule used in live technical interviews.
            </p>

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

            <h2>5. Sample 8-Week Preparation Roadmap (Suggested Study Guide)</h2>
            <p className="extra-small text-muted fst-italic mb-2">
              Note: This sample schedule illustrates how candidates commonly pace their review; individual preparation timelines vary based on prior experience and target interview loops.
            </p>
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

