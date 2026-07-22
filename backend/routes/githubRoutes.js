import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { fetchGithub, fetchGithubRepos,fetchGithubStats } from "../Controllers/githubController.js";
import { getGithubRepos } from "../services/githubService.js";
const router = express.Router();

router.get("/profile",authMiddleware,fetchGithub);
router.get("/profile/repos",authMiddleware,fetchGithubRepos);
router.get("/stats",authMiddleware,fetchGithubStats);

export default router;
