import React from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const UpcomingDeadlinesCard = ({ jobs = [] }) => {
  // Extract jobs with approaching deadlines or recent applications
  const upcoming = jobs
    .filter((j) => j.status !== 'Rejected' && j.status !== 'Offer')
    .slice(0, 5);

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiCalendar className="text-warning fs-5" />
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Upcoming Application Deadlines</h3>
        </div>
        <Link to="/jobs" className="extra-small fw-bold text-primary text-decoration-none">
          View All Jobs
        </Link>
      </div>

      {upcoming.length > 0 ? (
        <div className="list-group list-group-flush">
          {upcoming.map((job) => (
            <div key={job._id} className="list-group-item px-0 py-2 border-bottom d-flex align-items-center justify-content-between">
              <div>
                <strong className="d-block text-dark small">{job.role}</strong>
                <span className="text-muted extra-small">{job.company} • {job.location || 'Remote'}</span>
              </div>
              <div className="text-end">
                <span className="badge bg-light text-secondary border extra-small mb-1">
                  <FiClock className="me-1" /> Active
                </span>
                <span className="d-block extra-small text-primary fw-semibold">{job.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted small mb-0">No upcoming deadlines.</p>
      )}
    </div>
  );
};

export default UpcomingDeadlinesCard;
