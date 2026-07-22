import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import leetcodeRoutes from "./routes/leetcodeRoutes.js";
import resumeRoutes from './routes/resumeRoutes.js';
import jobRoutes from "./routes/jobRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js";

import cors from "cors";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/github",githubRoutes);
app.use("/api/leetcode",leetcodeRoutes);
app.use("/api/user/resume",resumeRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/dashboard",dashboardRoutes);

app.get("/", (req, res) => {
    res.send("Server Running...");
});

export default app;