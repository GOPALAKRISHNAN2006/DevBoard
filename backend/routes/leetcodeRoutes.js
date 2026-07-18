import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { fetchLeetcodeProfile } from '../controller/leetcodeController.js';
const router = express.Router();

router.get("/profile",authMiddleware,fetchLeetcodeProfile);

export default router;
