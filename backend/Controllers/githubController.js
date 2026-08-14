
import User from "../models/User.js";
import {
  getGithubProfile,
  getGithubRepos,
} from "../services/githubService.js";

export const fetchGithubRepos = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // Use stored githubUsername or fallback to query parameter for testing
    const githubUsername = user.githubUsername || req.query.username;
    if (!githubUsername) {
      return res.status(400).json({
        message: "GitHub username not found. Provide 'username' query param or update profile.",
      });
    }
    const repos = await getGithubRepos(githubUsername);
    res.status(200).json(repos);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = status === 404
      ? "GitHub user not found. Check the username in Profile Settings."
      : status === 403
        ? "GitHub API rate limit reached. Try again shortly."
        : error.response?.data?.message || error.message || "Unable to load GitHub repositories.";
    res.status(status).json({ message });
  }
};
export const fetchGithub = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // Use stored githubUsername or fallback to query parameter for testing
    const githubUsername = user.githubUsername || req.query.username;
    if (!githubUsername) {
      return res.status(400).json({
        message: "GitHub username not found. Please update your profile or provide 'username' query param.",
      });
    }
    const profile = await getGithubProfile(githubUsername);
    return res.status(200).json(profile);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = status === 404
      ? "GitHub user not found. Check the username in Profile Settings."
      : status === 403
        ? "GitHub API rate limit reached. Try again shortly."
        : error.response?.data?.message || error.message || "Unable to load the GitHub profile.";
    return res.status(status).json({ message });
  }
};

export const fetchGithubStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Use stored githubUsername or fallback to query parameter for testing
    const githubUsername = user.githubUsername || req.query.username;

    if (!githubUsername) {
      return res.status(400).json({
        message: "GitHub username not found",
      });
    }

    const repos = await getGithubRepos(githubUsername);

    const totalRepos = repos.length;
    const totalStars = repos.reduce(
        (sum,repo) => sum + repo.stargazers_count,0
    );
     const totalForks = repos.reduce(
        (sum,repo) => sum + repo.forks_count,0
    );
    const languageCount = {};
    repos.forEach((repo)=>{
        if(repo.language){
            languageCount[repo.language] = (languageCount[repo.language] || 0)+1;
        }
    });

    const mostUsedLanguage =
      Object.keys(languageCount).length > 0
        ? Object.keys(languageCount).reduce((a, b) =>
            languageCount[a] > languageCount[b] ? a : b
          )
     : "N/A"
    
     const topRepository = repos.length > 0 ? 
     repos.reduce((prev,current)=>
        prev.stargazers_count > current.stargazers_count
           ? prev : current
    ) : null;
    res.status(200).json({
        totalRepos,totalStars,totalForks,mostUsedLanguage,
        topRepository:topRepository ?
        {
            name : topRepository.name,
            stars : topRepository.stargazers_count,
            url : topRepository.html_url
        }
        :null
    });
    

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
