import User from "../models/User.js";
import Resume from "../models/Resume.js";

// GET /api/linkedin/profile  — aggregates stored LinkedIn URL + resume data
export const getLinkedinProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const resume = await Resume.findOne({ user: req.user.id });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      linkedinUrl: user.linkedinUrl || "",
      name: user.name,
      bio: user.bio || "",
      location: user.location || "",
      avatar: user.avatar || "",
      headline: resume?.headline || "",
      summary: resume?.summary || "",
      experience: resume?.experience || [],
      education: resume?.education || [],
      skills: user.skills || resume?.skills || [],
      certifications: resume?.certifications || [],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
