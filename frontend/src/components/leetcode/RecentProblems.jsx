import React from 'react';
import { FiExternalLink, FiCheckCircle } from 'react-icons/fi';

const RecentProblems = ({ recentProblems = [] }) => {
  if (!recentProblems || recentProblems.length === 0) {
    return (
      <div className="card shadow-sm border-0 bg-white p-4 mb-4">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Recent Activity</h3>
        <p className="text-muted small mb-0">No recent submissions found.</p>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Recent Accepted Problems</h3>
        <span className="badge bg-success-subtle text-success">Latest {recentProblems.length}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 small">
          <thead className="table-light">
            <tr>
              <th scope="col">Problem</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col" className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentProblems.map((prob, idx) => (
              <tr key={idx}>
                <td className="fw-semibold text-dark">{prob.title}</td>
                <td>
                  <span className="badge bg-success-subtle text-success d-inline-flex align-items-center gap-1">
                    <FiCheckCircle /> Accepted
                  </span>
                </td>
                <td className="text-muted">{prob.timestamp}</td>
                <td className="text-end">
                  <a
                    href={prob.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary py-0 px-2 fw-semibold"
                    style={{ fontSize: '0.75rem' }}
                  >
                    View Problem <FiExternalLink />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentProblems;
