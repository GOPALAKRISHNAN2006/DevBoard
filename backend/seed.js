import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Project from "./models/Project.js";
import Job from "./models/Job.js";
import Note from "./models/Note.js";

async function seed() {
  await connectDB();

  console.log("Checking demo user...");
  let demoUser = await User.findOne({ email: "demo@devboard.com" });

  const hashedPassword = await bcrypt.hash("password123", 10);

  if (!demoUser) {
    demoUser = await User.create({
      name: "Alex Rivera",
      email: "demo@devboard.com",
      password: hashedPassword,
      bio: "Full Stack Engineer specializing in React, Node.js, and Cloud Infrastructure. Passionate about developer tooling and performance.",
      location: "San Francisco, CA",
      skills: ["React 19", "Node.js", "Express", "MongoDB", "TypeScript", "Next.js", "Docker", "GraphQL", "Tailwind CSS"],
      githubUsername: "GOPALAKRISHNAN2006",
      leetcodeUsername: "gopal_m",
      linkedinUrl: "https://linkedin.com/in/alexrivera-dev",
      portfolioUrl: "https://devboard.app",
    });
    console.log("Demo user created:", demoUser.email);
  } else {
    demoUser.name = "Alex Rivera";
    demoUser.password = hashedPassword;
    demoUser.githubUsername = demoUser.githubUsername || "GOPALAKRISHNAN2006";
    demoUser.leetcodeUsername = demoUser.leetcodeUsername || "gopal_m";
    if (!demoUser.skills || demoUser.skills.length === 0) {
      demoUser.skills = ["React 19", "Node.js", "Express", "MongoDB", "TypeScript", "Next.js", "Docker"];
    }
    await demoUser.save();
    console.log("Demo user updated:", demoUser.email);
  }

  // Check projects
  const projectCount = await Project.countDocuments({ owner: demoUser._id });
  if (projectCount === 0) {
    await Project.insertMany([
      {
        owner: demoUser._id,
        title: "DevBoard - Career Command Center",
        description: "Unified developer portfolio dashboard combining GitHub analytics, LeetCode tracking, ATS resume analysis, and job pipelines.",
        techStack: ["React 19", "Node.js", "Express", "MongoDB", "Chart.js"],
        githubUrl: "https://github.com/GOPALAKRISHNAN2006/DevBoard",
        liveUrl: "https://dev-board-mauve.vercel.app",
        status: "Completed",
        featured: true,
      },
      {
        owner: demoUser._id,
        title: "CloudPulse - Kubernetes Metrics Monitor",
        description: "Real-time telemetry and cluster health monitoring platform with automated anomaly alerts and time-series charting.",
        techStack: ["Go", "React", "Prometheus", "Docker", "WebSockets"],
        githubUrl: "https://github.com/GOPALAKRISHNAN2006",
        liveUrl: "https://cloudpulse-demo.vercel.app",
        status: "Completed",
        featured: true,
      },
      {
        owner: demoUser._id,
        title: "NeuralFlow - Workflow Automation Agent",
        description: "Autonomous task execution pipeline powered by LLM agentic patterns, supporting scheduled triggers and webhook integrations.",
        techStack: ["TypeScript", "Python", "FastAPI", "PostgreSQL", "OpenAI"],
        githubUrl: "https://github.com/GOPALAKRISHNAN2006",
        status: "In Progress",
        featured: false,
      },
      {
        owner: demoUser._id,
        title: "SecureAuth - Zero-Trust Identity Gateway",
        description: "Lightweight OAuth2.1 and Passkey authentication service designed for modern microservice architectures.",
        techStack: ["Rust", "Redis", "WebAuthn", "Docker"],
        status: "Planned",
        featured: false,
      },
    ]);
    console.log("Sample projects created");
  }

  // Check jobs
  const jobCount = await Job.countDocuments({ user: demoUser._id });
  if (jobCount === 0) {
    await Job.insertMany([
      {
        user: demoUser._id,
        company: "Stripe",
        role: "Senior Frontend Engineer",
        location: "Remote / San Francisco",
        jobType: "Remote",
        status: "Interview",
        notes: "Round 2 technical screen scheduled for Thursday. Review React internals and system design.",
      },
      {
        user: demoUser._id,
        company: "Linear",
        role: "Product Engineer",
        location: "Remote",
        jobType: "Remote",
        status: "Assessment",
        notes: "Take-home component design exercise received. 48 hour submission window.",
      },
      {
        user: demoUser._id,
        company: "Vercel",
        role: "Full Stack Platform Engineer",
        location: "San Francisco, CA",
        jobType: "Hybrid",
        status: "Offer",
        notes: "Received written offer letter! Competitive equity compensation and remote flexibility.",
      },
      {
        user: demoUser._id,
        company: "GitHub",
        role: "Developer Experience Engineer",
        location: "Remote",
        jobType: "Remote",
        status: "Applied",
        notes: "Applied via referral link from former colleague.",
      },
      {
        user: demoUser._id,
        company: "Datadog",
        role: "UI Systems Engineer",
        location: "New York, NY",
        jobType: "On-site",
        status: "Applied",
        notes: "Submitted tailored ATS resume emphasizing real-time visualization expertise.",
      },
      {
        user: demoUser._id,
        company: "Shopify",
        role: "Staff Software Engineer",
        location: "Remote",
        jobType: "Remote",
        status: "Rejected",
        notes: "Candidate pool was exceptionally senior. Recruiter encouraged re-applying in 6 months.",
      },
    ]);
    console.log("Sample jobs created");
  }

  // Check notes
  const noteCount = await Note.countDocuments({ owner: demoUser._id });
  if (noteCount === 0) {
    await Note.insertMany([
      {
        owner: demoUser._id,
        title: "System Design: Scalable WebSocket Architecture",
        content: "Key considerations for real-time notification brokers:\n1. Redis Pub/Sub for cross-cluster messaging\n2. Heartbeat pings every 30s to detect broken connections\n3. Graceful reconnection with exponential backoff and jitter.",
        tags: ["Architecture", "SystemDesign", "WebSockets"],
        isPinned: true,
      },
      {
        owner: demoUser._id,
        title: "Frontend Performance Optimization Checklist",
        content: "- Code split large routes with React.lazy and Suspense\n- Compress SVG assets and inline critical icons\n- Replace heavy date-fns with native Intl API\n- Enable CSS containment on long feed containers.",
        tags: ["React", "Performance", "Frontend"],
        isPinned: true,
      },
      {
        owner: demoUser._id,
        title: "Stripe Tech Interview Preparation",
        content: "Questions to ask hiring manager:\n- What does the typical engineering feedback loop look like?\n- How do you balance tech debt with rapid feature delivery?",
        tags: ["Interview", "Stripe"],
        isPinned: false,
      },
    ]);
    console.log("Sample notes created");
  }

  console.log("Seed process completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
