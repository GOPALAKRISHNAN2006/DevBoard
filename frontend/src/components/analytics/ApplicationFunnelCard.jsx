import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const ApplicationFunnelCard = ({ funnelStats = {} }) => {
  const {
    total = 0,
    applied = 0,
    assessment = 0,
    interview = 0,
    offer = 0,
    assessmentRate = 0,
    interviewRate = 0,
    offerRate = 0,
  } = funnelStats;

  const getWidth = (val) => {
    if (total === 0) return 0;
    return Math.min(100, Math.max(10, Math.round((val / total) * 100)));
  };

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiTrendingUp className="text-primary fs-5" />
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Application Funnel & Conversion</h3>
        </div>
        <span className="badge bg-primary-subtle text-primary">Total: {total} Applications</span>
      </div>

      <div className="d-flex flex-column gap-3">
        {/* Applied */}
        <div>
          <div className="d-flex justify-content-between small fw-semibold mb-1">
            <span className="text-dark">1. Submitted Applications</span>
            <span className="text-primary fw-bold">{applied} Applications</span>
          </div>
          <div className="progress" style={{ height: '10px' }}>
            <div className="progress-bar bg-primary" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Assessment */}
        <div>
          <div className="d-flex justify-content-between small fw-semibold mb-1">
            <span className="text-dark">2. Assessments & OA</span>
            <span className="text-warning fw-bold">{assessment} ({assessmentRate}%)</span>
          </div>
          <div className="progress" style={{ height: '10px' }}>
            <div className="progress-bar bg-warning" style={{ width: `${getWidth(assessment)}%` }} />
          </div>
        </div>

        {/* Interview */}
        <div>
          <div className="d-flex justify-content-between small fw-semibold mb-1">
            <span className="text-dark">3. Technical & HR Interviews</span>
            <span className="text-purple fw-bold">{interview} ({interviewRate}%)</span>
          </div>
          <div className="progress" style={{ height: '10px' }}>
            <div className="progress-bar bg-purple" style={{ width: `${getWidth(interview)}%` }} />
          </div>
        </div>

        {/* Offer */}
        <div>
          <div className="d-flex justify-content-between small fw-semibold mb-1">
            <span className="text-dark">4. Job Offers Received</span>
            <span className="text-success fw-bold">{offer} ({offerRate}%)</span>
          </div>
          <div className="progress" style={{ height: '10px' }}>
            <div className="progress-bar bg-success" style={{ width: `${getWidth(offer)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFunnelCard;
