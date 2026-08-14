import { useEffect, useState } from "react";
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
  FiUser
} from "react-icons/fi";
import api from "../../api/axios";
import { getPublicGithubRepos } from "../../api/githubPublic";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import StatCard from "../../components/StatCard";
import EmptyState from "../../components/EmptyState";
import "./Dashboard.css";

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
        }),
      );

    const ghUsername = user?.githubUsername;
    if (ghUsername) {
      getPublicGithubRepos(ghUsername)
         .then((reposData) => {
           const repos = Array.isArray(reposData) ? reposData : [];
           const sortedRepos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 5);
           setGithubStats({
             totalRepos: repos.length,
             totalStars: repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0),
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

    api.get("/leetcode/stats")
       .then(r => setLeetcodeStats(r.data))
       .catch(() => setLeetcodeStats(null));
  }, [user]);

  if (!data)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  const s = data.summary || {};

  return (
    <Layout>
      <div className="dashboard-header section-head">
        <div>
          <h1 className="page-title" data-testid="dashboard-page-title">Your career command center</h1>
          <p className="page-subtitle">
            Keep your projects, applications and progress moving forward.
          </p>
        </div>
        <div className="quick-actions d-none d-sm-flex">
          <Link to="/profile" className="btn btn-light btn-sm" data-testid="dashboard-profile-link">
            <FiUser /> Profile Settings
          </Link>
          <Link
            to="/resume"
            data-testid="dashboard-resume-link"
            className="nav-link"
          >
            <FiFileText />
            Resume
          </Link>
          <Link to="/projects" className="btn btn-secondary btn-sm" data-testid="dashboard-new-project-button">
            <FiPlus /> New Project
          </Link>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {[
          [FiFolder, "Total Projects", s.totalProjects || 0, "blue", "dashboard-total-projects"],
          [FiBriefcase, "Total Jobs", s.totalJobs || 0, "purple", "dashboard-total-jobs"],
          [FiAward, "Total Skills", s.totalSkills || 0, "orange", "dashboard-total-skills"],
          [FiCheckCircle, "Offers", s.offers || 0, "green", "dashboard-offers"],
        ].map(([Icon, label, value, tone, testId]) => (
          <div className="col-6 col-xl-3" key={label} data-testid={testId}>
            <StatCard icon={Icon} label={label} value={value} tone={tone} />
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        {githubStats && (
          <div className="col-6 col-xl-3" data-testid="dashboard-github-repos">
            <StatCard icon={FiGithub} label="GitHub Repos" value={githubStats.totalRepos || 0} tone="blue" />
          </div>
        )}
        {githubStats && (
          <div className="col-6 col-xl-3" data-testid="dashboard-github-stars">
            <StatCard icon={FiGithub} label="GitHub Stars" value={githubStats.totalStars || 0} tone="purple" />
          </div>
        )}
        {leetcodeStats && (
          <div className="col-6 col-xl-3" data-testid="dashboard-leetcode-solved">
            <StatCard icon={FiCode} label="LeetCode Solved" value={leetcodeStats.totalSolved || 0} tone="orange" />
          </div>
        )}
        {leetcodeStats && (
          <div className="col-6 col-xl-3" data-testid="dashboard-leetcode-rank">
            <StatCard icon={FiCode} label="LeetCode Rank" value={leetcodeStats.ranking || "N/A"} tone="green" />
          </div>
        )}
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card dashboard-card h-100" data-testid="dashboard-recent-projects">
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm blue">
                  <FiActivity />
                </div>
                <h5 className="m-0">Recent projects</h5>
              </div>
              <Link to="/projects" className="view-all-link">View all</Link>
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
                      <a href={p.liveUrl || p.githubUrl || "#"} target="_blank" rel="noreferrer" className="action-link">
                        <FiArrowUpRight />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <EmptyState
                    title="No projects yet"
                    text="Add a project to start building your portfolio."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-lg-5">
          <div className="card dashboard-card h-100" data-testid="dashboard-recent-jobs">
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm purple">
                  <FiFileText />
                </div>
                <h5 className="m-0">Recent applications</h5>
              </div>
              <Link to="/jobs" data-testid="dashboard-jobs-link" className="view-all-link">View all</Link>
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
                      <span className={`status-badge ${j.status?.toLowerCase() || 'applied'}`}>{j.status || 'Applied'}</span>
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

      <div className="row g-4 mt-2 mb-4">
        <div className="col-12">
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
                      {note.isPinned && <span className="status-badge interview">Pinned</span>}
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
      </div>

      {/* GitHub Repositories Section */}
      <div className="row g-4 mt-2 mb-4">
        <div className="col-12">
          <div className="card dashboard-card h-100" data-testid="dashboard-recent-github">
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm blue">
                  <FiGithub />
                </div>
                <h5 className="m-0">Recent GitHub Repositories</h5>
              </div>
              <Link to="/github" className="view-all-link"
              data-testid="dashboard-github-link">View all</Link>
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
                          {repo.language || "No language"} • {repo.stargazers_count} Stars
                        </p>
                      </div>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="action-link">
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

      {/* LeetCode Section */}
      <div className="row g-4 mt-2 mb-4">
        <div className="col-12">
          <div className="card dashboard-card h-100">
            <div className="card-header-modern">
              <div className="card-title-wrap">
                <div className="icon-wrap-sm orange">
                  <FiCode />
                </div>
                <h5 className="m-0">LeetCode Progress</h5>
              </div>
              <Link to="/leetcode" className="view-all-link" data-testid="dashboard-leetcode-link">
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
                        <strong className="d-block fs-4">{value}</strong>
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
