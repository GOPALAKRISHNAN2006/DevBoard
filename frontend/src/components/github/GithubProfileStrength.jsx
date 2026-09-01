import React from 'react';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const GithubProfileStrength = ({ profileStrength = {} }) => {
  const { score = 0, completed = [], missing = [] } = profileStrength;

  const getScoreColor = (val) => {
    if (val >= 80) return 'bg-success';
    if (val >= 50) return 'bg-primary';
    return 'bg-warning';
  };

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div>
          <h3 className="h6 fw-bold text-dark text-uppercase mb-1">DevBoard GitHub Profile Strength</h3>
          <p className="text-muted small mb-0">Transparent score evaluated against GitHub metadata standards</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="fs-3 fw-bold text-dark">{score}%</span>
        </div>
      </div>

      <div className="progress mb-3" style={{ height: '12px' }}>
        <div
          className={`progress-bar ${getScoreColor(score)}`}
          role="progressbar"
          style={{ width: `${score}%` }}
          aria-valuenow={score}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="p-3 bg-light rounded border h-100">
            <h4 className="h6 fw-bold text-success mb-2 d-flex align-items-center gap-1">
              <FiCheckCircle /> Completed Items ({completed.length})
            </h4>
            <ul className="list-unstyled mb-0 small text-secondary">
              {completed.map((item, idx) => (
                <li key={idx} className="mb-1 d-flex align-items-center gap-2">
                  <span className="text-success fw-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="p-3 bg-light rounded border h-100">
            <h4 className="h6 fw-bold text-warning mb-2 d-flex align-items-center gap-1">
              <FiAlertTriangle /> Recommended Improvements ({missing.length})
            </h4>
            {missing.length === 0 ? (
              <p className="small text-success mb-0">Your GitHub profile meets all recommended standards!</p>
            ) : (
              <ul className="list-unstyled mb-0 small text-secondary">
                {missing.map((item, idx) => (
                  <li key={idx} className="mb-1 d-flex align-items-center gap-2">
                    <span className="text-warning fw-bold">⚠</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubProfileStrength;
