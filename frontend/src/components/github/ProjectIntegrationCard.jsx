import React from 'react';
import { FiFolder, FiCheckCircle, FiAlertCircle, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProjectIntegrationCard = ({ projectMatches = [] }) => {
  if (!projectMatches || projectMatches.length === 0) return null;

  const connectedCount = projectMatches.filter((p) => p.isConnected).length;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiFolder className="text-primary fs-5" />
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">DevBoard Projects ↔ GitHub Integration</h3>
        </div>
        <span className="badge bg-primary">
          {connectedCount} / {projectMatches.length} Repositories Connected
        </span>
      </div>

      <div className="d-flex flex-column gap-2">
        {projectMatches.map((item, idx) => (
          <div
            key={idx}
            className="d-flex align-items-center justify-content-between p-3 bg-light rounded border"
          >
            <div className="d-flex align-items-center gap-3">
              {item.isConnected ? (
                <FiCheckCircle className="text-success fs-5 flex-shrink-0" />
              ) : (
                <FiAlertCircle className="text-warning fs-5 flex-shrink-0" />
              )}
              <div>
                <strong className="text-dark small d-block">{item.devboardProject}</strong>
                <span className="extra-small text-muted">
                  {item.isConnected ? `Connected repo: ${item.matchedRepo}` : 'No matching GitHub repository detected'}
                </span>
              </div>
            </div>

            {item.isConnected ? (
              <a
                href={item.matchedUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary py-0 px-2 fw-semibold"
                style={{ fontSize: '0.75rem' }}
              >
                View Repo <FiExternalLink />
              </a>
            ) : (
              <Link
                to="/projects"
                className="btn btn-sm btn-outline-secondary py-0 px-2 fw-semibold"
                style={{ fontSize: '0.75rem' }}
              >
                Connect Project
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectIntegrationCard;
