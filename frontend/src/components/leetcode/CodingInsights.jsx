import React from 'react';
import { FiZap, FiTarget, FiCheckSquare } from 'react-icons/fi';

const CodingInsights = ({ solved = {}, activity = {} }) => {
  const total = solved.total || 0;
  const currentStreak = activity.currentStreak || 0;
  const activeDays = activity.activeDays || 0;

  // Calculate dynamic next milestone (e.g., if total = 258 -> milestone = 300, remaining = 42)
  const milestoneTargets = [50, 100, 200, 300, 500, 750, 1000, 1500, 2000];
  const nextMilestone = milestoneTargets.find((m) => m > total) || Math.ceil((total + 1) / 100) * 100;
  const remaining = nextMilestone - total;
  const milestonePct = Math.min(100, Math.round((total / nextMilestone) * 100));

  return (
    <div className="card shadow-sm border-0 bg-white p-4 h-100">
      <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Coding Insights & Milestones</h3>

      <div className="d-flex flex-column gap-3">
        {/* Streak */}
        <div className="d-flex align-items-center gap-3 p-3 bg-light rounded border">
          <div className="p-2 rounded bg-danger-subtle text-danger">
            <FiZap size={24} />
          </div>
          <div>
            <div className="fw-bold text-dark">{currentStreak} Days Streak</div>
            <div className="small text-muted">Current problem solving momentum</div>
          </div>
        </div>

        {/* Milestone */}
        <div className="p-3 bg-light rounded border">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2">
              <FiTarget className="text-primary fs-5" />
              <span className="fw-bold text-dark small">Next Milestone Goal</span>
            </div>
            <span className="badge bg-primary">{nextMilestone} Problems</span>
          </div>

          <div className="progress mb-2" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${milestonePct}%` }}
              aria-valuenow={milestonePct}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          <div className="d-flex justify-content-between text-muted extra-small">
            <span>{total} Solved</span>
            <strong className="text-primary">{remaining} problems remaining</strong>
          </div>
        </div>

        {/* Summary metric */}
        <div className="d-flex align-items-center justify-content-between p-2 text-secondary small border-top pt-3">
          <span className="d-flex align-items-center gap-1"><FiCheckSquare className="text-success" /> Active Days Count:</span>
          <strong className="text-dark">{activeDays} Days</strong>
        </div>
      </div>
    </div>
  );
};

export default CodingInsights;
