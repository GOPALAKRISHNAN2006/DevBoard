import React from 'react';

/**
 * Template 4: Fresher / Student
 * Optimized for entry-level developers and students by prioritizing Education and Projects first.
 */
const FresherStudentTemplate = ({ data }) => {
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
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="template-section mb-3">
            <h2 className="classic-heading text-uppercase border-bottom border-secondary pb-1 mb-2">Education & Academics</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="d-flex justify-content-between align-items-baseline fw-bold">
                  <span>{edu.degree} {edu.field ? `(${edu.field})` : ''}</span>
                  <span className="small text-muted">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span>{edu.institution} {edu.location ? `— ${edu.location}` : ''}</span>
                  {edu.cgpa && <span className="fw-semibold text-primary">CGPA: {edu.cgpa}</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="template-section mb-3">
            <h2 className="classic-heading text-uppercase border-bottom border-secondary pb-1 mb-2">Academic & Personal Projects</h2>
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-3">
                <div className="d-flex justify-content-between align-items-baseline fw-bold">
                  <span>{proj.name}</span>
                  <span className="small text-muted">{proj.startDate} - {proj.endDate}</span>
                </div>
                {proj.technologies && <div className="small text-dark mb-1"><strong>Tech Stack:</strong> {proj.technologies}</div>}
                {proj.description && <p className="small mb-1">{proj.description}</p>}
                <div className="small text-muted">
                  {proj.githubUrl && <span className="me-3">Repo: {proj.githubUrl}</span>}
                  {proj.liveDemoUrl && <span>Demo: {proj.liveDemoUrl}</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="template-section mb-3">
            <h2 className="classic-heading text-uppercase border-bottom border-secondary pb-1 mb-2">Technical Skills</h2>
            {skills.map((cat, idx) => (
              <div key={idx} className="small mb-1">
                <strong>{cat.category}: </strong>
                <span>{Array.isArray(cat.items) ? cat.items.join(', ') : cat.items}</span>
              </div>
            ))}
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key="summary" className="template-section mb-3">
            <h2 className="classic-heading text-uppercase border-bottom border-secondary pb-1 mb-2">Career Objective / Summary</h2>
            <p className="small mb-0 text-justify">{summary}</p>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="template-section mb-3">
            <h2 className="classic-heading text-uppercase border-bottom border-secondary pb-1 mb-2">Internships / Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-2">
                <div className="d-flex justify-content-between align-items-baseline fw-bold">
                  <span>{exp.jobTitle} @ {exp.company}</span>
                  <span className="small text-muted">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.responsibilities && <p className="small text-secondary mb-0">{exp.responsibilities}</p>}
              </div>
            ))}
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="template-section mb-3">
            <h2 className="classic-heading text-uppercase border-bottom border-secondary pb-1 mb-2">Certifications & Courses</h2>
            {certifications.map((c, idx) => (
              <div key={idx} className="d-flex justify-content-between small mb-1">
                <span><strong>{c.name}</strong> — {c.organization}</span>
                <span className="text-muted">{c.issueDate}</span>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="template-section mb-3">
            <h2 className="classic-heading text-uppercase border-bottom border-secondary pb-1 mb-2">Achievements & Competitions</h2>
            {achievements.map((a, idx) => (
              <div key={idx} className="small mb-1">
                <strong>{a.title}: </strong><span>{a.description}</span>
              </div>
            ))}
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="template-section mb-3">
            <h2 className="classic-heading text-uppercase border-bottom border-secondary pb-1 mb-2">Languages</h2>
            <div className="small">
              {languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Default ordering for student: Education & Projects first
  const defaultStudentOrder = ['education', 'projects', 'skills', 'summary', 'experience', 'certifications', 'achievements', 'languages'];
  const activeOrder = sectionOrder && sectionOrder.length > 0 ? sectionOrder : defaultStudentOrder;

  return (
    <div className="ats-template fresher-student-container p-4 bg-white text-dark shadow-sm rounded">
      <div className="text-center border-bottom pb-2 mb-3">
        <h1 className="h3 fw-bold text-uppercase mb-1">{personalInfo.name || 'STUDENT NAME'}</h1>
        <div className="text-muted small fw-semibold mb-2">{data.targetRole || personalInfo.title || 'Entry Level Software Engineer'}</div>
        <div className="d-flex flex-wrap justify-content-center gap-2 small text-secondary">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </div>

      {activeOrder.map((sectionKey) => renderSection(sectionKey))}
    </div>
  );
};

export default FresherStudentTemplate;
