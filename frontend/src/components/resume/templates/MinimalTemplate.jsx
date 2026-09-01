import React from 'react';

/**
 * Template 3: Minimal
 * Clean single-column layout with high contrast and whitespace optimization.
 */
const MinimalTemplate = ({ data }) => {
  const {
    personalInfo = {},
    summary = '',
    skills = [],
    experience = [],
    projects = [],
    education = [],
    certifications = [],
    achievements = [],
    languages = [],
    sectionOrder = [],
  } = data || {};

  const renderSection = (sectionKey) => {
    switch (sectionKey) {
      case 'summary':
        if (!summary) return null;
        return (
          <div key="summary" className="template-section mb-4">
            <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2">Summary</h6>
            <p className="small text-muted mb-0">{summary}</p>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="template-section mb-4">
            <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2">Skills</h6>
            {skills.map((cat, idx) => (
              <div key={idx} className="small mb-1">
                <span className="fw-bold">{cat.category}: </span>
                <span className="text-muted">{Array.isArray(cat.items) ? cat.items.join(', ') : cat.items}</span>
              </div>
            ))}
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="template-section mb-4">
            <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2">Experience</h6>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <div className="d-flex justify-content-between small fw-bold">
                  <span>{exp.jobTitle} — {exp.company}</span>
                  <span className="text-muted">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.responsibilities && <p className="small text-muted mb-0">{exp.responsibilities}</p>}
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="template-section mb-4">
            <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2">Projects</h6>
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-3">
                <div className="d-flex justify-content-between small fw-bold">
                  <span>{proj.name}</span>
                  <span className="text-muted">{proj.startDate} - {proj.endDate}</span>
                </div>
                {proj.technologies && <div className="small text-secondary">Tech: {proj.technologies}</div>}
                {proj.description && <p className="small text-muted mb-0">{proj.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="template-section mb-4">
            <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2">Education</h6>
            {education.map((edu, idx) => (
              <div key={idx} className="d-flex justify-content-between small mb-1">
                <span><strong>{edu.degree}</strong> ({edu.institution})</span>
                <span className="text-muted">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="template-section mb-4">
            <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2">Certifications</h6>
            {certifications.map((c, idx) => (
              <div key={idx} className="small mb-1"><strong>{c.name}</strong> — {c.organization}</div>
            ))}
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="template-section mb-4">
            <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2">Achievements</h6>
            {achievements.map((a, idx) => (
              <div key={idx} className="small mb-1"><strong>{a.title}:</strong> {a.description}</div>
            ))}
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="template-section mb-4">
            <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2">Languages</h6>
            <div className="small text-muted">
              {languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const defaultOrder = ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'achievements', 'languages'];
  const activeOrder = sectionOrder && sectionOrder.length > 0 ? sectionOrder : defaultOrder;

  return (
    <div className="ats-template minimal-container p-4 bg-white text-dark shadow-sm rounded">
      <div className="mb-4">
        <h1 className="h3 fw-light text-dark mb-1">{personalInfo.name || 'YOUR NAME'}</h1>
        <div className="text-muted small fw-medium mb-2">{data.targetRole || personalInfo.title || 'Developer'}</div>
        <div className="d-flex flex-wrap gap-3 small text-secondary">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {activeOrder.map((sectionKey) => renderSection(sectionKey))}
    </div>
  );
};

export default MinimalTemplate;
