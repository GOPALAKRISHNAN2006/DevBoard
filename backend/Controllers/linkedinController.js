import User from "../models/User.js";
import Resume from "../models/Resume.js";
import Project from "../models/Project.js";
import LinkedInProfile from "../models/LinkedInProfile.js";
import {
  calculateProfileStrength,
  generateHeadlineSuggestions,
  compareResumeProfile,
  generateCareerSuggestions,
} from "../services/linkedinService.js";

/**
 * GET /api/linkedin/profile
 * Get or initialize user's LinkedIn profile aggregated with strength score & analysis
 */
export const getLinkedinProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    let profile = await LinkedInProfile.findOne({ user: userId });
    const resume = await Resume.findOne({ user: userId });
    const projectsList = await Project.find({ user: userId });

    // Initialize profile if not created yet
    if (!profile) {
      profile = new LinkedInProfile({
        user: userId,
        headline: resume?.targetRole || "Full Stack Developer",
        location: user.location || "India",
        about: resume?.summary || user.bio || "",
        linkedinUrl: user.linkedinUrl || "",
        githubUrl: user.githubUsername ? `https://github.com/${user.githubUsername}` : user.portfolioUrl || "",
        portfolioUrl: user.portfolioUrl || "",
        leetcodeUrl: user.leetcodeUsername ? `https://leetcode.com/${user.leetcodeUsername}` : "",
        targetRole: resume?.targetRole || "Full Stack Developer",
        skills: resume?.skills?.length ? resume.skills : [{ category: "Skills", items: user.skills || [] }],
        experience: resume?.experience || [],
        education: resume?.education || [],
        certifications: resume?.certifications || [],
        projects: projectsList?.length
          ? projectsList.map((p) => ({
              name: p.title,
              description: p.description,
              technologies: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack || "",
              githubUrl: p.githubUrl || "",
              liveDemoUrl: p.liveUrl || "",
            }))
          : resume?.projects || [],
      });
      await profile.save();
    }

    // Recalculate Strength & Suggestions
    const strengthData = calculateProfileStrength(profile.toObject(), user.toObject());
    profile.profileStrength = strengthData.score;
    await profile.save();

    const headlineSuggestions = generateHeadlineSuggestions(profile.skills, profile.targetRole);
    const comparison = compareResumeProfile(resume || {}, profile.toObject());
    const careerSuggestions = generateCareerSuggestions(profile.toObject(), resume || {});

    res.status(200).json({
      profile: {
        ...profile.toObject(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        linkedinUrl: user.linkedinUrl || profile.linkedinUrl,
      },
      strength: strengthData,
      headlineSuggestions,
      comparison,
      careerSuggestions,
    });
  } catch (error) {
    console.error("getLinkedinProfile error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/linkedin/profile
 * Update user's LinkedIn profile
 */
export const updateLinkedinProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      headline,
      location,
      about,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      leetcodeUrl,
      targetRole,
      skills,
      experience,
      education,
      certifications,
      projects,
    } = req.body;

    let profile = await LinkedInProfile.findOne({ user: userId });
    if (!profile) {
      profile = new LinkedInProfile({ user: userId });
    }

    if (headline !== undefined) profile.headline = headline;
    if (location !== undefined) profile.location = location;
    if (about !== undefined) profile.about = about;
    if (linkedinUrl !== undefined) profile.linkedinUrl = linkedinUrl;
    if (githubUrl !== undefined) profile.githubUrl = githubUrl;
    if (portfolioUrl !== undefined) profile.portfolioUrl = portfolioUrl;
    if (leetcodeUrl !== undefined) profile.leetcodeUrl = leetcodeUrl;
    if (targetRole !== undefined) profile.targetRole = targetRole;
    if (skills !== undefined) profile.skills = skills;
    if (experience !== undefined) profile.experience = experience;
    if (education !== undefined) profile.education = education;
    if (certifications !== undefined) profile.certifications = certifications;
    if (projects !== undefined) profile.projects = projects;

    // Sync linkedinUrl back to User model if provided
    if (linkedinUrl !== undefined) {
      await User.findByIdAndUpdate(userId, { linkedinUrl });
    }

    const user = await User.findById(userId);
    const strengthData = calculateProfileStrength(profile.toObject(), user.toObject());
    profile.profileStrength = strengthData.score;
    await profile.save();

    res.status(200).json({
      message: "LinkedIn profile updated successfully",
      profile: {
        ...profile.toObject(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      strength: strengthData,
    });
  } catch (error) {
    console.error("updateLinkedinProfile error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/linkedin/compare-resume
 * Compare stored LinkedIn profile against user's DevBoard Resume
 */
export const compareWithResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await LinkedInProfile.findOne({ user: userId });
    const resume = await Resume.findOne({ user: userId });

    if (!profile) return res.status(404).json({ message: "LinkedIn profile not found" });

    const comparison = compareResumeProfile(resume || {}, profile.toObject());
    res.status(200).json(comparison);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/linkedin/sync-resume
 * Sync user's latest DevBoard Resume & Projects into their LinkedIn profile
 */
export const syncResumeData = async (req, res) => {
  try {
    const userId = req.user.id;
    const resume = await Resume.findOne({ user: userId });
    const projectsList = await Project.find({ user: userId });
    const user = await User.findById(userId);

    let profile = await LinkedInProfile.findOne({ user: userId });
    if (!profile) profile = new LinkedInProfile({ user: userId });

    if (resume) {
      profile.headline = resume.targetRole ? `${resume.targetRole} | MERN & Full Stack Developer` : profile.headline;
      profile.about = resume.summary || profile.about;
      profile.skills = resume.skills?.length ? resume.skills : profile.skills;
      profile.experience = resume.experience?.length ? resume.experience : profile.experience;
      profile.education = resume.education?.length ? resume.education : profile.education;
      profile.certifications = resume.certifications?.length ? resume.certifications : profile.certifications;
    }

    if (projectsList && projectsList.length > 0) {
      profile.projects = projectsList.map((p) => ({
        name: p.title,
        description: p.description,
        technologies: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack || "",
        githubUrl: p.githubUrl || "",
        liveDemoUrl: p.liveUrl || "",
      }));
    } else if (resume?.projects) {
      profile.projects = resume.projects;
    }

    const strengthData = calculateProfileStrength(profile.toObject(), user.toObject());
    profile.profileStrength = strengthData.score;
    await profile.save();

    res.status(200).json({
      message: "LinkedIn profile synchronized from DevBoard Resume & Projects",
      profile: {
        ...profile.toObject(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      strength: strengthData,
    });
  } catch (error) {
    console.error("syncResumeData error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
