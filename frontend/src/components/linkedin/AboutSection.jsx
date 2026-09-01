import React from 'react';
import { FiEdit3, FiFileText, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const AboutSection = ({ about = '', onOpenEditModal }) => {
  const wordCount = about ? about.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = about ? about.length : 0;

  const hasSkillsMentioned = /(javascript|java|react|node|express|mongodb|sql|html|css|python|c\+\+|spring)/i.test(about);
  const hasAchievementsMentioned = /(built|developed|created|improved|designed|engineered|achieved|awards|finalist)/i.test(about);

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">About / Professional Summary</h3>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenEditModal}
        >
          <FiEdit3 /> Edit About
        </button>
      </div>

      <div className="p-3 bg-light rounded border mb-3">
        {about ? (
          <p className="mb-0 text-secondary text-justify small" style={{ whiteSpace: 'pre-line' }}>
            {about}
          </p>
        ) : (
          <span className="text-muted small">No about summary added yet. Click Edit About to add one.</span>
        )}
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 border-top pt-2 small text-muted">
        <div className="d-flex gap-3">
          <span><FiFileText /> Words: <strong>{wordCount}</strong></span>
          <span>Characters: <strong>{charCount}</strong></span>
        </div>

        <div className="d-flex gap-3">
          {hasSkillsMentioned ? (
            <span className="text-success d-flex align-items-center gap-1"><FiCheckCircle /> Mentions key skills</span>
          ) : (
            <span className="text-warning d-flex align-items-center gap-1"><FiAlertCircle /> Add core technical skills</span>
          )}
          {hasAchievementsMentioned ? (
            <span className="text-success d-flex align-items-center gap-1"><FiCheckCircle /> Highlights achievements</span>
          ) : (
            <span className="text-warning d-flex align-items-center gap-1"><FiAlertCircle /> Mention key achievements</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
