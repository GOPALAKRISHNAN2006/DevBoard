import React from 'react';
import { FiEdit3, FiZap } from 'react-icons/fi';

const ProfessionalHeadline = ({ headline = '', suggestions = [], onOpenEditModal, onApplyHeadline }) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Professional Headline</h3>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenEditModal}
        >
          <FiEdit3 /> Edit Headline
        </button>
      </div>

      <div className="p-3 bg-light rounded border mb-3">
        <span className="fw-semibold text-dark fs-6">{headline || 'No headline specified yet.'}</span>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div>
          <div className="d-flex align-items-center gap-1 text-primary small fw-bold mb-2">
            <FiZap /> Headline Suggestions (Based on Your Skills):
          </div>
          <div className="d-flex flex-column gap-2">
            {suggestions.map((sug, idx) => (
              <div
                key={idx}
                className="d-flex align-items-center justify-content-between p-2 bg-primary-subtle rounded small"
              >
                <span className="text-dark fw-medium">{sug}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-primary py-0 px-2 fw-semibold"
                  style={{ fontSize: '0.75rem' }}
                  onClick={() => onApplyHeadline(sug)}
                >
                  Use Suggestion
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalHeadline;
