import React from 'react';
import { FiBook, FiStar, FiGitBranch, FiExternalLink, FiInfo } from 'react-icons/fi';

const TopRepositories = ({ repositories = [], onSelectRepo }) => {
  const topRepos = [...repositories]
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 6);

  if (topRepos.length === 0) return null;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Top Starred Repositories</h3>
        <span className="badge bg-light text-secondary border">Sorted by Stars</span>
      </div>

      <div className="row g-3">
        {topRepos.map((repo, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div className="p-3 bg-light rounded border h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <FiBook className="text-primary flex-shrink-0" />
                    <strong className="text-dark text-truncate" style={{ maxWidth: '160px' }}>
                      {repo.name}
                    </strong>
                  </div>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-muted">
                    <FiExternalLink />
                  </a>
                </div>

                {repo.description && (
                  <p className="text-secondary extra-small mb-2 text-justify" style={{ lineHeight: '1.45' }}>
                    {repo.description.length > 90 ? `${repo.description.slice(0, 90)}…` : repo.description}
                  </p>
                )}

                {repo.topics && repo.topics.length > 0 && (
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {repo.topics.slice(0, 3).map((topic, tIdx) => (
                      <span key={tIdx} className="badge bg-white text-secondary border extra-small">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="d-flex align-items-center justify-content-between pt-2 border-top extra-small text-muted">
                <div className="d-flex gap-3">
                  {repo.language && <span>● {repo.language}</span>}
                  <span><FiStar className="text-warning" /> {repo.stargazers_count}</span>
                  <span><FiGitBranch className="text-primary" /> {repo.forks_count}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-link p-0 extra-small fw-semibold text-primary text-decoration-none"
                  onClick={() => onSelectRepo(repo.name)}
                >
                  <FiInfo /> Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRepositories;
