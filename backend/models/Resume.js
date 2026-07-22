import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    headline: String,
    summary: String,

    education: [
      {
        institute: String,
        degree: String,
        year: String,
        cgpa: String
      }
    ],

    skills: [String],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String
      }
    ],

    certifications: [
      {
        title: String,
        issuer: String,
        year: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Resume", resumeSchema);