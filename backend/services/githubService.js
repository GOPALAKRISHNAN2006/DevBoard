import axios from "axios";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

const normalizeUsername = (value = "") =>
  value
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/.*/, "");

const githubHeaders = () => {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const getCached = async (key, fetcher, forceRefresh = false) => {
  if (!forceRefresh) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.createdAt < CACHE_TTL) {
      return cached.value;
    }
  }
  const value = await fetcher();
  cache.set(key, { value, createdAt: Date.now() });
  return value;
};

/**
 * Fetch GitHub Profile Data
 */
export const getGithubProfile = async (username, forceRefresh = false) => {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) throw new Error("A valid GitHub username is required");

  return getCached(
    `profile:${normalizedUsername}`,
    async () => {
      const response = await axios.get(
        `https://api.github.com/users/${encodeURIComponent(normalizedUsername)}`,
        { headers: githubHeaders(), timeout: 10000 }
      );
      return response.data;
    },
    forceRefresh
  );
};

/**
 * Fetch GitHub Public Repositories (up to 100)
 */
export const getGithubRepos = async (username, forceRefresh = false) => {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) throw new Error("A valid GitHub username is required");

  return getCached(
    `repos:${normalizedUsername}`,
    async () => {
      const response = await axios.get(
        `https://api.github.com/users/${encodeURIComponent(normalizedUsername)}/repos`,
        {
          headers: githubHeaders(),
          params: { per_page: 100, sort: "updated" },
          timeout: 10000,
        }
      );
      return response.data;
    },
    forceRefresh
  );
};

/**
 * Fetch GitHub Repository Readme preview
 */
export const getGithubRepoReadme = async (username, repoName) => {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername || !repoName) return null;

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${encodeURIComponent(normalizedUsername)}/${encodeURIComponent(repoName)}/readme`,
      {
        headers: { ...githubHeaders(), Accept: "application/vnd.github.raw+json" },
        timeout: 8000,
      }
    );
    return typeof response.data === "string" ? response.data.slice(0, 3000) : "";
  } catch (e) {
    return null;
  }
};

/**
 * Calculate Language Analytics from Repositories
 */
export const analyzeLanguages = (repos = []) => {
  const langCounts = {};
  let totalReposWithLang = 0;

  repos.forEach((repo) => {
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      totalReposWithLang += 1;
    }
  });

  const languages = Object.keys(langCounts)
    .map((lang) => ({
      language: lang,
      count: langCounts[lang],
      percentage: totalReposWithLang > 0 ? Math.round((langCounts[lang] / totalReposWithLang) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return languages;
};

/**
 * Calculate Repository Statistics
 */
export const calculateRepositoryAnalytics = (repos = []) => {
  const total = repos.length;
  const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const forks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);
  const averageStars = total > 0 ? (stars / total).toFixed(1) : 0;

  const sortedByStars = [...repos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  const sortedByForks = [...repos].sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0));
  const sortedByUpdated = [...repos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return {
    total,
    stars,
    forks,
    averageStars,
    mostStarred: sortedByStars[0]
      ? { name: sortedByStars[0].name, stars: sortedByStars[0].stargazers_count, url: sortedByStars[0].html_url }
      : null,
    mostForked: sortedByForks[0]
      ? { name: sortedByForks[0].name, forks: sortedByForks[0].forks_count, url: sortedByForks[0].html_url }
      : null,
    recentlyUpdated: sortedByUpdated[0]
      ? { name: sortedByUpdated[0].name, date: new Date(sortedByUpdated[0].updated_at).toLocaleDateString(), url: sortedByUpdated[0].html_url }
      : null,
  };
};

/**
 * Evaluate DevBoard Repository Quality Rating for a given repository
 */
export const evaluateRepositoryQuality = (repo) => {
  if (!repo) return { score: 0, quality: "N/A", checks: {} };

  const checks = {
    hasDescription: !!(repo.description && repo.description.trim().length > 10),
    hasTopics: !!(repo.topics && repo.topics.length > 0),
    hasLicense: !!(repo.license && repo.license.key),
    hasHomepage: !!(repo.homepage && repo.homepage.startsWith("http")),
    isRecentlyUpdated: new Date() - new Date(repo.updated_at) < 180 * 24 * 60 * 60 * 1000,
    hasStarsOrForks: (repo.stargazers_count || 0) > 0 || (repo.forks_count || 0) > 0,
  };

  const passedCount = Object.values(checks).filter(Boolean).length;
  const score = Math.round((passedCount / Object.keys(checks).length) * 100);

  let quality = "Good";
  if (score >= 80) quality = "Excellent";
  else if (score >= 50) quality = "Good";
  else quality = "Needs Improvement";

  return { score, quality, checks };
};

/**
 * Calculate DevBoard GitHub Profile Strength (0 - 100%)
 */
export const calculateProfileStrength = (profile = {}, repos = [], hasProfileReadme = false) => {
  const completed = [];
  const missing = [];
  const breakdown = {};

  // 1. Avatar (10%)
  if (profile.avatar_url) {
    breakdown.avatar = 10;
    completed.push("Profile photo");
  } else {
    missing.push("Profile photo");
  }

  // 2. Name & Handle (10%)
  if (profile.name && profile.login) {
    breakdown.name = 10;
    completed.push("Display name");
  } else {
    missing.push("Display name");
  }

  // 3. Bio (10%)
  if (profile.bio && profile.bio.trim().length >= 10) {
    breakdown.bio = 10;
    completed.push("Bio summary");
  } else {
    missing.push("Bio summary");
  }

  // 4. Location (10%)
  if (profile.location) {
    breakdown.location = 10;
    completed.push("Location");
  } else {
    missing.push("Location");
  }

  // 5. Website/Portfolio (10%)
  if (profile.blog) {
    breakdown.website = 10;
    completed.push("Website / Portfolio link");
  } else {
    missing.push("Website / Portfolio link");
  }

  // 6. Public Repositories (10%)
  if (repos.length >= 3) {
    breakdown.repos = 10;
    completed.push("3+ Public Repositories");
  } else if (repos.length > 0) {
    breakdown.repos = 5;
    completed.push("Public Repositories");
    missing.push("Add at least 3 public repositories");
  } else {
    missing.push("Public repositories");
  }

  // 7. Repo Descriptions (15%)
  const reposWithDesc = repos.filter((r) => r.description && r.description.trim().length > 5).length;
  if (repos.length > 0 && reposWithDesc / repos.length >= 0.7) {
    breakdown.descriptions = 15;
    completed.push("Repository descriptions");
  } else {
    missing.push("Add descriptions to public repositories");
  }

  // 8. Repo Topics (10%)
  const reposWithTopics = repos.filter((r) => r.topics && r.topics.length > 0).length;
  if (repos.length > 0 && reposWithTopics / repos.length >= 0.5) {
    breakdown.topics = 10;
    completed.push("Repository topics");
  } else {
    missing.push("Add topics/tags to repositories");
  }

  // 9. Profile README (15%)
  if (hasProfileReadme) {
    breakdown.readme = 15;
    completed.push("Profile README repository");
  } else {
    missing.push("Create a GitHub Profile README (username/username)");
  }

  const score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return {
    score,
    completed,
    missing,
  };
};
