import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';

/**
 * Matched vs Missing Keywords component with safety notice
 */
const KeywordMatch = ({ matched = [], missing = [], matchPercentage = 0 }) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header bg-light py-2 d-flex justify-content-between align-items-center">
        <h6 className="card-title mb-0 fw-bold small text-uppercase">Keyword Match Analysis</h6>
        <span className="badge bg-primary fs-6">{matchPercentage}% Match</span>
      </div>
      <div className="card-body p-3">
        {/* Safety Warning Header */}
        <div className="alert alert-warning py-2 px-3 small d-flex align-items-start gap-2 mb-3">
          <FaShieldAlt className="mt-1 text-warning flex-shrink-0" />
          <div>
            <strong>Keyword Integrity Safety Notice:</strong>
            <div className="text-secondary mt-1">
              Consider adding missing keywords <em>only if you have genuine experience</em> with them. Never fabricate skills or qualifications to bypass ATS filters.
            </div>
          </div>
        </div>

        {/* Matched Keywords */}
        <div className="mb-3">
          <h6 className="small fw-bold text-success d-flex align-items-center gap-1 mb-2">
            <FaCheckCircle /> Matched Keywords ({matched.length})
          </h6>
          {matched.length > 0 ? (
            <div className="d-flex flex-wrap gap-1">
              {matched.map((kw, idx) => (
                <span key={idx} className="badge bg-success-subtle text-success border border-success small">
                  ✓ {kw}
                </span>
              ))}
            </div>
          ) : (
            <div className="small text-muted italic">No matched keywords yet. Paste a job description to analyze.</div>
          )}
        </div>

        {/* Missing Keywords */}
        <div>
          <h6 className="small fw-bold text-danger d-flex align-items-center gap-1 mb-2">
            <FaExclamationTriangle /> Missing Keywords ({missing.length})
          </h6>
          {missing.length > 0 ? (
            <div className="d-flex flex-wrap gap-1">
              {missing.map((kw, idx) => (
                <span key={idx} className="badge bg-danger-subtle text-danger border border-danger small">
                  ⚠ {kw}
                </span>
              ))}
            </div>
          ) : (
            <div className="small text-muted italic">No missing keywords identified.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeywordMatch;
