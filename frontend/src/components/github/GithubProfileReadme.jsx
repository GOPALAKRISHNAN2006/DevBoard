import React from 'react';
import { FiFileText, FiCheckCircle, FiAlertTriangle, FiExternalLink } from 'react-icons/fi';

const GithubProfileReadme = ({ hasProfileReadme = false, profileReadmeUrl = '', username = '' }) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiFileText className="text-primary fs-5" />
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">GitHub Profile README</h3>
        </div>
        {hasProfileReadme ? (
          <span className="badge bg-success-subtle text-success border d-inline-flex align-items-center gap-1">
            <FiCheckCircle /> Profile README Detected
          </span>
        ) : (
          <span className="badge bg-warning-subtle text-warning border d-inline-flex align-items-center gap-1">
            <FiAlertTriangle /> Not Detected
          </span>
        )}
      </div>

      <div className="p-3 bg-light rounded border">
        {hasProfileReadme ? (
          <div className="d-flex align-items-center justify-content-between">
            <span className="small text-dark fw-medium">
              Your profile README repository (<strong>{username}/{username}</strong>) is active!
            </span>
            {profileReadmeUrl && (
              <a
                href={profileReadmeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary py-0 px-2 fw-semibold"
                style={{ fontSize: '0.75rem' }}
              >
                View README <FiExternalLink />
              </a>
            )}
          </div>
        ) : (
          <div className="small text-secondary">
            <p className="mb-1 text-dark fw-semibold">💡 What is a Profile README?</p>
            <p className="mb-0 text-muted">
              Create a public repository named exactly as your GitHub username (<strong>{username}/{username}</strong>) containing a <code>README.md</code> to customize your GitHub landing profile!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubProfileReadme;
