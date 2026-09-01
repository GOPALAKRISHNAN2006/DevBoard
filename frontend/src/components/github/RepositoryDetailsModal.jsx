import React, { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiEye, FiAlertCircle, FiCheckCircle, FiFileText } from 'react-icons/fi';
import api from '../../api/axios';
import Loader from '../Loader';

const RepositoryDetailsModal = ({ repoName, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoName) return;
    let active = true;
    setLoading(true);

    api.get(`/github/repos/${encodeURIComponent(repoName)}`)
      .then((res) => {
        if (active) setDetails(res.data);
      })
      .catch((err) => {
        console.error('Fetch repo details error:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [repoName]);

  if (!repoName) return null;

  const repo = details?.repo;
  const quality = details?.quality;
  const readmeContent = details?.readmeContent;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <FiGithub /> {repoName}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body p-4">
            {loading ? (
              <div className="py-4 text-center">
                <Loader />
                <p className="text-muted small mt-2">Loading repository details & README...</p>
              </div>
            ) : !repo ? (
              <div className="alert alert-warning text-center">Repository metadata unavailable.</div>
            ) : (
              <div>
                {/* Description */}
                {repo.description && (
                  <p className="text-secondary small mb-3 text-justify">{repo.description}</p>
                )}

                {/* Stats */}
                <div className="row g-2 mb-3">
                  <div className="col-4">
                    <div className="p-2 bg-light rounded text-center border">
                      <FiStar className="text-warning mb-1" />
                      <div className="fw-bold text-dark">{repo.stargazers_count}</div>
                      <span className="extra-small text-muted">Stars</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 bg-light rounded text-center border">
                      <FiGitBranch className="text-primary mb-1" />
                      <div className="fw-bold text-dark">{repo.forks_count}</div>
                      <span className="extra-small text-muted">Forks</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 bg-light rounded text-center border">
                      <FiEye className="text-info mb-1" />
                      <div className="fw-bold text-dark">{repo.watchers_count}</div>
                      <span className="extra-small text-muted">Watchers</span>
                    </div>
                  </div>
                </div>

                {/* Quality Score */}
                {quality && (
                  <div className="p-3 bg-light rounded border mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-dark small">DevBoard Repository Quality:</span>
                      <span className={`badge ${quality.score >= 80 ? 'bg-success' : 'bg-primary'}`}>
                        {quality.quality} ({quality.score}%)
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-3 extra-small">
                      {Object.entries(quality.checks).map(([key, val]) => (
                        <span key={key} className={val ? 'text-success' : 'text-muted'}>
                          {val ? <FiCheckCircle /> : <FiAlertCircle />} {key.replace('has', '').replace('is', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="mb-3">
                    <span className="fw-semibold text-dark small d-block mb-1">Topics:</span>
                    <div className="d-flex flex-wrap gap-1">
                      {repo.topics.map((t, idx) => (
                        <span key={idx} className="badge bg-primary-subtle text-primary border">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* README Preview */}
                <div className="border-top pt-3 mt-3">
                  <h6 className="fw-bold text-dark d-flex align-items-center gap-1 mb-2">
                    <FiFileText /> README Preview
                  </h6>
                  {readmeContent ? (
                    <div className="p-3 bg-light rounded border extra-small text-dark font-monospace" style={{ maxHeight: '200px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                      {readmeContent}
                    </div>
                  ) : (
                    <span className="text-muted extra-small">No README content detected for this repository.</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm fw-bold" onClick={onClose}>
              Close
            </button>
            {repo && (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
              >
                <FiGithub /> View On GitHub <FiExternalLink />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetailsModal;
