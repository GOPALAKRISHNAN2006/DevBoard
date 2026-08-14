import { useEffect, useState } from "react";
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

  const ConnectionStatus = ({
    label,
    value,
    icon: Icon,
    color,
    testId,
  }) => (
    <div
      className="connection-item"
      data-testid={testId}
    >
      <div className={`connection-icon ${color}`}>
        <Icon size={16} />
      </div>

      <div className="connection-info">
        <span className="connection-label">
          {label}
        </span>

        <span
          className={`connection-status ${
            value ? "connected" : "missing"
          }`}
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

  return (
    <Layout>

      {/* ================================================== */}
      {/* PAGE HEADER */}
      {/* ================================================== */}

      <div className="section-head">
        <div>
          <h1
            className="page-title"
            data-testid="profile-page-title"
          >
            Profile Settings
          </h1>

          <p
            className="page-subtitle"
            data-testid="profile-page-subtitle"
          >
            Manage your identity across GitHub, LeetCode,
            LinkedIn and more.
          </p>
        </div>
      </div>

      <div className="row g-4">

        {/* ================================================== */}
        {/* MAIN FORM */}
        {/* ================================================== */}

        <div className="col-lg-8">

          <form
            onSubmit={save}
            data-testid="profile-form"
          >

            {/* ================================================== */}
            {/* PERSONAL INFORMATION */}
            {/* ================================================== */}

            <div className="card p-4 mb-4">

              <div className="profile-section-header mb-3">
                <FiUser size={16} />

                <h6 className="m-0">
                  Personal Information
                </h6>
              </div>

              <div className="row g-3">

                {/* Full Name */}

                <div className="col-md-6">
                  <label className="form-label">
                    Full Name
                  </label>

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
                  <label className="form-label">
                    Email address
                  </label>

                  <input
                    disabled
                    className="form-control"
                    data-testid="profile-email-input"
                    value={form.email || ""}
                  />
                </div>

                {/* Location */}

                <div className="col-md-6">
                  <label className="form-label">
                    Location
                  </label>

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
                  <label className="form-label">
                    Skills{" "}
                    <span className="text-muted">
                      (comma separated)
                    </span>
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

                {/* Bio */}

                <div className="col-12">
                  <label className="form-label">
                    Bio
                  </label>

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

            {/* ================================================== */}
            {/* INTEGRATIONS */}
            {/* ================================================== */}

            <div className="card p-4 mb-4">

              <div className="profile-section-header mb-3">
                <FiCode size={16} />

                <h6 className="m-0">
                  Integrations
                </h6>
              </div>

              <p className="text-muted small mb-3">
                These usernames power your GitHub repos,
                LeetCode stats, and dashboard widgets.
              </p>

              <div className="row g-3">

                {/* GitHub */}

                <div className="col-md-6">
                  <label className="form-label">
                    <FiGithub
                      size={14}
                      className="me-1"
                    />
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
                  <label className="form-label">
                    <FiCode
                      size={14}
                      className="me-1"
                    />
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

            {/* ================================================== */}
            {/* SOCIAL & CONTACT */}
            {/* ================================================== */}

            <div className="card p-4 mb-4">

              <div className="profile-section-header mb-3">
                <FiLinkedin size={16} />

                <h6 className="m-0">
                  Social &amp; Contact
                </h6>
              </div>

              <div className="row g-3">

                {/* LinkedIn */}

                <div className="col-md-6">
                  <label className="form-label">
                    <FiLinkedin
                      size={14}
                      className="me-1 text-primary"
                    />
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
                      className="small text-primary mt-1 d-inline-block"
                      data-testid="profile-linkedin-link"
                    >
                      ↗ Open LinkedIn Profile
                    </a>
                  )}
                </div>

                {/* Portfolio */}

                <div className="col-md-6">
                  <label className="form-label">
                    <FiGlobe
                      size={14}
                      className="me-1"
                    />
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
                  <label className="form-label">
                    <FiTwitter
                      size={14}
                      className="me-1"
                    />
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
                  <label className="form-label">
                    <FiGlobe
                      size={14}
                      className="me-1"
                    />
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
                  <label className="form-label">
                    <FiPhone
                      size={14}
                      className="me-1"
                    />
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

            {/* ================================================== */}
            {/* SAVE BUTTON */}
            {/* ================================================== */}

            <button
              type="submit"
              className="btn btn-primary"
              data-testid="profile-save-button"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>

          </form>
        </div>

        {/* ================================================== */}
        {/* SIDEBAR */}
        {/* ================================================== */}

        <div className="col-lg-4">

          {/* ================================================== */}
          {/* AVATAR / USER CARD */}
          {/* ================================================== */}

          <div
            className="card p-4 text-center mb-4"
            data-testid="profile-user-card"
          >
            <div className="profile-avatar-lg mx-auto mb-3">
              {form.name?.[0]?.toUpperCase() || "D"}
            </div>

            <h5
              className="fw-bold mb-0"
              data-testid="profile-display-name"
            >
              {form.name || "Developer"}
            </h5>

            <p
              className="text-muted small mt-1"
              data-testid="profile-display-email"
            >
              {form.email}
            </p>

            {form.location && (
              <p
                className="text-muted small mb-0"
                data-testid="profile-display-location"
              >
                📍 {form.location}
              </p>
            )}
          </div>

          {/* ================================================== */}
          {/* CONNECTION STATUS */}
          {/* ================================================== */}

          <div
            className="card p-4 mb-4"
            data-testid="profile-connection-status"
          >
            <h6 className="mb-3 fw-semibold">
              Connection Status
            </h6>

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

          {/* ================================================== */}
          {/* QUICK LINKS */}
          {/* ================================================== */}

          <div
            className="card p-4 mb-4"
            data-testid="profile-quick-links"
          >
            <h6 className="mb-3 fw-semibold">
              Quick Links
            </h6>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/linkedin"
                className="btn btn-light btn-sm text-start"
                data-testid="profile-linkedin-quick-link"
              >
                <FiLinkedin className="me-2" />
                LinkedIn Profile
              </Link>

              <Link
                to="/github"
                className="btn btn-light btn-sm text-start"
                data-testid="profile-github-quick-link"
              >
                <FiGithub className="me-2" />
                GitHub Stats
              </Link>

              <Link
                to="/leetcode"
                className="btn btn-light btn-sm text-start"
                data-testid="profile-leetcode-quick-link"
              >
                <FiCode className="me-2" />
                LeetCode Stats
              </Link>

            </div>
          </div>

          {/* ================================================== */}
          {/* DANGER ZONE */}
          {/* ================================================== */}

          <div
            className="card p-4"
            data-testid="profile-account-section"
          >
            <h6 className="text-danger mb-2">
              Account
            </h6>

            <p className="text-muted small mb-3">
              Sign out securely from this device.
            </p>

            <button
              className="btn btn-outline-danger btn-sm"
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