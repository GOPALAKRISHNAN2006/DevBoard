/**
 * BlogData.js
 * Central registry of DevBoard technical career articles.
 * Used by BlogListing, individual article pages, and prerender scripts.
 */

export const BLOG_ARTICLES = [
  {
    slug: 'ats-friendly-developer-resume',
    path: '/blog/ats-friendly-developer-resume',
    title: 'How to Build an ATS-Friendly Software Engineer Resume (With Examples)',
    description: 'Learn how applicant tracking systems parse developer resumes. Understand layout recommendations for broad compatibility, keyword alignment, and the XYZ impact framework.',
    category: 'Resume & ATS',
    readTime: '8 min read',
    datePublished: '2026-11-01T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Understand how applicant tracking systems parse and index developer resumes. Learn layout recommendations for broad parser compatibility, keyword alignment, and quantifiable bullet points.',
    relatedSlugs: ['developer-portfolio-guide', 'job-application-tracking-guide', 'improve-github-profile']
  },
  {
    slug: 'improve-github-profile',
    path: '/blog/improve-github-profile',
    title: 'How to Optimize Your GitHub Profile for Engineering Jobs (Checklist & Guide)',
    description: 'Transform your GitHub into a recruiter-ready technical asset. Profile README structure, repo pinning heuristics, README documentation best practices, and git hygiene.',
    category: 'GitHub & Code',
    readTime: '7 min read',
    datePublished: '2026-11-02T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Technical screeners look for clear signals of engineering discipline. Learn how to pin high-impact repositories, write clear setup documentation, and curate original work.',
    relatedSlugs: ['developer-portfolio-guide', 'ats-friendly-developer-resume', 'software-engineering-interview-preparation']
  },
  {
    slug: 'software-engineering-interview-preparation',
    path: '/blog/software-engineering-interview-preparation',
    title: 'How to Prepare for Coding Interviews: A Pattern-Based LeetCode Strategy',
    description: 'A structured approach to coding interview preparation. Master recurring algorithmic patterns, study timeboxing heuristics, and spaced repetition for tech interviews.',
    category: 'Interview Prep',
    readTime: '9 min read',
    datePublished: '2026-11-03T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Random problem memorization leads to burnout. Focus on recurring structural patterns, timebox study attempts with practical heuristics, and practice verbalizing trade-offs.',
    relatedSlugs: ['job-application-tracking-guide', 'improve-github-profile', 'developer-portfolio-guide']
  },
  {
    slug: 'developer-portfolio-guide',
    path: '/blog/developer-portfolio-guide',
    title: 'Building a Developer Portfolio Hiring Managers Actually Review (No Tutorial Clones)',
    description: 'Practical guidance on portfolio projects: live deployment links, architecture notes, real problem solving, and a 4-part case study documentation framework.',
    category: 'Portfolio & Projects',
    readTime: '8 min read',
    datePublished: '2026-11-03T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Move beyond generic tutorial clones. Discover how to build and document 2 to 3 production-grade, deployed full-stack projects that demonstrate architectural competence.',
    relatedSlugs: ['improve-github-profile', 'ats-friendly-developer-resume', 'job-application-tracking-guide']
  },
  {
    slug: 'job-application-tracking-guide',
    path: '/blog/job-application-tracking-guide',
    title: 'How to Track Software Engineering Job Applications Without Spreadsheets',
    description: 'Organize your tech job search pipeline. Manage multi-stage interview rounds, salary expectations, take-home challenges, and status notes with a Kanban workflow.',
    category: 'Career Pipeline',
    readTime: '6 min read',
    datePublished: '2026-11-04T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Manage multiple concurrent recruiter threads without spreadsheet clutter. Learn how to structure your search into a 5-stage Kanban pipeline, document compensation, and track notes.',
    relatedSlugs: ['ats-friendly-developer-resume', 'software-engineering-interview-preparation', 'developer-portfolio-guide']
  }
];

export function getArticleBySlug(slug) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug) {
  const current = getArticleBySlug(slug);
  if (!current || !current.relatedSlugs) return [];
  return current.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter(Boolean);
}

