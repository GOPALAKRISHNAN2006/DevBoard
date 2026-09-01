import React from 'react';
import { FiCode } from 'react-icons/fi';

const LanguageAnalytics = ({ languages = [] }) => {
  if (!languages || languages.length === 0) {
    return (
      <div className="card shadow-sm border-0 bg-white p-4 h-100">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Language Analytics</h3>
        <p className="text-muted small mb-0">No language statistics available.</p>
      </div>
    );
  }

  const totalLangSolved = languages.reduce((acc, curr) => acc + curr.problemsSolved, 0);

  return (
    <div className="card shadow-sm border-0 bg-white p-4 h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Language Analytics</h3>
        <span className="badge bg-light text-secondary border">{languages.length} Languages</span>
      </div>

      <div className="d-flex flex-column gap-3">
        {languages.map((item, idx) => {
          const pct = totalLangSolved > 0 ? Math.round((item.problemsSolved / totalLangSolved) * 100) : 0;
          return (
            <div key={idx}>
              <div className="d-flex justify-content-between align-items-center mb-1 small fw-semibold">
                <span className="text-dark d-flex align-items-center gap-1">
                  <FiCode className="text-primary" /> {item.languageName}
                </span>
                <span className="text-muted">
                  <strong>{item.problemsSolved}</strong> solved ({pct}%)
                </span>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${pct}%` }}
                  aria-valuenow={pct}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageAnalytics;
