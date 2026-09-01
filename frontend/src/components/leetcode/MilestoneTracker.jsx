import React from 'react';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';

const MilestoneTracker = ({ solved = {} }) => {
  const total = solved.total || 0;
  const milestones = [100, 200, 300, 500, 1000];

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Milestone Progress Tracker</h3>

      <div className="row g-3">
        {milestones.map((target, idx) => {
          const isCompleted = total >= target;
          const remaining = Math.max(0, target - total);
          const pct = Math.min(100, Math.round((total / target) * 100));

          return (
            <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg flex-grow-1">
              <div className={`p-3 rounded border ${isCompleted ? 'bg-success-subtle border-success' : 'bg-light'}`}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fw-bold small">{target} Problems</span>
                  {isCompleted ? (
                    <FiCheckCircle className="text-success fs-5" />
                  ) : (
                    <FiCircle className="text-muted fs-5" />
                  )}
                </div>

                <div className="progress mb-2" style={{ height: '6px' }}>
                  <div
                    className={`progress-bar ${isCompleted ? 'bg-success' : 'bg-primary'}`}
                    role="progressbar"
                    style={{ width: `${pct}%` }}
                    aria-valuenow={pct}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>

                <div className="extra-small text-muted">
                  {isCompleted ? (
                    <span className="text-success fw-bold">✓ Milestone Completed</span>
                  ) : (
                    <span>{remaining} remaining</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneTracker;
