import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';

const CareerProgressCard = ({ careerProgress = [] }) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiCheckSquare className="text-purple fs-5" />
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">DevBoard Career Progress</h3>
        </div>
        <span className="badge bg-purple-subtle text-purple border border-purple">
          Developer Readiness
        </span>
      </div>

      <div className="d-flex flex-column gap-3">
        {careerProgress.map((item, idx) => (
          <div key={idx}>
            <div className="d-flex justify-content-between small fw-semibold mb-1">
              <span className="text-dark">{item.name}</span>
              <span className="text-muted">{item.progress}%</span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div
                className={`progress-bar ${item.color || 'bg-primary'}`}
                style={{ width: `${item.progress}%` }}
                aria-valuenow={item.progress}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerProgressCard;
