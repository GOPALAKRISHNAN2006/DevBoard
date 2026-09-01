import React from 'react';
import { FiFileText, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const ResumeGithubComparison = ({ resumeMatches = [] }) => {
  if (!resumeMatches || resumeMatches.length === 0) return null;

  const matchedCount = resumeMatches.filter((r) => r.isConnected).length;
  const totalResumeProjects = resumeMatches.length;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiFileText className="text-primary fs-5" />
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Resume ↔ GitHub Integration</h3>
        </div>
        <span className="badge bg-light text-secondary border">
          {matchedCount} of {totalResumeProjects} Resume Projects Linked
        </span>
      </div>

      <div className="p-3 bg-light rounded border mb-3 small text-secondary">
        <span>Your resume contains <strong>{totalResumeProjects}</strong> project entries. </span>
        <span>
          {matchedCount === totalResumeProjects ? (
            <strong className="text-success">All resume projects have matching GitHub repositories!</strong>
          ) : (
            <strong className="text-warning">
              {totalResumeProjects - matchedCount} project(s) missing matching GitHub links.
            </strong>
          )}
        </span>
      </div>

      <div className="d-flex flex-column gap-2">
        {resumeMatches.map((item, idx) => (
          <div key={idx} className="d-flex align-items-center justify-content-between p-2 px-3 bg-white rounded border small">
            <div className="d-flex align-items-center gap-2">
              {item.isConnected ? (
                <FiCheckCircle className="text-success" />
              ) : (
                <FiAlertCircle className="text-warning" />
              )}
              <span className="fw-semibold text-dark">{item.resumeProject}</span>
            </div>

            {item.isConnected ? (
              <span className="badge bg-success-subtle text-success border">
                ✓ {item.matchedRepo}
              </span>
            ) : (
              <span className="badge bg-warning-subtle text-warning border">
                ⚠ Repository Not Linked
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeGithubComparison;
