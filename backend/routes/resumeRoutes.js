import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  patchResume,
  duplicateResume,
} from "../Controllers/resumeController.js";
import {
  analyzeResume,
  analyzeJobMatch,
  getAtsScore,
} from "../Controllers/resumeAnalyzerController.js";
import { uploadResumeFile } from "../Controllers/resumeUploadController.js";

const router = express.Router();

// Multer memory storage configuration for PDF parsing
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.originalname.endsWith(".pdf")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are supported for resume upload"), false);
    }
  },
});

// Resume Upload & Parsing
router.post("/upload", authMiddleware, upload.single("resumeFile"), uploadResumeFile);

// Resume CRUD
router.post("/", authMiddleware, createResume);
router.get("/", authMiddleware, getResumes);
router.get("/:id", authMiddleware, getResumeById);
router.put("/:id", authMiddleware, updateResume);
router.patch("/:id", authMiddleware, patchResume);
router.delete("/:id", authMiddleware, deleteResume);
router.post("/:id/duplicate", authMiddleware, duplicateResume);

// ATS & Job Match
router.post("/:id/analyze", authMiddleware, analyzeResume);
router.post("/:id/job-match", authMiddleware, analyzeJobMatch);
router.get("/:id/ats-score", authMiddleware, getAtsScore);

export default router;