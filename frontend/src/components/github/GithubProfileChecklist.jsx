import React from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

const GithubProfileChecklist = ({ profile = {}, repositories = {}, hasProfileReadme = false }) => {
  const checklist = [
    { label: 'Profile Avatar', done: !!profile.avatar },
    { label: 'Display Name', done: !!profile.name },
    { label: 'Bio Summary', done: !!profile.bio },
    { label: 'Location Specified', done: !!profile.location },
    { label: 'Portfolio / Website Link', done: !!profile.website },
    { label: '3+ Public Repositories', done: (repositories.total || 0) >= 3 },
    { label: 'Repository Descriptions', done: (repositories.items || []).some((r) => r.description) },
    { label: 'Repository Topics/Tags', done: (repositories.items || []).some((r) => r.topics?.length > 0) },
    { label: 'Profile README Repository', done: hasProfileReadme },
  ];

  const completedCount = checklist.filter((item) => item.done).length;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">GitHub Profile Checklist</h3>
        <span className="badge bg-primary">
          {completedCount} / {checklist.length} Completed
        </span>
      </div>

      <div className="row g-2">
        {checklist.map((item, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4">
            <div
              className={`p-2 px-3 rounded border d-flex align-items-center gap-2 ${
                item.done ? 'bg-success-subtle border-success text-dark' : 'bg-light text-muted'
              }`}
            >
              {item.done ? (
                <FiCheckSquare className="text-success fs-5 flex-shrink-0" />
              ) : (
                <FiSquare className="text-muted fs-5 flex-shrink-0" />
              )}
              <span className="small fw-semibold">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubProfileChecklist;
