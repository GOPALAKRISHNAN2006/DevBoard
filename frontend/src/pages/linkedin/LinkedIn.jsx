import { useEffect, useState } from "react";
import {
  FiLinkedin, FiExternalLink, FiUser, FiBriefcase,
  FiBook, FiAward, FiCode, FiMapPin, FiEdit
} from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import "./LinkedIn.css";

export default function LinkedIn() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/linkedin/profile")
      .then(r => setProfile(r.data))
      .catch(() => setProfile({}))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Layout><Loader /></Layout>;

  const hasLinkedIn = !!profile?.linkedinUrl;
  const hasSummary = !!profile?.summary;
  const hasExperience = profile?.experience?.length > 0;
  const hasEducation = profile?.education?.length > 0;
  const hasSkills = profile?.skills?.length > 0;
  const hasCerts = profile?.certifications?.length > 0;

  return (
    <Layout>
      <div className="section-head">
        <div>
          <h1 className="page-title">LinkedIn</h1>
          <p className="page-subtitle">Your professional presence, powered by DevBoard.</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/resume" className="btn btn-light btn-sm">
            <FiEdit /> Edit Resume
          </Link>
          {hasLinkedIn && (
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              <FiLinkedin /> Open LinkedIn Profile
            </a>
          )}
        </div>
      </div>

      {/* Profile Banner */}
      <div className="linkedin-banner card mb-4">
        <div className="linkedin-cover" />
        <div className="linkedin-profile-row">
          <div className="linkedin-avatar">
            {profile?.avatar
              ? <img src={profile.avatar} alt={profile.name} />
              : <span>{profile?.name?.[0]?.toUpperCase() || "D"}</span>
            }
          </div>
          <div className="linkedin-profile-info">
            <h2 className="linkedin-name">{profile?.name || "Developer"}</h2>
            {profile?.headline && <p className="linkedin-headline">{profile.headline}</p>}
            {profile?.location && (
              <p className="linkedin-location"><FiMapPin /> {profile.location}</p>
            )}
            {!hasLinkedIn && (
              <div className="linkedin-url-hint">
                <span>💡 Add your LinkedIn URL in <Link to="/profile"><strong>Profile Settings</strong></Link> to enable the Open Profile button.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* About / Summary */}
        <div className="col-12">
          <div className="card p-4">
            <div className="linkedin-section-header">
              <FiUser className="linkedin-section-icon blue" />
              <h5>About</h5>
            </div>
            {hasSummary ? (
              <p className="linkedin-summary mt-2">{profile.summary}</p>
            ) : (
              <div className="linkedin-empty-section">
                <p className="text-muted small mb-2">No summary added yet. Add one in your Resume Builder to show it here.</p>
                <Link to="/resume" className="btn btn-light btn-sm"><FiEdit /> Add Summary</Link>
              </div>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="col-lg-6">
          <div className="card p-4 h-100">
            <div className="linkedin-section-header">
              <FiBriefcase className="linkedin-section-icon purple" />
              <h5>Experience</h5>
            </div>
            {hasExperience ? (
              <div className="timeline mt-3">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-body">
                      <strong>{exp.title || exp.role}</strong>
                      <p className="timeline-sub">{exp.company}</p>
                      {exp.duration && <span className="timeline-date">{exp.duration}</span>}
                      {exp.description && <p className="timeline-desc">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="linkedin-empty-section mt-3">
                <p className="text-muted small mb-2">No experience added. Add your work history in the Resume Builder.</p>
                <Link to="/resume" className="btn btn-light btn-sm"><FiEdit /> Add Experience</Link>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="col-lg-6">
          <div className="card p-4 h-100">
            <div className="linkedin-section-header">
              <FiBook className="linkedin-section-icon orange" />
              <h5>Education</h5>
            </div>
            {hasEducation ? (
              <div className="timeline mt-3">
                {profile.education.map((edu, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-body">
                      <strong>{edu.degree}</strong>
                      <p className="timeline-sub">{edu.institute || edu.institution}</p>
                      {edu.year && <span className="timeline-date">Class of {edu.year}</span>}
                      {edu.cgpa && <p className="timeline-desc">CGPA: {edu.cgpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="linkedin-empty-section mt-3">
                <p className="text-muted small mb-2">No education added. Add your degrees in the Resume Builder.</p>
                <Link to="/resume" className="btn btn-light btn-sm"><FiEdit /> Add Education</Link>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {hasSkills && (
          <div className="col-lg-6">
            <div className="card p-4 h-100">
              <div className="linkedin-section-header">
                <FiCode className="linkedin-section-icon green" />
                <h5>Skills</h5>
              </div>
              <div className="skills-grid mt-3">
                {profile.skills.map((skill, i) => (
                  <span key={i} className="skill-chip">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasCerts && (
          <div className="col-lg-6">
            <div className="card p-4 h-100">
              <div className="linkedin-section-header">
                <FiAward className="linkedin-section-icon orange" />
                <h5>Certifications</h5>
              </div>
              <div className="certs-list mt-3">
                {profile.certifications.map((cert, i) => (
                  <div key={i} className="cert-item">
                    <div>
                      <strong>{cert.title || cert.name}</strong>
                      <p className="cert-issuer">{cert.issuer}</p>
                    </div>
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="cert-link">
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
