/**
 * structuredData.js
 * Schema.org JSON-LD structured data generators for DevBoard.
 * Reference: https://schema.org
 */

const PRODUCTION_DOMAIN = "https://dev-board-mauve.vercel.app";

/**
 * Generates the unified Schema.org graph for the DevBoard homepage.
 * Combines WebSite, Organization, SoftwareApplication, and FAQPage.
 */
export function getHomepageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebSite Schema
      {
        "@type": "WebSite",
        "@id": `${PRODUCTION_DOMAIN}/#website`,
        "url": `${PRODUCTION_DOMAIN}/`,
        "name": "DevBoard",
        "description": "Unified developer career hub and portfolio analytics platform for software engineers.",
        "publisher": {
          "@id": `${PRODUCTION_DOMAIN}/#organization`,
        },
        "inLanguage": "en-US",
      },

      // 2. Organization Schema
      {
        "@type": "Organization",
        "@id": `${PRODUCTION_DOMAIN}/#organization`,
        "name": "DevBoard",
        "url": `${PRODUCTION_DOMAIN}/`,
        "logo": {
          "@type": "ImageObject",
          "url": `${PRODUCTION_DOMAIN}/favicon.svg`,
        },
        "description": "Developer career workspace and portfolio analytics platform.",
        "founder": {
          "@type": "Person",
          "name": "Gopalakrishnan M",
          "url": "https://github.com/GOPALAKRISHNAN2006",
        },
        "sameAs": [
          "https://github.com/GOPALAKRISHNAN2006",
        ],
      },

      // 3. SoftwareApplication Schema
      {
        "@type": "SoftwareApplication",
        "@id": `${PRODUCTION_DOMAIN}/#software`,
        "name": "DevBoard",
        "url": `${PRODUCTION_DOMAIN}/`,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any (Web Browser)",
        "browserRequirements": "Requires modern web browser with JavaScript enabled (Chrome, Firefox, Safari, Edge)",
        "description": "Unified developer career hub and portfolio analytics platform for managing job applications, ATS resumes, GitHub metrics, LeetCode progress, and project portfolios.",
        "featureList": [
          "Kanban Job Application Pipeline Tracker",
          "Interactive ATS Resume Builder with Job Match Analyzer",
          "GitHub Repository Analytics and Language Breakdown",
          "LeetCode Problem Solving Statistics and Difficulty Tracking",
          "Developer Portfolio Project Showcase CMS",
          "LinkedIn Profile Optimizer and Strength Evaluator",
          "Developer Scratchpad and Interview Notes",
        ],
        "author": {
          "@type": "Person",
          "name": "Gopalakrishnan M",
          "url": "https://github.com/GOPALAKRISHNAN2006",
        },
      },

      // 4. FAQPage Schema (matches exact visible text on homepage)
      {
        "@type": "FAQPage",
        "@id": `${PRODUCTION_DOMAIN}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does GitHub and LeetCode syncing work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Once you connect your public usernames inside your Profile Settings, our background services fetch your public profile repository metadata and coding stats directly from official APIs to keep your metrics fresh.",
            },
          },
          {
            "@type": "Question",
            "name": "Is my personal job tracking info private?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every job application, notes, and uploaded certification detail is locked down securely to your private database user ID. Other users cannot search or access your dashboard metrics.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I export my generated resume?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. The resume section pulls your latest work profile details dynamically, letting you print or save the structured vector layout directly from your browser.",
            },
          },
        ],
      },
    ],
  };
}

