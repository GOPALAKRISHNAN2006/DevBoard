
import User from "../models/User.js";
import {
  getGithubProfile,
  getGithubRepos,
} from "../services/githubService.js";

export const fetchGithubRepos = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.githubUsername) {
      return res.status(400).json({
        message: "GitHub username not found",
      });
    }

    const repos = await getGithubRepos(user.githubUsername);

    res.status(200).json(repos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const fetchGithub = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);

        if(!user.githubUsername){
            return res.status(400).json({
                message:"Github username not found. Pleas update your profile."
            });
        }
        const profile = await getGithubProfile (user.githubUsername);
        return res.status(200).json(profile);
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const fetchGithubStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.githubUsername) {
      return res.status(400).json({
        message: "GitHub username not found",
      });
    }

    const repos = await getGithubRepos(user.githubUsername);

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
