import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiTwitter,
  FiPhone,
  FiCode,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiLogOut,
  FiAward,
  FiBriefcase,
  FiRefreshCw,
  FiCheckSquare,
  FiExternalLink,
} from "react-icons/fi";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import "./Profile.css";

export default function Profile() {
  const { user, setUser, logout } = useAuth();

  const [form, setForm] = useState();
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    let active = true;

    api
      .get("/user/getme")
      .then((r) => {
        if (active) {
          setForm({
            ...r.data,
            skills: r.data.skills?.join(", ") || "",
          });
        }
      })
      .catch(() => {
        if (active) {
          setForm({
            ...user,
            skills: user?.skills?.join(", ") || "",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [user]);

  // Profile Strength Calculation (0-100%)
  const profileStrength = useMemo(() => {
    if (!form) return 0;
    let score = 0;
    if (form.name) score += 10;
    if (form.email) score += 10;
    if (form.location) score += 10;
    if (form.bio) score += 10;
    if (form.skills && form.skills.length > 0) score += 20;
    if (form.githubUsername) score += 15;
    if (form.leetcodeUsername) score += 15;
    if (form.linkedinUrl) score += 5;
    if (form.portfolioUrl) score += 5;
    return Math.min(100, score);
  }, [form]);

  // Profile Improvement Suggestions
  const suggestions = useMemo(() => {
    if (!form) return [];
    const list = [];
    if (!form.location) list.push("Add location to boost local recruiter visibility.");
    if (!form.bio) list.push("Add a short bio to highlight your engineering background.");
    if (!form.githubUsername) list.push("Connect GitHub to showcase your repositories.");
    if (!form.leetcodeUsername) list.push("Connect LeetCode to display coding stats.");
    if (!form.linkedinUrl) list.push("Connect LinkedIn for career branding.");
    if (!form.portfolioUrl) list.push("Add portfolio link to share your projects.");
    return list;
  }, [form]);

  if (!form) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data } = await api.post("/user/me", {
        ...form,
        skills: (form.skills || "")
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      });

      setUser(data.user);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeSync = async () => {
    if (!window.confirm("Sync skills and career information from your latest resume into your profile?")) return;
    setSyncing(true);
    try {
      const { data: resData } = await api.get("/resume");
      if (resData?.resume) {
        const resumeSkills = resData.resume.skills || [];
        const existingSkills = (form.skills || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        const combined = Array.from(new Set([...existingSkills, ...resumeSkills]));

        setForm((prev) => ({
          ...prev,
          skills: combined.join(", "),
        }));
        toast.success("Synced skills from Resume!");
      } else {
        toast.error("No active resume found. Build or upload a resume first.");
      }
    } catch {
      toast.error("Unable to sync from resume");
    } finally {
      setSyncing(false);
    }
  };

  const ConnectionStatus = ({
    label,
    value,
    icon: Icon,
    color,
    testId,
  }) => (
    <div className="connection-item" data-testid={testId}>
      <div className={`connection-icon ${color}`}>
        <Icon size={16} />
      </div>

      <div className="connection-info">
        <span className="connection-label">{label}</span>

        <span
          className={`connection-status ${value ? "connected" : "missing"}`}
          data-testid={`${testId}-status`}
        >
          {value ? (
            <>
              <FiCheckCircle size={12} />
              Connected
            </>
          ) : (
            <>
              <FiAlertCircle size={12} />
              Not set
            </>
          )}
        </span>
      </div>
    </div>
  );

  const parsedSkillsList = (form.skills || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  return (
    <Layout>
      {/* PAGE HEADER */}
      <div className="section-head d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title" data-testid="profile-page-title">
            Profile Settings
          </h1>
          <p className="page-subtitle" data-testid="profile-page-subtitle">
            Manage your identity across GitHub, LeetCode, LinkedIn and more.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-1"
          onClick={handleResumeSync}
          disabled={syncing}
        >
          <FiRefreshCw className={syncing ? "spin" : ""} /> Sync from Resume
        </button>
      </div>

      <div className="row g-4">
        {/* MAIN FORM */}
        <div className="col-lg-8">
          <form onSubmit={save} data-testid="profile-form">
            {/* PERSONAL INFORMATION */}
            <div className="card shadow-sm border-0 bg-white p-4 mb-4">
              <div className="profile-section-header mb-3">
                <FiUser size={18} />
                <h6 className="m-0">Personal Information</h6>
              </div>

              <div className="row g-3">
                {/* Full Name */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Full Name</label>
                  <input
                    className="form-control"
                    data-testid="profile-name-input"
                    value={form.name || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Email address</label>
                  <input
                    disabled
                    className="form-control bg-light"
                    data-testid="profile-email-input"
                    value={form.email || ""}
                  />
                </div>

                {/* Location */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Location</label>
                  <input
                    className="form-control"
                    data-testid="profile-location-input"
                    placeholder="e.g. Coimbatore, India"
                    value={form.location || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        location: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Skills */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    Skills <span className="text-muted">(comma separated)</span>
                  </label>
                  <input
                    className="form-control"
                    data-testid="profile-skills-input"
                    placeholder="React, Node.js, MongoDB"
                    value={form.skills || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        skills: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Skill Badges Preview */}
                {parsedSkillsList.length > 0 && (
                  <div className="col-12">
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {parsedSkillsList.map((skill, idx) => (
                        <span key={idx} className="skill-chip">
                          <FiAward size={12} className="text-primary" /> {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                <div className="col-12">
                  <label className="form-label small fw-semibold">Bio</label>
                  <textarea
                    className="form-control"
                    data-testid="profile-bio-input"
                    rows="3"
                    placeholder="Short bio about yourself..."
                    value={form.bio || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        bio: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* INTEGRATIONS */}
            <div className="card shadow-sm border-0 bg-white p-4 mb-4">
              <div className="profile-section-header mb-3">
                <FiCode size={18} />
                <h6 className="m-0">Developer Integrations</h6>
              </div>

              <p className="text-muted small mb-3">
                Connect your usernames to power DevBoard GitHub analytics, LeetCode widgets, and career dashboards.
              </p>

              <div className="row g-3">
                {/* GitHub */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    <FiGithub size={14} className="me-1 text-dark" />
                    GitHub Username
                  </label>
                  <input
                    className="form-control"
                    data-testid="profile-github-input"
                    placeholder="e.g. GOPALAKRISHNAN2006"
                    value={form.githubUsername || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        githubUsername: e.target.value,
                      })
                    }
                  />
                </div>

                {/* LeetCode */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    <FiCode size={14} className="me-1 text-warning" />
                    LeetCode Username
                  </label>
                  <input
                    className="form-control"
                    data-testid="profile-leetcode-input"
                    placeholder="e.g. krishna_k3"
                    value={form.leetcodeUsername || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        leetcodeUsername: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* SOCIAL & CONTACT */}
            <div className="card shadow-sm border-0 bg-white p-4 mb-4">
              <div className="profile-section-header mb-3">
                <FiLinkedin size={18} />
                <h6 className="m-0">Social &amp; Contact Links</h6>
              </div>

              <div className="row g-3">
                {/* LinkedIn */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    <FiLinkedin size={14} className="me-1 text-primary" />
                    LinkedIn URL
                  </label>
                  <input
                    className="form-control"
                    data-testid="profile-linkedin-input"
                    placeholder="https://linkedin.com/in/username"
                    value={form.linkedinUrl || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        linkedinUrl: e.target.value,
                      })
                    }
                  />

                  {form.linkedinUrl && (
                    <a
                      href={form.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="small text-primary mt-1 d-inline-block fw-semibold"
                      data-testid="profile-linkedin-link"
                    >
                      ↗ Open LinkedIn Profile
                    </a>
                  )}
                </div>

                {/* Portfolio */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    <FiGlobe size={14} className="me-1 text-success" />
                    Portfolio URL
                  </label>
                  <input
                    className="form-control"
                    data-testid="profile-portfolio-input"
                    placeholder="https://myportfolio.com"
                    value={form.portfolioUrl || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        portfolioUrl: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Twitter */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    <FiTwitter size={14} className="me-1 text-info" />
                    Twitter URL
                  </label>
                  <input
                    className="form-control"
                    data-testid="profile-twitter-input"
                    placeholder="https://twitter.com/username"
                    value={form.twitterUrl || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        twitterUrl: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Website */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    <FiGlobe size={14} className="me-1 text-secondary" />
                    Website
                  </label>
                  <input
                    className="form-control"
                    data-testid="profile-website-input"
                    placeholder="https://example.com"
                    value={form.website || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        website: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    <FiPhone size={14} className="me-1 text-muted" />
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    data-testid="profile-phone-input"
                    placeholder="+91 98765 43210"
                    value={form.phone || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* SAVE BUTTON */}
            <button
              type="submit"
              className="btn btn-primary fw-bold"
              data-testid="profile-save-button"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </form>
        </div>

        {/* SIDEBAR */}
        <div className="col-lg-4">
          {/* AVATAR / USER CARD */}
          <div
            className="card shadow-sm border-0 bg-white p-4 text-center mb-4"
            data-testid="profile-user-card"
          >
            <div className="profile-avatar-lg mx-auto mb-3">
              {form.name?.[0]?.toUpperCase() || "D"}
            </div>

            <h5 className="fw-bold mb-0 text-dark" data-testid="profile-display-name">
              {form.name || "Developer"}
            </h5>

            <p className="text-muted small mt-1 mb-1" data-testid="profile-display-email">
              {form.email}
            </p>

            {form.location && (
              <p className="text-muted small mb-0" data-testid="profile-display-location">
                📍 {form.location}
              </p>
            )}
          </div>

          {/* PROFILE STRENGTH */}
          <div className="card shadow-sm border-0 bg-white p-4 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <FiCheckSquare className="text-purple fs-5" />
                <h6 className="m-0 fw-semibold text-dark">Profile Strength</h6>
              </div>
              <span className="badge bg-purple-subtle text-purple border border-purple">
                {profileStrength}%
              </span>
            </div>

            <div className="progress mb-3" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-purple"
                style={{ width: `${profileStrength}%` }}
                aria-valuenow={profileStrength}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>

            {suggestions.length > 0 ? (
              <div>
                <span className="extra-small text-muted fw-semibold uppercase tracking-wider mb-2 d-block">
                  Suggestions:
                </span>
                <ul className="list-unstyled extra-small text-muted mb-0 d-flex flex-column gap-1">
                  {suggestions.slice(0, 3).map((sug, i) => (
                    <li key={i} className="d-flex align-items-start gap-1">
                      <span className="text-warning">⚠</span> {sug}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <span className="extra-small text-success fw-semibold">
                ✓ All essential profile sections complete!
              </span>
            )}
          </div>

          {/* CONNECTION STATUS */}
          <div
            className="card shadow-sm border-0 bg-white p-4 mb-4"
            data-testid="profile-connection-status"
          >
            <h6 className="mb-3 fw-semibold text-dark">Connection Status</h6>

            <div className="d-flex flex-column gap-2">
              <ConnectionStatus
                label="GitHub"
                value={form.githubUsername}
                icon={FiGithub}
                color="blue"
                testId="profile-github-status"
              />

              <ConnectionStatus
                label="LeetCode"
                value={form.leetcodeUsername}
                icon={FiCode}
                color="orange"
                testId="profile-leetcode-status"
              />

              <ConnectionStatus
                label="LinkedIn"
                value={form.linkedinUrl}
                icon={FiLinkedin}
                color="blue"
                testId="profile-linkedin-status"
              />

              <ConnectionStatus
                label="Portfolio"
                value={form.portfolioUrl}
                icon={FiGlobe}
                color="green"
                testId="profile-portfolio-status"
              />
            </div>
          </div>

          {/* DEVELOPER IDENTITY MAP */}
          <div className="card shadow-sm border-0 bg-white p-4 mb-4">
            <h6 className="mb-2 fw-semibold text-dark">Your Developer Identity</h6>
            <p className="extra-small text-muted mb-3">
              DevBoard centralizes your developer presence across all platforms:
            </p>
            <div className="identity-flow-card">
              <span className="badge bg-primary mb-2">DevBoard Core</span>
              <div>
                <span className="identity-node">GitHub</span>
                <span className="identity-node">LeetCode</span>
                <span className="identity-node">LinkedIn</span>
              </div>
              <div className="mt-1">
                <span className="identity-node">Resume</span>
                <span className="identity-node">Portfolio</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div
            className="card shadow-sm border-0 bg-white p-4 mb-4"
            data-testid="profile-quick-links"
          >
            <h6 className="mb-3 fw-semibold text-dark">Quick Links</h6>

            <div className="d-flex flex-column gap-2">
              <Link
                to="/linkedin"
                className="btn btn-light btn-sm text-start fw-semibold"
                data-testid="profile-linkedin-quick-link"
              >
                <FiLinkedin className="me-2 text-primary" />
                LinkedIn Profile
              </Link>

              <Link
                to="/github"
                className="btn btn-light btn-sm text-start fw-semibold"
                data-testid="profile-github-quick-link"
              >
                <FiGithub className="me-2 text-dark" />
                GitHub Stats
              </Link>

              <Link
                to="/leetcode"
                className="btn btn-light btn-sm text-start fw-semibold"
                data-testid="profile-leetcode-quick-link"
              >
                <FiCode className="me-2 text-warning" />
                LeetCode Stats
              </Link>
            </div>
          </div>

          {/* DANGER ZONE */}
          <div
            className="card shadow-sm border-0 bg-white p-4"
            data-testid="profile-account-section"
          >
            <h6 className="text-danger mb-2 fw-semibold">Account</h6>

            <p className="text-muted small mb-3">
              Sign out securely from this device.
            </p>

            <button
              className="btn btn-outline-danger btn-sm fw-semibold"
              data-testid="profile-signout-button"
              onClick={() => {
                logout();
                nav("/login");
              }}
            >
              <FiLogOut className="me-1" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}