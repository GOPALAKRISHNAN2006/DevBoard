import React from 'react';

/**
 * Visual Score Card for ATS Compatibility (0-100)
 */
const ATSScoreCard = ({ score = 0, targetRole = '' }) => {
  const getScoreColor = (val) => {
    if (val >= 85) return 'success';
    if (val >= 70) return 'info';
    if (val >= 50) return 'warning';
    return 'danger';
  };

  const getScoreLabel = (val) => {
    if (val >= 85) return 'Excellent ATS Alignment';
    if (val >= 70) return 'Strong Compatibility';
    if (val >= 50) return 'Moderate Match - Optimization Recommended';
    return 'Needs Improvement';
  };

  const colorScheme = getScoreColor(score);

  return (
    <div className={`card border-${colorScheme} shadow-sm mb-3`}>
      <div className="card-body text-center p-3">
        <h6 className="card-subtitle text-muted text-uppercase small fw-bold mb-1">
          ATS Compatibility Score
        </h6>
        {targetRole && (
          <div className="badge bg-secondary mb-2 text-wrap">
            Targeting: {targetRole}
          </div>
        )}
        <div className={`display-4 fw-bold text-${colorScheme} mb-1`}>
          {score} <span className="h4 text-muted">/ 100</span>
        </div>
        <div className="progress mb-2" style={{ height: '8px' }}>
          <div
            className={`progress-bar bg-${colorScheme}`}
            role="progressbar"
            style={{ width: `${score}%` }}
            aria-valuenow={score}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <span className={`badge bg-${colorScheme} px-3 py-1 fs-6`}>
          {getScoreLabel(score)}
        </span>
      </div>
    </div>
  );
};

export default ATSScoreCard;
