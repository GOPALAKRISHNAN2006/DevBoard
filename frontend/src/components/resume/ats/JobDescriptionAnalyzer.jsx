import React, { useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';

/**
 * Job Description Analyzer Input Form
 */
const JobDescriptionAnalyzer = ({
  targetRole = '',
  onTargetRoleChange,
  onAnalyze,
  loading = false,
}) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAnalyze) {
      onAnalyze(jobDescription);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white py-2">
        <h6 className="card-title mb-0 fw-bold small text-uppercase d-flex align-items-center gap-2">
          <FaSearch /> Analyze Against Job Description
        </h6>
      </div>
      <div className="card-body p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Target Job Role</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="e.g. Frontend Developer, React Developer, Full Stack Developer"
              value={targetRole}
              onChange={(e) => onTargetRoleChange(e.target.value)}
            />
            <div className="form-text extra-small">Used for role-specific ATS skill taxonomy matching.</div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Job Description</label>
            <textarea
              className="form-control form-control-sm"
              rows="5"
              placeholder="Paste job description text here to compare keywords, skills, and compute compatibility score..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-sm w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
            disabled={loading || !jobDescription.trim()}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner-border spinner-border-sm" /> Analyzing Job Match...
              </>
            ) : (
              <>
                <FaSearch /> Analyze Resume Against Job
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDescriptionAnalyzer;
