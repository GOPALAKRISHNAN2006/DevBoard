import React from 'react';

/**
 * Template 2: Modern Developer
 * Clean modern design with sleek visual hierarchy, dark accents, and developer aesthetic.
 */
const ModernDeveloperTemplate = ({ data }) => {
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
            <h5 className="text-primary fw-bold border-bottom border-2 border-primary pb-1 mb-2">ABOUT ME</h5>
            <p className="small text-secondary mb-0">{summary}</p>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="template-section mb-4">
            <h5 className="text-primary fw-bold border-bottom border-2 border-primary pb-1 mb-2">SKILLS & TECH STACK</h5>
            <div className="row g-2">
              {skills.map((cat, idx) => (
                <div key={idx} className="col-12 col-md-6 small">
                  <span className="fw-bold text-dark">{cat.category || 'Category'}: </span>
                  <span className="text-muted">{Array.isArray(cat.items) ? cat.items.join(', ') : cat.items}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="template-section mb-4">
            <h5 className="text-primary fw-bold border-bottom border-2 border-primary pb-1 mb-2">EXPERIENCE</h5>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold text-dark mb-0">{exp.jobTitle} <span className="text-primary">@ {exp.company}</span></h6>
                  <span className="badge bg-light text-dark border">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <div className="small text-muted mb-1">{exp.location}</div>}
                {exp.responsibilities && <p className="small text-secondary mb-1">{exp.responsibilities}</p>}
                {exp.achievements && <div className="small text-dark"><strong>Highlights:</strong> {exp.achievements}</div>}
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="template-section mb-4">
            <h5 className="text-primary fw-bold border-bottom border-2 border-primary pb-1 mb-2">FEATURED PROJECTS</h5>
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-3 p-2 bg-light rounded border-start border-3 border-primary">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-bold text-dark">{proj.name}</span>
                  <span className="small text-muted">{proj.startDate} - {proj.endDate}</span>
                </div>
                {proj.technologies && <div className="small text-primary mb-1"><strong>Stack: </strong>{proj.technologies}</div>}
                {proj.description && <p className="small text-secondary mb-1">{proj.description}</p>}
                <div className="small">
                  {proj.githubUrl && <span className="me-3">Code: {proj.githubUrl}</span>}
                  {proj.liveDemoUrl && <span>Demo: {proj.liveDemoUrl}</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="template-section mb-4">
            <h5 className="text-primary fw-bold border-bottom border-2 border-primary pb-1 mb-2">EDUCATION</h5>
            {education.map((edu, idx) => (
              <div key={idx} className="d-flex justify-content-between align-items-baseline mb-2">
                <div>
                  <strong className="text-dark">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</strong>
                  <div className="small text-muted">{edu.institution}</div>
                </div>
                <div className="text-end small">
                  <div className="badge bg-secondary">{edu.startDate} - {edu.endDate}</div>
                  {edu.cgpa && <div className="text-dark font-monospace">CGPA: {edu.cgpa}</div>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="template-section mb-4">
            <h5 className="text-primary fw-bold border-bottom border-2 border-primary pb-1 mb-2">CERTIFICATIONS</h5>
            {certifications.map((cert, idx) => (
              <div key={idx} className="d-flex justify-content-between small mb-1">
                <span><strong>{cert.name}</strong> ({cert.organization})</span>
                <span className="text-muted">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="template-section mb-4">
            <h5 className="text-primary fw-bold border-bottom border-2 border-primary pb-1 mb-2">ACHIEVEMENTS</h5>
            {achievements.map((ach, idx) => (
              <div key={idx} className="small mb-1">
                <strong>{ach.title}:</strong> {ach.description}
              </div>
            ))}
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="template-section mb-4">
            <h5 className="text-primary fw-bold border-bottom border-2 border-primary pb-1 mb-2">LANGUAGES</h5>
            <div className="d-flex gap-3 small">
              {languages.map((l, idx) => (
                <span key={idx}><strong>{l.language}:</strong> {l.proficiency}</span>
              ))}
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
    <div className="ats-template modern-developer-container p-4 bg-white text-dark shadow-sm rounded">
      <div className="p-3 bg-dark text-white rounded mb-4">
        <h2 className="fw-bold mb-0 text-white">{personalInfo.name || 'YOUR NAME'}</h2>
        <div className="text-primary fw-semibold">{data.targetRole || personalInfo.title || 'Software Developer'}</div>
        <div className="d-flex flex-wrap gap-2 small text-light mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.github && <span>| GH: {personalInfo.github}</span>}
          {personalInfo.linkedin && <span>| LI: {personalInfo.linkedin}</span>}
        </div>
      </div>

      {activeOrder.map((sectionKey) => renderSection(sectionKey))}
    </div>
  );
};

export default ModernDeveloperTemplate;
