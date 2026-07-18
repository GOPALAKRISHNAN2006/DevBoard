import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"
import githubRoutes from "./routes/githubRoutes.js"
import leetcodeRoutes from "./routes/leetcodeRoutes.js"
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", projectRoutes);
app.use("/api/github",githubRoutes);
app.use("/api/leetcode",leetcodeRoutes)

app.get("/", (req, res) => {
    res.send("Server Running...");
});

export default app;