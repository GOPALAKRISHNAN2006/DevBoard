import React from 'react';
import { FiBriefcase, FiPlus, FiEdit3 } from 'react-icons/fi';

const ExperienceTimeline = ({ experience = [], onOpenEditModal }) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Work Experience</h3>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenEditModal}
        >
          <FiEdit3 /> Manage Experience
        </button>
      </div>

      {!experience || experience.length === 0 ? (
        <div className="text-center py-4 bg-light rounded border">
          <FiBriefcase className="fs-1 text-muted mb-2" />
          <p className="text-muted small mb-2">No work experience entries added.</p>
          <button type="button" className="btn btn-sm btn-primary" onClick={onOpenEditModal}>
            <FiPlus /> Add Experience
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {experience.map((exp, idx) => (
            <div key={idx} className="p-3 bg-light rounded border">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <div>
                  <h4 className="h6 fw-bold text-dark mb-0">{exp.jobTitle || 'Role'}</h4>
                  <span className="fw-semibold text-primary small">{exp.company || 'Company'}</span>
                </div>
                <span className="badge bg-white text-secondary border">
                  {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate || 'Present'}
                </span>
              </div>
              {exp.location && <div className="extra-small text-muted mb-2">{exp.location}</div>}
              {exp.responsibilities && (
                <p className="mb-1 text-secondary small text-justify" style={{ whiteSpace: 'pre-line' }}>
                  {exp.responsibilities}
                </p>
              )}
              {exp.achievements && (
                <div className="extra-small text-dark mt-2 p-2 bg-white rounded border">
                  <strong>Key Achievements: </strong>{exp.achievements}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceTimeline;
