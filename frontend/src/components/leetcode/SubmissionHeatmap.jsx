import React, { useMemo } from 'react';

/**
 * Render submission activity heatmap grid
 */
const SubmissionHeatmap = ({ activity = {}, submissions = {} }) => {
  const { currentStreak = 0, activeDays = 0, calendar = {} } = activity;

  // Build last 120 days array for contribution squares
  const days = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 119; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const timestamp = Math.floor(d.setHours(0, 0, 0, 0) / 1000).toString();
      const count = calendar[timestamp] || 0;
      list.push({ date: d.toISOString().split('T')[0], count });
    }
    return list;
  }, [calendar]);

  const getColor = (count) => {
    if (count === 0) return '#f1f5f9';
    if (count <= 2) return '#bbf7d0';
    if (count <= 5) return '#4ade80';
    if (count <= 10) return '#22c55e';
    return '#15803d';
  };

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div>
          <h3 className="h6 fw-bold text-dark text-uppercase mb-1">Submission Activity</h3>
          <p className="text-muted small mb-0">Daily coding activity over the past 4 months</p>
        </div>

        <div className="d-flex gap-3 small">
          <div className="text-center px-3 py-1 bg-light rounded border">
            <div className="fw-bold text-success">{currentStreak} Days</div>
            <div className="extra-small text-muted">Current Streak</div>
          </div>
          <div className="text-center px-3 py-1 bg-light rounded border">
            <div className="fw-bold text-primary">{activeDays} Days</div>
            <div className="extra-small text-muted">Active Days</div>
          </div>
          <div className="text-center px-3 py-1 bg-light rounded border">
            <div className="fw-bold text-dark">{submissions.total || 0}</div>
            <div className="extra-small text-muted">Total Submissions</div>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="d-flex flex-wrap gap-1 p-2 bg-light rounded border justify-content-center">
        {days.map((item, idx) => (
          <div
            key={idx}
            title={`${item.date}: ${item.count} submission(s)`}
            style={{
              width: '13px',
              height: '13px',
              backgroundColor: getColor(item.count),
              borderRadius: '2px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <div className="d-flex align-items-center justify-content-end gap-2 mt-2 extra-small text-muted">
        <span>Less</span>
        <span style={{ width: '10px', height: '10px', backgroundColor: '#f1f5f9', borderRadius: '2px' }} />
        <span style={{ width: '10px', height: '10px', backgroundColor: '#bbf7d0', borderRadius: '2px' }} />
        <span style={{ width: '10px', height: '10px', backgroundColor: '#4ade80', borderRadius: '2px' }} />
        <span style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '2px' }} />
        <span style={{ width: '10px', height: '10px', backgroundColor: '#15803d', borderRadius: '2px' }} />
        <span>More</span>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;
