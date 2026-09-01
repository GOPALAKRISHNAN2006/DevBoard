import React from 'react';
import { FiCheckCircle, FiAward, FiXCircle } from 'react-icons/fi';

const SuccessRateCard = ({ funnelStats = {} }) => {
  const {
    interviewRate = 0,
    offerRate = 0,
    rejectionRate = 0,
  } = funnelStats;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Application Success Rates</h3>

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="p-3 bg-light rounded border text-center">
            <FiCheckCircle className="text-purple fs-3 mb-1" />
            <h4 className="h4 fw-bold mb-0 text-dark">{interviewRate}%</h4>
            <span className="extra-small text-muted fw-semibold">Interview Rate</span>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 bg-light rounded border text-center">
            <FiAward className="text-success fs-3 mb-1" />
            <h4 className="h4 fw-bold mb-0 text-dark">{offerRate}%</h4>
            <span className="extra-small text-muted fw-semibold">Offer Conversion Rate</span>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 bg-light rounded border text-center">
            <FiXCircle className="text-danger fs-3 mb-1" />
            <h4 className="h4 fw-bold mb-0 text-dark">{rejectionRate}%</h4>
            <span className="extra-small text-muted fw-semibold">Rejection Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessRateCard;
