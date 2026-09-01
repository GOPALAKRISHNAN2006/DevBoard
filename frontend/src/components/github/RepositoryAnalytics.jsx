import React from 'react';
import { FiStar, FiGitBranch, FiTrendingUp, FiClock, FiExternalLink } from 'react-icons/fi';

const RepositoryAnalytics = ({ analytics = {} }) => {
  const {
    total = 0,
    stars = 0,
    forks = 0,
    averageStars = 0,
    mostStarred = null,
    mostForked = null,
    recentlyUpdated = null,
  } = analytics;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Repository Analytics Summary</h3>

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="p-3 bg-light rounded border text-center">
            <FiStar className="text-warning fs-3 mb-1" />
            <h4 className="h5 fw-bold mb-0 text-dark">{averageStars}</h4>
            <span className="extra-small text-muted">Average Stars / Repo</span>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 bg-light rounded border text-center">
            <FiTrendingUp className="text-primary fs-3 mb-1" />
            <h4 className="h5 fw-bold mb-0 text-dark">{stars}</h4>
            <span className="extra-small text-muted">Total Stars Received</span>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 bg-light rounded border text-center">
            <FiGitBranch className="text-danger fs-3 mb-1" />
            <h4 className="h5 fw-bold mb-0 text-dark">{forks}</h4>
            <span className="extra-small text-muted">Total Forks Count</span>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-1">
        {mostStarred && (
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded border">
              <span className="extra-small text-muted fw-bold text-uppercase d-block mb-1">Most Starred Repo</span>
              <div className="d-flex align-items-center justify-content-between">
                <strong className="text-dark small text-truncate" style={{ maxWidth: '150px' }}>
                  {mostStarred.name}
                </strong>
                <a href={mostStarred.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-warning py-0 px-2">
                  <FiStar /> {mostStarred.stars}
                </a>
              </div>
            </div>
          </div>
        )}

        {mostForked && (
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded border">
              <span className="extra-small text-muted fw-bold text-uppercase d-block mb-1">Most Forked Repo</span>
              <div className="d-flex align-items-center justify-content-between">
                <strong className="text-dark small text-truncate" style={{ maxWidth: '150px' }}>
                  {mostForked.name}
                </strong>
                <a href={mostForked.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary py-0 px-2">
                  <FiGitBranch /> {mostForked.forks}
                </a>
              </div>
            </div>
          </div>
        )}

        {recentlyUpdated && (
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded border">
              <span className="extra-small text-muted fw-bold text-uppercase d-block mb-1">Recently Updated</span>
              <div className="d-flex align-items-center justify-content-between">
                <strong className="text-dark small text-truncate" style={{ maxWidth: '150px' }}>
                  {recentlyUpdated.name}
                </strong>
                <span className="extra-small text-muted d-flex align-items-center gap-1">
                  <FiClock /> {recentlyUpdated.date}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryAnalytics;
