import React from 'react';

/**
 * Detailed Score Breakdown across 7 transparent criteria
 */
const ATSBreakdown = ({ breakdown = {} }) => {
  const criteria = [
    { key: 'contact', name: 'Contact Information', max: 10 },
    { key: 'sections', name: 'Standard Sections', max: 15 },
    { key: 'keywords', name: 'Keyword Matching', max: 25 },
    { key: 'skills', name: 'Skills Relevance', max: 20 },
    { key: 'experience', name: 'Experience & Projects', max: 15 },
    { key: 'formatting', name: 'ATS Formatting', max: 10 },
    { key: 'completeness', name: 'Completeness', max: 5 },
  ];

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header bg-light py-2">
        <h6 className="card-title mb-0 fw-bold small text-uppercase">Score Breakdown</h6>
      </div>
      <div className="card-body p-3">
        {criteria.map((item) => {
          const current = breakdown[item.key] || 0;
          const percentage = Math.round((current / item.max) * 100);

          return (
            <div key={item.key} className="mb-2">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>{item.name}</span>
                <span>
                  {current} / {item.max} ({percentage}%)
                </span>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div
                  className={`progress-bar ${percentage >= 80 ? 'bg-success' : percentage >= 50 ? 'bg-warning' : 'bg-danger'}`}
                  role="progressbar"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ATSBreakdown;
