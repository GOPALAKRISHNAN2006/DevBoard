import mongoose from "mongoose";
import Resume from "../models/Resume.js";
import { calculateFinalScore } from "../services/resumeAnalyzerService.js";

/**
 * Analyze existing resume without specific JD
 * POST /api/resume/:id/analyze
 */
export const analyzeResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    const resume = await Resume.findOne({ _id: id, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const analysisResult = calculateFinalScore(
      resume.toObject(),
      resume.lastJobDescription || "",
      resume.targetRole || ""
    );

    // Save evaluated score back to database
    resume.atsScore = analysisResult.score;
    resume.atsBreakdown = analysisResult.breakdown;
    await resume.save();

    return res.status(200).json({
      message: "Resume analysis completed",
      atsScore: analysisResult.score,
      breakdown: analysisResult.breakdown,
      matchedKeywords: analysisResult.matchedKeywords,
      missingKeywords: analysisResult.missingKeywords,
      keywordMatchPercentage: analysisResult.keywordMatchPercentage,
      suggestions: analysisResult.suggestions,
      targetRole: analysisResult.targetRole,
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return res.status(500).json({
      message: error.message || "Failed to analyze resume",
    });
  }
};

/**
 * Compare resume against target job role and job description
 * POST /api/resume/:id/job-match
 */
export const analyzeJobMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobDescription, targetRole } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ message: "Job description is required for match analysis" });
    }

    const resume = await Resume.findOne({ _id: id, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const effectiveTargetRole = targetRole || resume.targetRole || "";

    const analysisResult = calculateFinalScore(
      resume.toObject(),
      jobDescription,
      effectiveTargetRole
    );

    // Update resume with new score, job description, and target role
    resume.atsScore = analysisResult.score;
    resume.atsBreakdown = analysisResult.breakdown;
    resume.lastJobDescription = jobDescription;
    if (targetRole) {
      resume.targetRole = targetRole;
    }
    await resume.save();

    return res.status(200).json({
      message: "Job match analysis completed",
      atsScore: analysisResult.score,
      breakdown: analysisResult.breakdown,
      matchedKeywords: analysisResult.matchedKeywords,
      missingKeywords: analysisResult.missingKeywords,
      keywordMatchPercentage: analysisResult.keywordMatchPercentage,
      suggestions: analysisResult.suggestions,
      targetRole: analysisResult.targetRole,
      jobKeywords: analysisResult.jobKeywords,
    });
  } catch (error) {
    console.error("Error analyzing job match:", error);
    return res.status(500).json({
      message: error.message || "Failed to analyze job match",
    });
  }
};

/**
 * Get cached ATS score and breakdown
 * GET /api/resume/:id/ats-score
 */
export const getAtsScore = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    const resume = await Resume.findOne({ _id: id, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const analysisResult = calculateFinalScore(
      resume.toObject(),
      resume.lastJobDescription || "",
      resume.targetRole || ""
    );

    return res.status(200).json({
      atsScore: analysisResult.score,
      breakdown: analysisResult.breakdown,
      matchedKeywords: analysisResult.matchedKeywords,
      missingKeywords: analysisResult.missingKeywords,
      keywordMatchPercentage: analysisResult.keywordMatchPercentage,
      suggestions: analysisResult.suggestions,
    });
  } catch (error) {
    console.error("Error getting ATS score:", error);
    return res.status(500).json({
      message: error.message || "Failed to retrieve ATS score",
    });
  }
};
