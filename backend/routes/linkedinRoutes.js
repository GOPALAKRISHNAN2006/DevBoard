import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getLinkedinProfile,
  updateLinkedinProfile,
  compareWithResume,
  syncResumeData,
} from "../Controllers/linkedinController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", getLinkedinProfile);
router.put("/profile", updateLinkedinProfile);
router.post("/compare-resume", compareWithResume);
router.post("/sync-resume", syncResumeData);

export default router;
