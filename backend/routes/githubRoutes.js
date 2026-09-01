import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  fetchGithub,
  fetchGithubRepos,
  fetchGithubStats,
  fetchGithubAnalytics,
  fetchRepositoryDetails,
} from "../Controllers/githubController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", fetchGithub);
router.get("/repos", fetchGithubRepos);
router.get("/stats", fetchGithubStats);
router.get("/analytics", fetchGithubAnalytics);
router.get("/repos/:name", fetchRepositoryDetails);

export default router;
