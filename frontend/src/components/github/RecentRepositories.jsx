import React from 'react';
import { FiClock, FiStar, FiGitBranch, FiExternalLink, FiInfo } from 'react-icons/fi';

const RecentRepositories = ({ repositories = [], onSelectRepo }) => {
  const recentRepos = [...repositories]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 5);

  if (recentRepos.length === 0) return null;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Recently Updated Repositories</h3>
        <span className="badge bg-light text-secondary border">Latest Commits</span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 small">
          <thead className="table-light">
            <tr>
              <th>Repository Name</th>
              <th>Language</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Last Updated</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentRepos.map((repo, idx) => (
              <tr key={idx}>
                <td className="fw-bold text-dark">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-dark text-decoration-none"
                  >
                    {repo.name} <FiExternalLink className="extra-small text-muted" />
                  </a>
                </td>
                <td>{repo.language ? <span className="badge bg-light text-dark border">{repo.language}</span> : '—'}</td>
                <td><span className="text-warning fw-semibold"><FiStar /> {repo.stargazers_count}</span></td>
                <td><span className="text-primary fw-semibold"><FiGitBranch /> {repo.forks_count}</span></td>
                <td className="text-muted extra-small">
                  <FiClock /> {new Date(repo.updated_at).toLocaleDateString()}
                </td>
                <td className="text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary py-0 px-2 fw-semibold"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => onSelectRepo(repo.name)}
                  >
                    <FiInfo /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentRepositories;
