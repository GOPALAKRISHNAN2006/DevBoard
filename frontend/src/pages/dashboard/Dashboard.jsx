import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiFolder,
  FiBriefcase,
  FiAward,
  FiCheckCircle,
  FiArrowUpRight,
  FiPlus,
  FiFileText,
  FiActivity,
  FiGithub,
  FiCode,
  FiUser,
  FiTrendingUp,
  FiCheckSquare,
} from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../api/axios";
import { getPublicGithubRepos } from "../../api/githubPublic";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import StatCard from "../../components/StatCard";
import EmptyState from "../../components/EmptyState";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [githubRepos, setGithubRepos] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((r) => setData(r.data))
      .catch(() =>
        setData({
          summary: {},
          projects: { recent: [] },
          jobs: { recent: [] },
          notes: { recent: [] },
        })
      );

    const ghUsername = user?.githubUsername;
    if (ghUsername) {
      getPublicGithubRepos(ghUsername)
        .then((reposData) => {
          const repos = Array.isArray(reposData) ? reposData : [];
          const sortedRepos = repos
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 5);
          setGithubStats({
            totalRepos: repos.length,
            totalStars: repos.reduce(
              (total, repo) => total + (repo.stargazers_count || 0),
              0
            ),
          });
          setGithubRepos(sortedRepos);
        })
        .catch(() => {
          setGithubStats(null);
          setGithubRepos([]);
        });
    } else {
      setGithubStats(null);
      setGithubRepos([]);
    }

    api
      .get("/leetcode/stats")
      .then((r) => setLeetcodeStats(r.data))
      .catch(() => setLeetcodeStats(null));
  }, [user]);

  // Compute job application breakdown data for Chart.js
  const jobChartData = useMemo(() => {
    const jobsList = data?.jobs?.recent || [];
    const counts = {
      Applied: 0,
      Assessment: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    };

    jobsList.forEach((job) => {
      const st = job.status || "Applied";
      if (counts[st] !== undefined) counts[st] += 1;
      else counts.Applied += 1;
    });

    return {
      labels: ["Applied", "Assessment", "Interview", "Offer", "Rejected"],
      datasets: [
        {
          label: "Applications",
          data: [
            counts.Applied || 1,
            counts.Assessment,
            counts.Interview,
            counts.Offer,
            counts.Rejected,
          ],
          backgroundColor: [
            "#0a66c2",
            "#f59e0b",
            "#8b5cf6",
            "#10b981",
            "#ef4444",
          ],
          borderRadius: 6,
        },
      ],
    };
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { ticks: { precision: 0 } },
    },
  };

  // Compute career completion snapshot
  const careerProgress = useMemo(() => {
    const projectsCount = data?.summary?.totalProjects || 0;
    const jobsCount = data?.summary?.totalJobs || 0;
    const hasGithub = !!user?.githubUsername;
    const hasLeetcode = !!leetcodeStats;

    return [
      {
        name: "Projects Portfolio",
        progress: Math.min(100, projectsCount * 25),
        color: "bg-primary",
      },
      {
        name: "Job Tracker",
        progress: Math.min(100, jobsCount * 20),
        color: "bg-purple",
      },
      {
        name: "GitHub Integration",
        progress: hasGithub ? 100 : 30,
        color: "bg-dark",
      },
      {
        name: "LeetCode Practice",
        progress: hasLeetcode ? 90 : 20,
        color: "bg-warning",
      },
    ];
  }, [data, user, leetcodeStats]);

  if (!data)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  const s = data.summary || {};

  return (
    <Layout>
      {/* ======================================================== */}
      {/* PAGE HEADER */}
      {/* ======================================================== */}
      <div className="dashboard-header section-head">
        <div>
          <h1 className="page-title" data-testid="dashboard-page-title">
            Your career command center
          </h1>
          <p className="page-subtitle">
            Keep your projects, applications and progress moving forward.
          </p>
        </div>
        <div className="quick-actions d-none d-sm-flex gap-2">
          <Link
            to="/profile"
            className="btn btn-outline-secondary btn-sm fw-bold d-flex align-items-center gap-1"
            data-testid="dashboard-profile-link"
          >
            <FiUser /> Profile Settings
          </Link>
          <Link
            to="/resume"
            data-testid="dashboard-resume-link"
            className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-1"
          >
            <FiFileText /> Resume
          </Link>
          <Link
            to="/projects"
            className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
            data-testid="dashboard-new-project-button"
          >
            <FiPlus /> New Project
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 8 STATISTICS CARDS */}
      {/* ======================================================== */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3" data-testid="dashboard-total-projects">
          <StatCard
            icon={FiFolder}
            label="Total Projects"
            value={s.totalProjects || 0}
            tone="blue"
          />
        </div>
        <div className="col-6 col-xl-3" data-testid="dashboard-total-jobs">
          <StatCard
            icon={FiBriefcase}
            label="Total Jobs"
            value={s.totalJobs || 0}
            tone="purple"
          />
        </div>
        <div className="col-6 col-xl-3" data-testid="dashboard-total-skills">
          <StatCard
            icon={FiAward}
            label="Total Skills"
            value={s.totalSkills || 0}
            tone="orange"
          />
        </div>
        <div className="col-6 col-xl-3" data-testid="dashboard-offers">
          <StatCard
            icon={FiCheckCircle}
            label="Offers"
            value={s.offers || 0}
            tone="green"
          />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3" data-testid="dashboard-github-repos">
          <StatCard
            icon={FiGithub}
            label="GitHub Repos"
            value={githubStats ? githubStats.totalRepos : "N/A"}
            tone="blue"
          />
        </div>
        <div className="col-6 col-xl-3" data-testid="dashboard-github-stars">
          <StatCard
            icon={FiGithub}
            label="GitHub Stars"
            value={githubStats ? githubStats.totalStars : "N/A"}
            tone="purple"
          />
        </div>
        <div className="col-6 col-xl-3" data-testid="dashboard-leetcode-solved">
          <StatCard
            icon={FiCode}
            label="LeetCode Solved"
            value={leetcodeStats ? leetcodeStats.totalSolved : "N/A"}
            tone="orange"
          />
        </div>
        <div className="col-6 col-xl-3" data-testid="dashboard-leetcode-rank">
          <StatCard
            icon={FiCode}
            label="LeetCode Rank"
            value={leetcodeStats ? `#${leetcodeStats.ranking}` : "N/A"}
            tone="green"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* ANALYTICS & CAREER PROGRESS */}
      {/* ======================================================== */}
      <div className="row g-4 mb-4">
        {/* Application Overview Chart */}
        <div className="col-12 col-lg-7">
          <div className="card dashboard-card h-100 p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="icon-wrap-sm blue">
                  <FiTrendingUp />
                </div>
                <h5 className="h6 fw-bold text-dark text-uppercase mb-0">
                  Application Overview
                </h5>
              </div>
              <span className="badge bg-light text-secondary border">
                Status Distribution
              </span>
            </div>

            <div style={{ width: "100%", height: 210 }}>
              <Bar data={jobChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Career Progress */}
        <div className="col-12 col-lg-5">
          <div className="card dashboard-card h-100 p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="icon-wrap-sm purple">
                  <FiCheckSquare />
                </div>
                <h5 className="h6 fw-bold text-dark text-uppercase mb-0">
                  Career Progress
                </h5>
              </div>
              <span className="badge bg-purple-subtle text-purple border border-purple">
                Developer Footprint
              </span>
            </div>

            <div className="d-flex flex-column gap-3">
              {careerProgress.map((item, idx) => (
                <div key={idx}>
                  <div className="d-flex justify-content-between small fw-semibold mb-1">
                    <span className="text-dark">{item.name}</span>
                    <span className="text-muted">{item.progress}%</span>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className={`progress-bar ${item.color}`}
                      style={{ width: `${item.progress}%` }}
                      aria-valuenow={item.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RECENT PROJECTS & RECENT APPLICATIONS */}
      {/* ======================================================== */}
      <div className="row g-4 mb-4">
        {/* Recent Projects */}
        <div className="col-12 col-lg-7">
          <div
            className="card dashboard-card h-100"
            data-testid="dashboard-recent-projects"
          >
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm blue">
                  <FiActivity />
                </div>
                <h5 className="m-0">Recent projects</h5>
              </div>
              <Link to="/projects" className="view-all-link">
                View all
              </Link>
            </div>

            <div className="card-body p-0">
              {data.projects?.recent?.length ? (
                <div className="list-group list-group-flush">
                  {data.projects.recent.map((p) => (
                    <div className="project-row" key={p._id}>
                      <div className="project-mark">
                        <FiFolder />
                      </div>
                      <div className="project-info">
                        <strong>{p.title}</strong>
                        <p>
                          {p.techStack?.slice(0, 3).join(" • ") ||
                            "No technologies added"}
                        </p>
                      </div>
                      <a
                        href={p.liveUrl || p.githubUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="action-link"
                      >
                        <FiArrowUpRight />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <EmptyState
                    title="No projects available."
                    text="Add a project to start building your portfolio."
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="col-12 col-lg-5">
          <div
            className="card dashboard-card h-100"
            data-testid="dashboard-recent-jobs"
          >
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm purple">
                  <FiFileText />
                </div>
                <h5 className="m-0">Recent applications</h5>
              </div>
              <Link
                to="/jobs"
                data-testid="dashboard-jobs-link"
                className="view-all-link"
              >
                View all
              </Link>
            </div>

            <div className="card-body p-0">
              {data.jobs?.recent?.length ? (
                <div className="list-group list-group-flush">
                  {data.jobs.recent.map((j) => (
                    <div className="job-row" key={j._id}>
                      <div className="job-info">
                        <strong>{j.role}</strong>
                        <p>
                          {j.company} • {j.location}
                        </p>
                      </div>
                      <span
                        className={`status-badge ${
                          j.status?.toLowerCase() || "applied"
                        }`}
                      >
                        {j.status || "Applied"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <EmptyState
                    title="No applications yet"
                    text="Track your next opportunity."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RECENT NOTES & RECENT GITHUB */}
      {/* ======================================================== */}
      <div className="row g-4 mb-4">
        {/* Recent Notes */}
        <div className="col-12 col-lg-6">
          <div className="card dashboard-card h-100">
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm purple">
                  <FiFileText />
                </div>
                <h5 className="m-0">Recent notes</h5>
              </div>
              <Link
                to="/notes"
                data-testid="dashboard-notes-link"
                className="view-all-link"
              >
                View all
              </Link>
            </div>

            <div className="card-body p-0">
              {data.notes?.recent?.length ? (
                <div className="list-group list-group-flush">
                  {data.notes.recent.map((note) => (
                    <div className="job-row" key={note._id}>
                      <div className="job-info">
                        <strong>{note.title || "Untitled"}</strong>
                        <p>{note.content || "No content"}</p>
                      </div>
                      {note.isPinned && (
                        <span className="status-badge interview">Pinned</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <EmptyState
                    title="No notes yet"
                    text="Capture an idea or reminder to see it here."
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GitHub Repositories */}
        <div className="col-12 col-lg-6">
          <div
            className="card dashboard-card h-100"
            data-testid="dashboard-recent-github"
          >
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm blue">
                  <FiGithub />
                </div>
                <h5 className="m-0">Recent GitHub Repositories</h5>
              </div>
              <Link
                to="/github"
                className="view-all-link"
                data-testid="dashboard-github-link"
              >
                View all
              </Link>
            </div>

            <div className="card-body p-0">
              {githubRepos && githubRepos.length > 0 ? (
                <div className="list-group list-group-flush">
                  {githubRepos.map((repo) => (
                    <div className="project-row" key={repo.id}>
                      <div className="project-mark">
                        <FiGithub />
                      </div>
                      <div className="project-info">
                        <strong>{repo.name}</strong>
                        <p>
                          {repo.language || "No language"} •{" "}
                          {repo.stargazers_count} Stars
                        </p>
                      </div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="action-link"
                      >
                        <FiArrowUpRight />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <EmptyState
                    title="No repositories yet"
                    text="Your recent GitHub repositories will appear here."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LEETCODE SECTION */}
      {/* ======================================================== */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card dashboard-card h-100">
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm orange">
                  <FiCode />
                </div>
                <h5 className="m-0">LeetCode Progress</h5>
              </div>
              <Link
                to="/leetcode"
                className="view-all-link"
                data-testid="dashboard-leetcode-link"
              >
                View all
              </Link>
            </div>

            <div className="card-body p-0">
              {leetcodeStats ? (
                <div className="row g-0">
                  {[
                    ["Total solved", leetcodeStats.totalSolved || 0],
                    ["Easy", leetcodeStats.easySolved || 0],
                    ["Medium", leetcodeStats.mediumSolved || 0],
                    ["Hard", leetcodeStats.hardSolved || 0],
                  ].map(([label, value]) => (
                    <div className="col-6 col-lg-3" key={label}>
                      <div className="p-4 text-center border-end border-bottom">
                        <strong className="d-block fs-4 text-dark">
                          {value}
                        </strong>
                        <span className="text-muted small">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <EmptyState
                    title="No LeetCode stats yet"
                    text="Add your LeetCode username in Profile Settings to see your progress."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
