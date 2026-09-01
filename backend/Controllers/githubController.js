import User from "../models/User.js";
import Project from "../models/Project.js";
import Resume from "../models/Resume.js";
import {
  getGithubProfile,
  getGithubRepos,
  getGithubRepoReadme,
  analyzeLanguages,
  calculateRepositoryAnalytics,
  calculateProfileStrength,
  evaluateRepositoryQuality,
} from "../services/githubService.js";

/**
 * GET /api/github/profile
 */
export const fetchGithub = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const githubUsername = user.githubUsername || req.query.username;
    if (!githubUsername) {
      return res.status(400).json({
        message: "GitHub username not configured in Profile Settings",
      });
    }

    const forceRefresh = req.query.forceRefresh === "true";
    const profile = await getGithubProfile(githubUsername, forceRefresh);
    res.status(200).json(profile);
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      status === 404
        ? "GitHub user not found. Check the username in Profile Settings."
        : status === 403
        ? "GitHub API rate limit reached. Please try again later."
        : error.response?.data?.message || error.message || "Unable to load GitHub profile.";
    res.status(status).json({ message });
  }
};

/**
 * GET /api/github/repos
 */
export const fetchGithubRepos = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const githubUsername = user.githubUsername || req.query.username;
    if (!githubUsername) {
      return res.status(400).json({
        message: "GitHub username not configured in Profile Settings",
      });
    }

    const forceRefresh = req.query.forceRefresh === "true";
    const repos = await getGithubRepos(githubUsername, forceRefresh);
    res.status(200).json(repos);
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      status === 404
        ? "GitHub user not found. Check the username in Profile Settings."
        : status === 403
        ? "GitHub API rate limit reached. Please try again later."
        : error.response?.data?.message || error.message || "Unable to load GitHub repositories.";
    res.status(status).json({ message });
  }
};

/**
 * GET /api/github/stats
 */
export const fetchGithubStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const githubUsername = user.githubUsername || req.query.username;
    if (!githubUsername) {
      return res.status(400).json({ message: "GitHub username not found" });
    }

    const repos = await getGithubRepos(githubUsername);
    const totalRepos = repos.length;
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

    const languageCount = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    const mostUsedLanguage =
      Object.keys(languageCount).length > 0
        ? Object.keys(languageCount).reduce((a, b) =>
            languageCount[a] > languageCount[b] ? a : b
          )
        : "N/A";

    const topRepository =
      repos.length > 0
        ? repos.reduce((prev, current) =>
            (prev.stargazers_count || 0) > (current.stargazers_count || 0) ? prev : current
          )
        : null;

    res.status(200).json({
      totalRepos,
      totalStars,
      totalForks,
      mostUsedLanguage,
      topRepository: topRepository
        ? {
            name: topRepository.name,
            stars: topRepository.stargazers_count,
            url: topRepository.html_url,
          }
        : null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/github/analytics
 * Comprehensive normalized GitHub analytics payload
 */
export const fetchGithubAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const githubUsername = user.githubUsername || req.query.username;
    if (!githubUsername) {
      return res.status(400).json({
        message: "GitHub username not configured in Profile Settings",
      });
    }

    const forceRefresh = req.query.forceRefresh === "true";
    const profile = await getGithubProfile(githubUsername, forceRefresh);
    const repos = await getGithubRepos(githubUsername, forceRefresh);

    // Detect Profile README (repo named exactly as username)
    const profileReadmeRepo = repos.find(
      (r) => r.name.toLowerCase() === profile.login.toLowerCase()
    );
    const hasProfileReadme = !!profileReadmeRepo;

    // Analytics calculations
    const languages = analyzeLanguages(repos);
    const analytics = calculateRepositoryAnalytics(repos);
    const profileStrength = calculateProfileStrength(profile, repos, hasProfileReadme);

    // Cross-reference with DevBoard Projects & Resume
    const userProjects = await Project.find({ user: req.user.id });
    const userResume = await Resume.findOne({ user: req.user.id });

    const projectMatches = (userProjects || []).map((p) => {
      const match = repos.find(
        (r) =>
          r.name.toLowerCase().includes(p.title.toLowerCase()) ||
          p.title.toLowerCase().includes(r.name.toLowerCase()) ||
          (p.githubUrl && p.githubUrl.toLowerCase().includes(r.name.toLowerCase()))
      );
      return {
        devboardProject: p.title,
        matchedRepo: match ? match.name : null,
        matchedUrl: match ? match.html_url : null,
        isConnected: !!match,
      };
    });

    const resumeProjects = (userResume?.projects || []).map((rp) => {
      const match = repos.find(
        (r) =>
          r.name.toLowerCase().includes(rp.name.toLowerCase()) ||
          rp.name.toLowerCase().includes(r.name.toLowerCase())
      );
      return {
        resumeProject: rp.name,
        matchedRepo: match ? match.name : null,
        matchedUrl: match ? match.html_url : null,
        isConnected: !!match,
      };
    });

    // Evaluate Quality for top 5 repositories
    const topReposWithQuality = [...repos]
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 5)
      .map((r) => ({
        ...r,
        qualityRating: evaluateRepositoryQuality(r),
      }));

    res.status(200).json({
      profile: {
        username: profile.login,
        name: profile.name || profile.login,
        avatar: profile.avatar_url,
        bio: profile.bio || "",
        location: profile.location || "",
        company: profile.company || "",
        website: profile.blog || "",
        profileUrl: profile.html_url,
        publicRepos: profile.public_repos || 0,
        followers: profile.followers || 0,
        following: profile.following || 0,
        createdAt: profile.created_at
          ? new Date(profile.created_at).toLocaleDateString()
          : "",
      },
      repositories: {
        total: repos.length,
        stars: analytics.stars,
        forks: analytics.forks,
        items: repos,
        topItems: topReposWithQuality,
      },
      languages,
      analytics,
      profileStrength,
      hasProfileReadme,
      profileReadmeUrl: profileReadmeRepo ? profileReadmeRepo.html_url : null,
      projectMatches,
      resumeProjectsMatches: resumeProjects,
    });
  } catch (error) {
    console.error("fetchGithubAnalytics error:", error.message);
    const status = error.response?.status || 500;
    const message =
      status === 404
        ? "GitHub user not found. Check the username in Profile Settings."
        : status === 403
        ? "GitHub API rate limit reached. Please try again later."
        : error.response?.data?.message || error.message || "Unable to load GitHub analytics.";
    res.status(status).json({ message });
  }
};

/**
 * GET /api/github/repos/:name
 * Get single repository details with README preview
 */
export const fetchRepositoryDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const githubUsername = user.githubUsername || req.query.username;
    const repoName = req.params.name;

    if (!githubUsername || !repoName) {
      return res.status(400).json({ message: "Username and repository name required" });
    }

    const repos = await getGithubRepos(githubUsername);
    const repo = repos.find((r) => r.name.toLowerCase() === repoName.toLowerCase());

    if (!repo) {
      return res.status(404).json({ message: `Repository '${repoName}' not found` });
    }

    const readmeContent = await getGithubRepoReadme(githubUsername, repoName);
    const quality = evaluateRepositoryQuality(repo);

    res.status(200).json({
      repo,
      readmeContent,
      quality,
    });
  } catch (error) {
    console.error("fetchRepositoryDetails error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
