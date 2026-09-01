import React from 'react';
import { FiBook, FiUsers, FiUserCheck, FiStar, FiGitBranch, FiCode, FiCalendar, FiActivity } from 'react-icons/fi';

const GithubOverviewStats = ({ profile = {}, repositories = {}, languages = [] }) => {
  const stats = [
    {
      label: 'Repositories',
      value: profile.publicRepos || repositories.total || 0,
      icon: <FiBook className="text-primary fs-4" />,
      bg: 'bg-primary-subtle',
    },
    {
      label: 'Followers',
      value: profile.followers || 0,
      icon: <FiUsers className="text-success fs-4" />,
      bg: 'bg-success-subtle',
    },
    {
      label: 'Following',
      value: profile.following || 0,
      icon: <FiUserCheck className="text-info fs-4" />,
      bg: 'bg-info-subtle',
    },
    {
      label: 'Total Stars',
      value: repositories.stars || 0,
      icon: <FiStar className="text-warning fs-4" />,
      bg: 'bg-warning-subtle',
    },
    {
      label: 'Total Forks',
      value: repositories.forks || 0,
      icon: <FiGitBranch className="text-danger fs-4" />,
      bg: 'bg-danger-subtle',
    },
    {
      label: 'Languages',
      value: languages.length || 0,
      icon: <FiCode className="text-secondary fs-4" />,
      bg: 'bg-secondary-subtle',
    },
    {
      label: 'Joined',
      value: profile.createdAt || 'N/A',
      icon: <FiCalendar className="text-dark fs-4" />,
      bg: 'bg-light',
    },
    {
      label: 'Account Status',
      value: 'Active',
      icon: <FiActivity className="text-success fs-4" />,
      bg: 'bg-success-subtle',
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {stats.map((item, idx) => (
        <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm border-0 bg-white p-3 text-center">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <span className={`p-2 rounded ${item.bg}`}>{item.icon}</span>
            </div>
            <h3 className="h4 fw-bold mb-0 text-dark">{item.value}</h3>
            <span className="text-muted extra-small fw-semibold">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GithubOverviewStats;
