import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const routes = [
  {
    path: '/',
    outputPaths: [path.join(distDir, 'index.html')],
    componentPath: '/src/pages/home/Home.jsx',
    name: 'Homepage'
  },
  {
    path: '/features/job-application-tracker',
    outputPaths: [
      path.join(distDir, 'features', 'job-application-tracker', 'index.html'),
      path.join(distDir, 'features', 'job-application-tracker.html')
    ],
    componentPath: '/src/pages/features/JobTrackerFeature.jsx',
    name: 'Job Application Tracker'
  },
  {
    path: '/features/ats-resume-builder',
    outputPaths: [
      path.join(distDir, 'features', 'ats-resume-builder', 'index.html'),
      path.join(distDir, 'features', 'ats-resume-builder.html')
    ],
    componentPath: '/src/pages/features/ResumeBuilderFeature.jsx',
    name: 'ATS Resume Builder'
  },
  {
    path: '/features/github-analytics',
    outputPaths: [
      path.join(distDir, 'features', 'github-analytics', 'index.html'),
      path.join(distDir, 'features', 'github-analytics.html')
    ],
    componentPath: '/src/pages/features/GithubAnalyticsFeature.jsx',
    name: 'GitHub Analytics'
  },
  {
    path: '/features/leetcode-tracker',
    outputPaths: [
      path.join(distDir, 'features', 'leetcode-tracker', 'index.html'),
      path.join(distDir, 'features', 'leetcode-tracker.html')
    ],
    componentPath: '/src/pages/features/LeetcodeTrackerFeature.jsx',
    name: 'LeetCode Tracker'
  },
  {
    path: '/features/developer-portfolio',
    outputPaths: [
      path.join(distDir, 'features', 'developer-portfolio', 'index.html'),
      path.join(distDir, 'features', 'developer-portfolio.html')
    ],
    componentPath: '/src/pages/features/PortfolioFeature.jsx',
    name: 'Developer Portfolio CMS'
  },
  {
    path: '/features/linkedin-optimizer',
    outputPaths: [
      path.join(distDir, 'features', 'linkedin-optimizer', 'index.html'),
      path.join(distDir, 'features', 'linkedin-optimizer.html')
    ],
    componentPath: '/src/pages/features/LinkedinOptimizerFeature.jsx',
    name: 'LinkedIn Optimizer'
  },
  {
    path: '/login',
    outputPaths: [
      path.join(distDir, 'login', 'index.html'),
      path.join(distDir, 'login.html')
    ],
    componentPath: '/src/pages/auth/Login.jsx',
    name: 'Sign In'
  },
  {
    path: '/register',
    outputPaths: [
      path.join(distDir, 'register', 'index.html'),
      path.join(distDir, 'register.html')
    ],
    componentPath: '/src/pages/auth/Register.jsx',
    name: 'Create Account'
  }
];

async function prerender() {
  console.log('[Prerender] Starting static HTML generation for public routes...');

  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Build template not found at ${templatePath}. Run 'vite build' first.`);
  }
  const rawTemplate = fs.readFileSync(templatePath, 'utf8');

  // Initialize Vite SSR instance
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: rootDir,
    ssr: {
      external: ['react-router-dom', 'react-router', 'react-helmet-async']
    }
  });

  try {
    const { AuthProvider } = await vite.ssrLoadModule('/src/context/AuthContext.jsx');
    const { ThemeProvider } = await vite.ssrLoadModule('/src/context/ThemeContext.jsx');

    for (const route of routes) {
      console.log(`[Prerender] Rendering route: ${route.path} (${route.name})...`);

      const Component = (await vite.ssrLoadModule(route.componentPath)).default;

      const helmetContext = {};
      const element = React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          MemoryRouter,
          { initialEntries: [route.path] },
          React.createElement(
            ThemeProvider,
            null,
            React.createElement(
              AuthProvider,
              null,
              React.createElement(Component, null)
            )
          )
        )
      );

      const renderedMarkup = renderToString(element);

      // Separate head elements from body elements
      // Matches <title>...</title>, <meta ... />, <link ... />, <script type="application/ld+json">...</script>
      const headTags = [];
      let bodyMarkup = renderedMarkup;

      // Extract title
      const titleMatch = bodyMarkup.match(/<title[^>]*>[\s\S]*?<\/title>/i);
      if (titleMatch) {
        headTags.push(titleMatch[0]);
        bodyMarkup = bodyMarkup.replace(titleMatch[0], '');
      }

      // Extract meta tags
      const metaMatches = bodyMarkup.matchAll(/<meta[^>]+>/gi);
      for (const m of metaMatches) {
        headTags.push(m[0]);
      }
      bodyMarkup = bodyMarkup.replace(/<meta[^>]+>/gi, '');

      // Extract link tags (canonical, etc.)
      const linkMatches = bodyMarkup.matchAll(/<link[^>]+>/gi);
      for (const m of linkMatches) {
        headTags.push(m[0]);
      }
      bodyMarkup = bodyMarkup.replace(/<link[^>]+>/gi, '');

      // Extract JSON-LD script tags
      const scriptMatches = bodyMarkup.matchAll(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi);
      for (const m of scriptMatches) {
        headTags.push(m[0]);
      }
      bodyMarkup = bodyMarkup.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');

      // Prepare final HTML from template
      let html = rawTemplate;

      // Ensure <html lang="en"> is set
      if (!html.includes('lang="en"')) {
        html = html.replace('<html', '<html lang="en"');
      }

      // Remove default title and description from template
      html = html.replace(/<title>[\s\S]*?<\/title>/i, '');
      html = html.replace(/<meta\s+name="description"[^>]*>/i, '');

      // Inject the prerendered head tags right before </head>
      const formattedHeadTags = headTags.map(tag => `    ${tag}`).join('\n');
      html = html.replace('</head>', `${formattedHeadTags}\n  </head>`);

      // Inject body markup into #root
      html = html.replace('<div id="root"></div>', `<div id="root">${bodyMarkup}</div>`);

      // Ensure destination directories exist and write output files
      for (const outPath of route.outputPaths) {
        const outputDir = path.dirname(outPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outPath, html, 'utf8');
        const stat = fs.statSync(outPath);
        console.log(`[Prerender] ✓ Generated ${outPath} (${(stat.size / 1024).toFixed(2)} kB)`);
      }
    }

    console.log('[Prerender] All public routes prerendered successfully!');
  } finally {
    await vite.close();
  }
}

prerender().catch(err => {
  console.error('[Prerender] Failed with error:', err);
  process.exit(1);
});
