import React from 'react';
import { FiTrendingUp, FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

const GithubCareerInsights = ({ profile = {}, repositories = {}, profileStrength = {} }) => {
  const suggestions = [];

  if (profile.githubUrl || profile.username) {
    suggestions.push({
      type: 'success',
      message: 'Your GitHub profile is properly linked to your DevBoard Career Platform.',
    });
  }

  if ((repositories.total || 0) >= 5) {
    suggestions.push({
      type: 'success',
      message: `You maintain a solid portfolio of ${repositories.total} public repositories showing active development.`,
    });
  }

  if (profileStrength.missing && profileStrength.missing.length > 0) {
    profileStrength.missing.forEach((item) => {
      suggestions.push({
        type: 'warning',
        message: item,
      });
    });
  }

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <FiTrendingUp className="text-primary fs-5" />
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Career Branding & Insights</h3>
      </div>

      <div className="d-flex flex-column gap-2">
        {suggestions.map((sug, idx) => (
          <div
            key={idx}
            className={`p-3 rounded border d-flex align-items-center gap-3 ${
              sug.type === 'warning'
                ? 'bg-warning-subtle text-dark border-warning'
                : sug.type === 'info'
                ? 'bg-info-subtle text-dark border-info'
                : 'bg-success-subtle text-dark border-success'
            }`}
          >
            {sug.type === 'warning' ? (
              <FiAlertTriangle className="text-warning fs-4 flex-shrink-0" />
            ) : sug.type === 'info' ? (
              <FiInfo className="text-info fs-4 flex-shrink-0" />
            ) : (
              <FiCheckCircle className="text-success fs-4 flex-shrink-0" />
            )}
            <span className="small fw-medium">{sug.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubCareerInsights;
