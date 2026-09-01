import React from 'react';
import { FiAward, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const RepositoryQualityCard = ({ topRepositories = [] }) => {
  if (!topRepositories || topRepositories.length === 0) return null;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiAward className="text-primary fs-5" />
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">DevBoard Repository Quality Assessment</h3>
        </div>
        <span className="badge bg-light text-secondary border">Top Projects Quality</span>
      </div>

      <div className="row g-3">
        {topRepositories.slice(0, 4).map((repo, idx) => {
          const rating = repo.qualityRating || { score: 50, quality: 'Good', checks: {} };
          return (
            <div key={idx} className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong className="text-dark small text-truncate" style={{ maxWidth: '160px' }}>
                      {repo.name}
                    </strong>
                    <span className={`badge ${rating.score >= 80 ? 'bg-success' : 'bg-primary'}`}>
                      {rating.quality} ({rating.score}%)
                    </span>
                  </div>

                  <div className="d-flex flex-wrap gap-2 extra-small text-muted mb-2">
                    {Object.entries(rating.checks || {}).map(([chkKey, chkVal]) => (
                      <span key={chkKey} className={chkVal ? 'text-success fw-semibold' : 'text-muted'}>
                        {chkVal ? <FiCheckCircle /> : <FiAlertCircle />} {chkKey.replace('has', '').replace('is', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RepositoryQualityCard;
