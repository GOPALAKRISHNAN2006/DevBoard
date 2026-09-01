import React from 'react';
import { FaPlus, FaCopy, FaTrash, FaCheck, FaFileUpload } from 'react-icons/fa';

/**
 * Switcher and Management bar for Multiple Resume Versions with Upload Option
 */
const ResumeVersionSelector = ({
  resumes = [],
  activeResumeId = null,
  onSelectResume,
  onCreateNew,
  onOpenUploadModal,
  onDuplicate,
  onDelete,
}) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header bg-light py-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h6 className="card-title mb-0 fw-bold small text-uppercase">My Resumes ({resumes.length})</h6>
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={onOpenUploadModal}
          >
            <FaFileUpload /> Upload Existing Resume
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={onCreateNew}
          >
            <FaPlus /> Create Blank Resume
          </button>
        </div>
      </div>
      <div className="card-body p-2">
        {resumes.length === 0 ? (
          <div className="text-center py-2 text-muted small">
            No saved resumes found. Click <strong>Upload Existing Resume</strong> or <strong>Create Blank Resume</strong> to get started.
          </div>
        ) : (
          <div className="d-flex flex-wrap gap-2">
            {resumes.map((r) => {
              const isActive = r._id === activeResumeId;
              const score = r.atsScore || 0;
              const scoreBadge =
                score >= 85 ? 'bg-success' : score >= 70 ? 'bg-info' : score >= 50 ? 'bg-warning' : 'bg-secondary';

              return (
                <div
                  key={r._id}
                  className={`p-2 rounded border d-flex align-items-center justify-content-between gap-2 ${
                    isActive ? 'border-primary bg-primary-subtle' : 'bg-white'
                  }`}
                  style={{ minWidth: '220px', flex: '1 1 220px' }}
                >
                  <div
                    className="flex-grow-1 cursor-pointer"
                    onClick={() => onSelectResume(r._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="fw-bold small text-truncate d-flex align-items-center gap-1">
                      {isActive && <FaCheck className="text-primary flex-shrink-0" />}
                      <span>{r.title || 'Untitled Resume'}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 extra-small mt-1">
                      <span className={`badge ${scoreBadge}`}>ATS: {score}</span>
                      <span className="text-muted">{r.targetRole || 'No Role'}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-1">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm p-1"
                      onClick={() => onDuplicate(r._id)}
                      title="Duplicate Resume Version"
                    >
                      <FaCopy style={{ fontSize: '12px' }} />
                    </button>
                    {resumes.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm p-1"
                        onClick={() => onDelete(r._id)}
                        title="Delete Resume"
                      >
                        <FaTrash style={{ fontSize: '12px' }} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeVersionSelector;
