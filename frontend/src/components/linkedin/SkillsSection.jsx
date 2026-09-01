import React from 'react';
import { FiCode, FiPlus, FiEdit3 } from 'react-icons/fi';

const SkillsSection = ({ skills = [], onOpenEditModal }) => {
  const totalSkills = skills.reduce((acc, cat) => acc + (cat.items ? cat.items.length : 0), 0);

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Professional Skills</h3>
          <span className="badge bg-primary-subtle text-primary">{totalSkills} Skills</span>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenEditModal}
        >
          <FiEdit3 /> Manage Skills
        </button>
      </div>

      {!skills || skills.length === 0 ? (
        <div className="text-center py-4 bg-light rounded border">
          <FiCode className="fs-1 text-muted mb-2" />
          <p className="text-muted small mb-2">No skills added yet.</p>
          <button type="button" className="btn btn-sm btn-primary" onClick={onOpenEditModal}>
            <FiPlus /> Add Skills
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {skills.map((cat, idx) => (
            <div key={idx} className="p-3 bg-light rounded border">
              <span className="fw-bold text-dark small d-block mb-2">{cat.category || 'Technical Skills'}</span>
              <div className="d-flex flex-wrap gap-2">
                {Array.isArray(cat.items) &&
                  cat.items.map((item, sIdx) => (
                    <span key={sIdx} className="badge bg-white text-dark border shadow-xs py-2 px-3 fw-medium">
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
