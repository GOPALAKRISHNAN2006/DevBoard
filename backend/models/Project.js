import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    techStack: [
      {
        type: String,
        trim: true,
      },
    ],

    githubUrl: {
      type: String,
      default: "",
      trim: true,
      match: /^https?:\/\/.+/,
    },

    liveUrl: {
      type: String,
      default: "",
      trim: true,
      match: /^https?:\/\/.+/,
    },
    leetcodeUrl: {
      type: String,
      default: "",
      trim: true,
      match: /^https?:\/\/.+/,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Completed", "In Progress", "Planned"],
      default: "Completed",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);