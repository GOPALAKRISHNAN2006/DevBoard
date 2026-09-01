import React from 'react';

const DifficultyProgress = ({ solved = {} }) => {
  const { total = 0, easy = 0, medium = 0, hard = 0 } = solved;

  const easyPct = total > 0 ? Math.round((easy / total) * 100) : 0;
  const mediumPct = total > 0 ? Math.round((medium / total) * 100) : 0;
  const hardPct = total > 0 ? Math.round((hard / total) * 100) : 0;

  return (
    <div className="card shadow-sm border-0 bg-white h-100 p-4">
      <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Problem Solving Progress</h3>

      {/* Easy */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1 small fw-semibold">
          <span className="text-success">Easy ({easy})</span>
          <span className="text-muted">{easyPct}%</span>
        </div>
        <div className="progress" style={{ height: '10px' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${easyPct}%` }}
            aria-valuenow={easyPct}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>

      {/* Medium */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1 small fw-semibold">
          <span className="text-warning">Medium ({medium})</span>
          <span className="text-muted">{mediumPct}%</span>
        </div>
        <div className="progress" style={{ height: '10px' }}>
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${mediumPct}%` }}
            aria-valuenow={mediumPct}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>

      {/* Hard */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1 small fw-semibold">
          <span className="text-danger">Hard ({hard})</span>
          <span className="text-muted">{hardPct}%</span>
        </div>
        <div className="progress" style={{ height: '10px' }}>
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: `${hardPct}%` }}
            aria-valuenow={hardPct}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>

      <div className="mt-auto pt-2 border-top d-flex justify-content-between text-muted small">
        <span>Total Solved Problems:</span>
        <strong className="text-dark fs-6">{total}</strong>
      </div>
    </div>
  );
};

export default DifficultyProgress;
