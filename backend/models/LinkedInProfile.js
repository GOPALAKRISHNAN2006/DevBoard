import mongoose from "mongoose";

const linkedinProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    headline: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    about: {
      type: String,
      default: "",
      trim: true,
    },
    linkedinUrl: {
      type: String,
      default: "",
      trim: true,
    },
    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },
    portfolioUrl: {
      type: String,
      default: "",
      trim: true,
    },
    leetcodeUrl: {
      type: String,
      default: "",
      trim: true,
    },
    targetRole: {
      type: String,
      default: "Full Stack Developer",
      trim: true,
    },
    skills: [
      {
        category: { type: String, default: "Technical Skills" },
        items: [{ type: String, trim: true }],
      },
    ],
    experience: [
      {
        company: { type: String, trim: true },
        jobTitle: { type: String, trim: true },
        location: { type: String, trim: true },
        startDate: { type: String, trim: true },
        endDate: { type: String, trim: true },
        currentlyWorking: { type: Boolean, default: false },
        responsibilities: { type: String, default: "" },
        achievements: { type: String, default: "" },
      },
    ],
    education: [
      {
        institution: { type: String, trim: true },
        degree: { type: String, trim: true },
        field: { type: String, trim: true },
        cgpa: { type: String, trim: true },
        startDate: { type: String, trim: true },
        endDate: { type: String, trim: true },
        location: { type: String, trim: true },
      },
    ],
    certifications: [
      {
        name: { type: String, trim: true },
        organization: { type: String, trim: true },
        issueDate: { type: String, trim: true },
        credentialId: { type: String, trim: true },
        credentialUrl: { type: String, trim: true },
      },
    ],
    projects: [
      {
        name: { type: String, trim: true },
        description: { type: String, default: "" },
        technologies: { type: String, default: "" },
        githubUrl: { type: String, default: "" },
        liveDemoUrl: { type: String, default: "" },
      },
    ],
    profileStrength: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LinkedInProfile", linkedinProfileSchema);
