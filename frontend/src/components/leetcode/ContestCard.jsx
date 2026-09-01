import React from 'react';
import { FiAward, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const ContestCard = ({ contest = null }) => {
  if (!contest || contest.rating === 0) {
    return (
      <div className="card shadow-sm border-0 bg-white p-4 h-100">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Contest Performance</h3>
        <div className="text-center py-4 bg-light rounded border">
          <FiAward className="fs-1 text-muted mb-2" />
          <p className="text-muted small mb-0">Contest data unavailable or user hasn't attended contests yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 bg-white p-4 h-100">
      <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Contest Performance</h3>
      <div className="row g-3 mb-3">
        <div className="col-6">
          <div className="p-3 bg-light rounded border text-center">
            <FiTrendingUp className="text-primary fs-4 mb-1" />
            <h4 className="h5 fw-bold mb-0 text-dark">{contest.rating}</h4>
            <span className="extra-small text-muted">Contest Rating</span>
          </div>
        </div>
        <div className="col-6">
          <div className="p-3 bg-light rounded border text-center">
            <FiCheckCircle className="text-success fs-4 mb-1" />
            <h4 className="h5 fw-bold mb-0 text-dark">{contest.attended}</h4>
            <span className="extra-small text-muted">Contests Attended</span>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded border small">
        <span className="text-muted">Global Ranking:</span>
        <strong className="text-dark">#{contest.ranking ? contest.ranking.toLocaleString() : 'N/A'}</strong>
      </div>
    </div>
  );
};

export default ContestCard;
