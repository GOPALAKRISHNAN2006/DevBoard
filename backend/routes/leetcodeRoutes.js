import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { fetchLeetcodeProfile,fetchLeetcodeStats } from '../Controllers/leetcodeController.js';
const router = express.Router();

router.get("/profile",authMiddleware,fetchLeetcodeProfile);
router.get("/stats",authMiddleware,fetchLeetcodeStats);

export default router;
