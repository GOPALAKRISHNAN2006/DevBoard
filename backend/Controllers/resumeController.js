import mongoose from "mongoose";
import Resume from "../models/Resume.js";
import { calculateFinalScore } from "../services/resumeAnalyzerService.js";

/**
 * Create a new resume version
 * POST /api/resume
 */
export const createResume = async (req, res) => {
  try {
    const {
      title,
      targetRole,
      personalInfo,
      summary,
      skills,
      education,
      experience,
      projects,
      certifications,
      achievements,
      languages,
      sectionOrder,
      template,
    } = req.body;

    const newResumeData = {
      user: req.user.id,
      title: title || "Untitled Developer Resume",
      targetRole: targetRole || "Full Stack Developer",
      personalInfo: personalInfo || {},
      summary: summary || "",
      skills: skills || [],
      education: education || [],
      experience: experience || [],
      projects: projects || [],
      certifications: certifications || [],
      achievements: achievements || [],
      languages: languages || [],
      sectionOrder: sectionOrder || [
        "summary",
        "skills",
        "experience",
        "projects",
        "education",
        "certifications",
        "achievements",
        "languages",
      ],
      template: template || "ats-classic",
    };

    // Calculate initial ATS Score
    const atsResult = calculateFinalScore(newResumeData);
    newResumeData.atsScore = atsResult.score;
    newResumeData.atsBreakdown = atsResult.breakdown;

    const resume = await Resume.create(newResumeData);

    return res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({
      message: error.message || "Failed to create resume",
    });
  }
};

/**
 * Get all resumes for authenticated user
 * GET /api/resume
 */
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
    return res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return res.status(500).json({
      message: error.message || "Failed to fetch resumes",
    });
  }
};

/**
 * Get single resume by ID (strictly verified with req.user.id)
 * GET /api/resume/:id
 */
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    const resume = await Resume.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume by ID:", error);
    return res.status(500).json({
      message: error.message || "Failed to fetch resume",
    });
  }
};

/**
 * Update complete resume by ID
 * PUT /api/resume/:id
 */
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    const updateData = { ...req.body };
    delete updateData.user; // Protect user field from modification

    // Re-evaluate ATS Score on update
    const atsResult = calculateFinalScore(
      updateData,
      updateData.lastJobDescription || "",
      updateData.targetRole || ""
    );
    updateData.atsScore = atsResult.score;
    updateData.atsBreakdown = atsResult.breakdown;

    const resume = await Resume.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).json({
      message: error.message || "Failed to update resume",
    });
  }
};

/**
 * Patch partial resume by ID
 * PATCH /api/resume/:id
 */
export const patchResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    const existingResume = await Resume.findOne({ _id: id, user: req.user.id });
    if (!existingResume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    const mergedData = {
      ...existingResume.toObject(),
      ...req.body,
    };
    delete mergedData.user;

    const atsResult = calculateFinalScore(
      mergedData,
      mergedData.lastJobDescription || "",
      mergedData.targetRole || ""
    );

    req.body.atsScore = atsResult.score;
    req.body.atsBreakdown = atsResult.breakdown;

    const resume = await Resume.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Resume patched successfully",
      resume,
    });
  } catch (error) {
    console.error("Error patching resume:", error);
    return res.status(500).json({
      message: error.message || "Failed to patch resume",
    });
  }
};

/**
 * Delete resume by ID
 * DELETE /api/resume/:id
 */
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    const resume = await Resume.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
      id,
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return res.status(500).json({
      message: error.message || "Failed to delete resume",
    });
  }
};

/**
 * Duplicate an existing resume version
 * POST /api/resume/:id/duplicate
 */
export const duplicateResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    const originalResume = await Resume.findOne({ _id: id, user: req.user.id });
    if (!originalResume) {
      return res.status(404).json({ message: "Original resume not found" });
    }

    const copyObj = originalResume.toObject();
    delete copyObj._id;
    delete copyObj.createdAt;
    delete copyObj.updatedAt;

    copyObj.title = `${copyObj.title} (Copy)`;
    copyObj.user = req.user.id;

    const duplicated = await Resume.create(copyObj);

    return res.status(201).json({
      message: "Resume duplicated successfully",
      resume: duplicated,
    });
  } catch (error) {
    console.error("Error duplicating resume:", error);
    return res.status(500).json({
      message: error.message || "Failed to duplicate resume",
    });
  }
};
