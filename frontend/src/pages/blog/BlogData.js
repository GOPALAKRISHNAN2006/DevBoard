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
    description: 'Learn how applicant tracking systems parse developer resumes. Single-column layouts, keyword alignment, the XYZ impact formula, and common parsing traps.',
    category: 'Resume & ATS',
    readTime: '8 min read',
    datePublished: '2026-11-01T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Applicant tracking systems treat resumes as searchable text databases. Discover how to format engineering experience, avoid parsing corruption, and write quantified bullet points.',
    relatedSlugs: ['developer-portfolio-guide', 'job-application-tracking-guide', 'improve-github-profile']
  },
  {
    slug: 'improve-github-profile',
    path: '/blog/improve-github-profile',
    title: 'How to Optimize Your GitHub Profile for Engineering Jobs (Checklist & Guide)',
    description: 'Transform your GitHub into a recruiter-ready technical asset. Profile README structure, repo pinning, README documentation best practices, and git hygiene.',
    category: 'GitHub & Code',
    readTime: '7 min read',
    datePublished: '2026-11-02T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Hiring managers spend seconds glancing at GitHub accounts. Learn how to pin high-impact repositories, write clear setup documentation, and eliminate tutorial clutter.',
    relatedSlugs: ['developer-portfolio-guide', 'ats-friendly-developer-resume', 'software-engineering-interview-preparation']
  },
  {
    slug: 'software-engineering-interview-preparation',
    path: '/blog/software-engineering-interview-preparation',
    title: 'How to Prepare for Coding Interviews: A Pattern-Based LeetCode Strategy',
    description: 'Stop grinding hundreds of random LeetCode problems. Master core algorithmic patterns, the 25-minute timebox rule, and spaced repetition for tech interviews.',
    category: 'Interview Prep',
    readTime: '9 min read',
    datePublished: '2026-11-03T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Random problem grinding leads to burnout and poor retention. Focus on 15 core structural patterns, timebox your attempts, and practice verbalizing trade-offs.',
    relatedSlugs: ['job-application-tracking-guide', 'improve-github-profile', 'developer-portfolio-guide']
  },
  {
    slug: 'developer-portfolio-guide',
    path: '/blog/developer-portfolio-guide',
    title: 'Building a Developer Portfolio Hiring Managers Actually Review (No Tutorial Clones)',
    description: 'What engineering leads actually look for in portfolio projects: live deployment links, architecture notes, real problem solving, and tech stack clarity.',
    category: 'Portfolio & Projects',
    readTime: '8 min read',
    datePublished: '2026-11-03T00:00:00Z',
    dateModified: '2026-11-04T00:00:00Z',
    author: 'Gopalakrishnan M',
    excerpt: 'Generic todo apps and calculator clones get ignored. Discover how to design 2-3 production-grade, deployed full-stack projects that prove architectural competence.',
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
    excerpt: 'Multi-tab spreadsheets fail when managing active recruiter threads. Learn how to structure your search into distinct Kanban stages, document compensation, and track notes.',
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
