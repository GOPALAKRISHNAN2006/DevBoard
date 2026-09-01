import React from 'react';
import { FiAward } from 'react-icons/fi';

const BadgeGrid = ({ badges = [] }) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">LeetCode Achievements & Badges</h3>
        <span className="badge bg-primary-subtle text-primary">{badges.length} Badges Earned</span>
      </div>

      {!badges || badges.length === 0 ? (
        <div className="text-center py-4 bg-light rounded border">
          <FiAward className="fs-1 text-muted mb-2" />
          <p className="text-muted small mb-0">No badge data available yet.</p>
        </div>
      ) : (
        <div className="row g-3">
          {badges.map((badge, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="p-3 bg-light rounded border h-100 d-flex align-items-center gap-3">
                {badge.icon ? (
                  <img
                    src={badge.icon}
                    alt={badge.name}
                    width="48"
                    height="48"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="p-2 rounded bg-warning-subtle text-warning">
                    <FiAward size={32} />
                  </div>
                )}
                <div>
                  <h4 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '0.875rem' }}>
                    {badge.name}
                  </h4>
                  {badge.creationDate && (
                    <span className="extra-small text-muted d-block">Earned: {badge.creationDate}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeGrid;
