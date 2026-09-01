import React from 'react';

/**
 * Template 1: ATS Classic
 * Single-page optimized monochrome layout with strict visual hierarchy.
 */
const ATSClassicTemplate = ({ data }) => {
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
          <div key="summary" className="template-section mb-2">
            <h2 className="classic-heading">Professional Summary</h2>
            <p className="mb-0 text-justify">{summary}</p>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="template-section mb-2">
            <h2 className="classic-heading">Technical Skills</h2>
            <div className="d-flex flex-column gap-0">
              {skills.map((cat, idx) => (
                <div key={idx} className="small py-0">
                  <strong className="text-dark">{cat.category || 'Skills'}: </strong>
                  <span className="text-secondary">{Array.isArray(cat.items) ? cat.items.join(', ') : cat.items}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="template-section mb-2">
            <h2 className="classic-heading">Work Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-2">
                <div className="d-flex justify-content-between align-items-baseline">
                  <span className="item-title">{exp.jobTitle || 'Role'} <span className="fw-normal text-muted">@ {exp.company || 'Company'}</span></span>
                  <span className="item-date">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <div className="item-subtitle">{exp.location}</div>}
                {exp.responsibilities && (
                  <p className="mb-0 text-secondary text-justify">{exp.responsibilities}</p>
                )}
                {exp.achievements && (
                  <p className="mb-0 text-dark small text-justify"><strong>Key Achievements: </strong>{exp.achievements}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="template-section mb-2">
            <h2 className="classic-heading">Key Projects</h2>
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-2">
                <div className="d-flex justify-content-between align-items-baseline">
                  <span className="item-title">{proj.name || 'Project Name'}</span>
                  <span className="item-date">{proj.startDate} {proj.endDate ? `- ${proj.endDate}` : ''}</span>
                </div>
                {proj.technologies && (
                  <div className="small text-dark mb-0"><strong>Technologies: </strong>{proj.technologies}</div>
                )}
                {proj.description && <p className="mb-0 text-justify">{proj.description}</p>}
                <div className="small text-muted d-flex gap-3">
                  {proj.githubUrl && <span>GitHub: {proj.githubUrl}</span>}
                  {proj.liveDemoUrl && <span>Live Demo: {proj.liveDemoUrl}</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="template-section mb-2">
            <h2 className="classic-heading">Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-1">
                <div className="d-flex justify-content-between align-items-baseline">
                  <span className="item-title">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</span>
                  <span className="item-date">{edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}</span>
                </div>
                <div className="d-flex justify-content-between small text-secondary">
                  <span>{edu.institution} {edu.location ? `(${edu.location})` : ''}</span>
                  {edu.cgpa && <span className="fw-semibold text-dark">CGPA/Score: {edu.cgpa}</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="template-section mb-2">
            <h2 className="classic-heading">Certifications</h2>
            {certifications.map((cert, idx) => (
              <div key={idx} className="d-flex justify-content-between small mb-0 py-0">
                <span><strong>{cert.name}</strong> — {cert.organization}</span>
                <span className="item-date">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="template-section mb-2">
            <h2 className="classic-heading">Achievements & Honors</h2>
            {achievements.map((ach, idx) => (
              <div key={idx} className="mb-1 text-justify">
                <strong className="text-dark">{ach.title}: </strong>
                <span className="text-secondary">{ach.description}</span>
                {ach.date && <span className="item-date ms-1">({ach.date})</span>}
              </div>
            ))}
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="template-section mb-2">
            <h2 className="classic-heading">Languages</h2>
            <div className="d-flex flex-wrap gap-3 small">
              {languages.map((lang, idx) => (
                <span key={idx}><strong>{lang.language}: </strong>{lang.proficiency}</span>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const defaultOrder = [
    'summary',
    'skills',
    'experience',
    'projects',
    'education',
    'certifications',
    'achievements',
    'languages',
  ];
  const activeOrder = sectionOrder && sectionOrder.length > 0 ? sectionOrder : defaultOrder;

  return (
    <div className="ats-template ats-classic-container">
      {/* Header */}
      <div className="text-center border-bottom pb-2 mb-2">
        <h1 className="fw-bold text-uppercase mb-0">{personalInfo.name || 'YOUR FULL NAME'}</h1>
        <div className="fw-semibold text-secondary mb-1">{data.targetRole || personalInfo.title || 'Professional Title'}</div>
        <div className="header-links-container">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span>
              • <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">{personalInfo.linkedin}</a>
            </span>
          )}
          {personalInfo.github && (
            <span>
              • <a href={personalInfo.github} target="_blank" rel="noreferrer">{personalInfo.github}</a>
            </span>
          )}
          {personalInfo.portfolio && (
            <span>
              • <a href={personalInfo.portfolio} target="_blank" rel="noreferrer">{personalInfo.portfolio}</a>
            </span>
          )}
        </div>
      </div>

      {/* Sections dynamically ordered */}
      {activeOrder.map((sectionKey) => renderSection(sectionKey))}
    </div>
  );
};

export default ATSClassicTemplate;
