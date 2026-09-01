import React from 'react';
import { FiBook, FiPlus, FiEdit3 } from 'react-icons/fi';

const EducationSection = ({ education = [], onOpenEditModal }) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Education</h3>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenEditModal}
        >
          <FiEdit3 /> Manage Education
        </button>
      </div>

      {!education || education.length === 0 ? (
        <div className="text-center py-4 bg-light rounded border">
          <FiBook className="fs-1 text-muted mb-2" />
          <p className="text-muted small mb-2">No education entries added.</p>
          <button type="button" className="btn btn-sm btn-primary" onClick={onOpenEditModal}>
            <FiPlus /> Add Education
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {education.map((edu, idx) => (
            <div key={idx} className="p-3 bg-light rounded border">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <div>
                  <h4 className="h6 fw-bold text-dark mb-0">
                    {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                  </h4>
                  <span className="fw-semibold text-secondary small">{edu.institution}</span>
                </div>
                <span className="badge bg-white text-secondary border">
                  {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
                </span>
              </div>
              <div className="d-flex justify-content-between extra-small text-muted mt-2">
                <span>{edu.location ? `📍 ${edu.location}` : ''}</span>
                {edu.cgpa && <strong className="text-dark">CGPA/Score: {edu.cgpa}</strong>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationSection;
