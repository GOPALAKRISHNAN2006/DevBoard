import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
      default: "Developer Resume",
    },

    targetRole: {
      type: String,
      trim: true,
      default: "Full Stack Developer",
    },

    personalInfo: {
      name: { type: String, trim: true, default: "" },
      email: { type: String, trim: true, default: "" },
      phone: { type: String, trim: true, default: "" },
      location: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
      portfolio: { type: String, trim: true, default: "" },
    },

    summary: {
      type: String,
      default: "",
    },

    skills: [
      {
        category: { type: String, trim: true },
        items: [{ type: String, trim: true }],
      },
    ],

    education: [
      {
        institution: { type: String, trim: true, default: "" },
        degree: { type: String, trim: true, default: "" },
        field: { type: String, trim: true, default: "" },
        cgpa: { type: String, trim: true, default: "" },
        startDate: { type: String, trim: true, default: "" },
        endDate: { type: String, trim: true, default: "" },
        location: { type: String, trim: true, default: "" },
        description: { type: String, default: "" },
      },
    ],

    experience: [
      {
        company: { type: String, trim: true, default: "" },
        jobTitle: { type: String, trim: true, default: "" },
        location: { type: String, trim: true, default: "" },
        startDate: { type: String, trim: true, default: "" },
        endDate: { type: String, trim: true, default: "" },
        currentlyWorking: { type: Boolean, default: false },
        responsibilities: { type: String, default: "" },
        achievements: { type: String, default: "" },
      },
    ],

    projects: [
      {
        name: { type: String, trim: true, default: "" },
        description: { type: String, default: "" },
        technologies: { type: String, trim: true, default: "" },
        githubUrl: { type: String, trim: true, default: "" },
        liveDemoUrl: { type: String, trim: true, default: "" },
        startDate: { type: String, trim: true, default: "" },
        endDate: { type: String, trim: true, default: "" },
        achievements: { type: String, default: "" },
      },
    ],

    certifications: [
      {
        name: { type: String, trim: true, default: "" },
        organization: { type: String, trim: true, default: "" },
        issueDate: { type: String, trim: true, default: "" },
        credentialId: { type: String, trim: true, default: "" },
        credentialUrl: { type: String, trim: true, default: "" },
      },
    ],

    achievements: [
      {
        title: { type: String, trim: true, default: "" },
        description: { type: String, default: "" },
        date: { type: String, trim: true, default: "" },
      },
    ],

    languages: [
      {
        language: { type: String, trim: true, default: "" },
        proficiency: { type: String, trim: true, default: "" },
      },
    ],

    sectionOrder: {
      type: [String],
      default: [
        "summary",
        "skills",
        "experience",
        "projects",
        "education",
        "certifications",
        "achievements",
        "languages",
      ],
    },

    template: {
      type: String,
      default: "ats-classic",
      enum: ["ats-classic", "modern-developer", "minimal", "fresher-student"],
    },

    atsScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    atsBreakdown: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    lastJobDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);