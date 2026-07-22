import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        company: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        jobType: {
            type: String,
            enum: ["Remote", "Hybrid", "On-site"],
            default: "On-site"
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Interview",
                "Assessment",
                "Offer",
                "Rejected"
            ],
            default: "Applied"
        },

        appliedDate: {
            type: Date,
            default: Date.now
        },

        deadline: Date,

        salary: String,

        jobLink: String,

        notes: String
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Job", jobSchema);