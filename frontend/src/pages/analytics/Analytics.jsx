import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import {
  FiActivity,
  FiBriefcase,
  FiFolder,
  FiCode,
  FiRefreshCw,
  FiFilter,
  FiFileText,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

import ApplicationFunnelCard from "../../components/analytics/ApplicationFunnelCard";
import SuccessRateCard from "../../components/analytics/SuccessRateCard";
import CareerProgressCard from "../../components/analytics/CareerProgressCard";
import InsightsPanel from "../../components/analytics/InsightsPanel";
import UpcomingDeadlinesCard from "../../components/analytics/UpcomingDeadlinesCard";

import "./Analytics.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: { color: "#64748b", font: { family: "Inter" } },
    },
  },
  scales: {
    x: { ticks: { color: "#64748b" }, grid: { color: "rgba(0,0,0,0.04)" } },
    y: { ticks: { color: "#64748b" }, grid: { color: "rgba(0,0,0,0.04)" } },
  },
};

const PIE_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: { color: "#64748b", font: { family: "Inter" } },
    },
  },
};

export default function Analytics() {
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leetcode, setLeetcode] = useState(null);
  const [github, setGithub] = useState(null);
  const [linkedin, setLinkedin] = useState(null);
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState("All Time");

  const loadAllAnalytics = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      await Promise.all([
        api
          .get("/jobs?limit=500")
          .then((r) => setJobs(r.data?.jobs || []))
          .catch(() => {}),
        api
          .get("/project?limit=500")
          .then((r) => setProjects(r.data?.projects || []))
          .catch(() => {}),
        api
          .get("/leetcode/stats")
          .then((r) => setLeetcode(r.data))
          .catch(() => {}),
        api
          .get("/github/stats?username=GOPALAKRISHNAN2006")
          .then((r) => setGithub(r.data))
          .catch(() => {}),
        api
          .get("/linkedin/profile")
          .then((r) => setLinkedin(r.data?.profile))
          .catch(() => {}),
        api
          .get("/resume")
          .then((r) => setResume(r.data?.resume))
          .catch(() => {}),
      ]);

      if (isRefresh) {
        toast.success("Analytics updated successfully");
      }
    } catch {
      toast.error("Unable to load analytics");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAllAnalytics();
  }, [loadAllAnalytics]);

  // Application Funnel & Success Rate Stats Calculation
  const funnelStats = useMemo(() => {
    const total = jobs.length;
    const applied = jobs.filter(
      (j) => !j.status || j.status === "Applied"
    ).length;
    const assessment = jobs.filter((j) => j.status === "Assessment").length;
    const interview = jobs.filter((j) => j.status === "Interview").length;
    const offer = jobs.filter((j) => j.status === "Offer").length;
    const rejected = jobs.filter((j) => j.status === "Rejected").length;

    const assessmentRate =
      total > 0 ? Math.round((assessment / total) * 100) : 0;
    const interviewRate = total > 0 ? Math.round((interview / total) * 100) : 0;
    const offerRate = total > 0 ? Math.round((offer / total) * 100) : 0;
    const rejectionRate = total > 0 ? Math.round((rejected / total) * 100) : 0;

    return {
      total,
      applied,
      assessment,
      interview,
      offer,
      rejected,
      assessmentRate,
      interviewRate,
      offerRate,
      rejectionRate,
    };
  }, [jobs]);

  // DevBoard Career Progress
  const careerProgress = useMemo(() => {
    const projectsCount = projects.length;
    const jobsCount = jobs.length;
    const hasGithub = !!github?.totalRepos;
    const hasLeetcode = !!leetcode?.totalSolved;
    const linkedinScore = linkedin?.profileStrength || 60;

    return [
      {
        name: "Projects Portfolio",
        progress: Math.min(100, projectsCount * 20),
        color: "bg-primary",
      },
      {
        name: "Resume Completeness",
        progress: resume ? 85 : 40,
        color: "bg-info",
      },
      {
        name: "GitHub Integration",
        progress: hasGithub ? 95 : 30,
        color: "bg-dark",
      },
      {
        name: "LeetCode Practice",
        progress: hasLeetcode ? 88 : 20,
        color: "bg-warning",
      },
      {
        name: "LinkedIn Branding",
        progress: linkedinScore,
        color: "bg-purple",
      },
    ];
  }, [projects, jobs, github, leetcode, linkedin, resume]);

  // Career Dynamic Insights
  const careerInsights = useMemo(() => {
    const insights = [];

    if (github?.totalRepos > 0) {
      insights.push({
        type: "success",
        message: `You have ${github.totalRepos} public GitHub repositories synchronized with DevBoard.`,
      });
    }

    if (leetcode?.totalSolved > 0) {
      insights.push({
        type: "success",
        message: `You have solved ${leetcode.totalSolved} LeetCode problems across Easy, Medium, and Hard.`,
      });
    }

    if (funnelStats.assessment > 0) {
      insights.push({
        type: "info",
        message: `Your most active application status is Assessment (${funnelStats.assessment} active OAs).`,
      });
    }

    if (projects.length < 3) {
      insights.push({
        type: "warning",
        message:
          "Consider building 1 more project to strengthen your developer portfolio score.",
      });
    }

    return insights;
  }, [github, leetcode, funnelStats, projects]);

  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  /* ─ Job Status Pie ─ */
  const jobStatusCounts = jobs.reduce((acc, j) => {
    acc[j.status] = (acc[j.status] || 0) + 1;
    return acc;
  }, {});

  const jobPieData = {
    labels: Object.keys(jobStatusCounts),
    datasets: [
      {
        data: Object.values(jobStatusCounts),
        backgroundColor: [
          "#6366f1",
          "#8b5cf6",
          "#f59e0b",
          "#10b981",
          "#ef4444",
          "#3b82f6",
          "#ec4899",
        ],
        borderWidth: 0,
      },
    ],
  };

  /* ─ Monthly Job Applications (last 6 months) ─ */
  const monthLabels = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return d.toLocaleString("default", { month: "short" });
  });
  const monthCounts = Array(6).fill(0);
  jobs.forEach((j) => {
    const d = new Date(j.appliedDate || j.createdAt);
    const monthsDiff =
      new Date().getMonth() +
      12 * new Date().getFullYear() -
      (d.getMonth() + 12 * d.getFullYear());
    if (monthsDiff >= 0 && monthsDiff < 6) monthCounts[5 - monthsDiff]++;
  });
  const jobBarData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Applications",
        data: monthCounts,
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  /* ─ Project Status Donut ─ */
  const projStatusCounts = projects.reduce((acc, p) => {
    acc[p.status || "Completed"] = (acc[p.status || "Completed"] || 0) + 1;
    return acc;
  }, {});
  const projPieData = {
    labels: Object.keys(projStatusCounts),
    datasets: [
      {
        data: Object.values(projStatusCounts),
        backgroundColor: ["#10b981", "#f59e0b", "#6366f1"],
        borderWidth: 0,
      },
    ],
  };

  /* ─ LeetCode Difficulty Bar ─ */
  const leetcodeBarData = leetcode
    ? {
        labels: ["Easy", "Medium", "Hard"],
        datasets: [
          {
            label: "Solved",
            data: [
              leetcode.easySolved || 0,
              leetcode.mediumSolved || 0,
              leetcode.hardSolved || 0,
            ],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
            borderRadius: 6,
          },
        ],
      }
    : null;

  /* ─ Tech Stack frequency bar ─ */
  const techCounts = {};
  projects.forEach((p) =>
    (p.techStack || []).forEach((t) => {
      techCounts[t] = (techCounts[t] || 0) + 1;
    })
  );
  const topTech = Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const techBarData = {
    labels: topTech.map(([t]) => t),
    datasets: [
      {
        label: "Projects using tech",
        data: topTech.map(([, c]) => c),
        backgroundColor: "rgba(139, 92, 246, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  const statCards = [
    {
      icon: FiBriefcase,
      label: "Total Applications",
      value: jobs.length,
      tone: "purple",
    },
    {
      icon: FiFolder,
      label: "Total Projects",
      value: projects.length,
      tone: "blue",
    },
    {
      icon: FiCode,
      label: "LeetCode Solved",
      value: leetcode?.totalSolved || "—",
      tone: "orange",
    },
    {
      icon: FiActivity,
      label: "GitHub Repos",
      value: github?.totalRepos || "—",
      tone: "green",
    },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <div className="section-head d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">
            A bird's-eye view of your developer career progress.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* Date Range Filter */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary btn-sm fw-bold dropdown-toggle d-flex align-items-center gap-1"
              type="button"
              data-bs-toggle="dropdown"
            >
              <FiFilter /> {dateRange}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {["7 Days", "30 Days", "3 Months", "6 Months", "1 Year", "All Time"].map(
                (range) => (
                  <li key={range}>
                    <button
                      type="button"
                      className="dropdown-item small fw-medium"
                      onClick={() => setDateRange(range)}
                    >
                      {range}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
            disabled={refreshing}
            onClick={() => loadAllAnalytics(true)}
          >
            <FiRefreshCw className={refreshing ? "spin" : ""} /> Refresh Analytics
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {statCards.map(({ icon: Icon, label, value, tone }) => (
          <div className="col-6 col-xl-3" key={label}>
            <div className="analytics-stat-card">
              <div className={`analytics-stat-icon ${tone}`}>
                <Icon />
              </div>
              <div className="analytics-stat-value">{value}</div>
              <div className="analytics-stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Funnel & Success Rate */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-7">
          <ApplicationFunnelCard funnelStats={funnelStats} />
        </div>
        <div className="col-12 col-lg-5">
          <SuccessRateCard funnelStats={funnelStats} />
          <CareerProgressCard careerProgress={careerProgress} />
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card p-4">
            <h6 className="chart-title">Monthly Job Applications</h6>
            <div className="chart-wrap">
              <Bar data={jobBarData} options={CHART_OPTS} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-4">
            <h6 className="chart-title">Job Status Breakdown</h6>
            <div className="chart-wrap">
              <Pie data={jobPieData} options={PIE_OPTS} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <div className="card p-4">
            <h6 className="chart-title">Project Status</h6>
            <div className="chart-wrap">
              <Pie data={projPieData} options={PIE_OPTS} />
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card p-4">
            <h6 className="chart-title">Top Technologies Used</h6>
            <div className="chart-wrap">
              {topTech.length > 0 ? (
                <Bar data={techBarData} options={CHART_OPTS} />
              ) : (
                <p className="text-muted small mt-3">
                  Add tech stacks to your projects to see data here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LeetCode & GitHub Section */}
      {leetcodeBarData && (
        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <div className="card p-4">
              <h6 className="chart-title">LeetCode Problems by Difficulty</h6>
              <div className="chart-wrap">
                <Bar data={leetcodeBarData} options={CHART_OPTS} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card p-4">
              <h6 className="chart-title">GitHub Overview</h6>
              <div className="analytics-github-grid">
                {github &&
                  [
                    ["Repositories", github.totalRepos],
                    ["Stars", github.totalStars],
                    ["Forks", github.totalForks],
                    ["Followers", github.followers],
                    ["Following", github.following],
                    ["Top Language", github.topLanguage || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="github-stat-box">
                      <span className="github-stat-value">{v ?? "—"}</span>
                      <span className="github-stat-key">{k}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights & Deadlines */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <InsightsPanel insights={careerInsights} />
        </div>
        <div className="col-12 col-lg-6">
          <UpcomingDeadlinesCard jobs={jobs} />
        </div>
      </div>
    </Layout>
  );
}
