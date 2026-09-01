import React from 'react';
import { FiTrendingUp, FiBox, FiStar, FiCode, FiZap } from 'react-icons/fi';

const GithubInsights = ({ profile = {}, repositories = {}, languages = [] }) => {
  const repoCount = repositories.total || profile.publicRepos || 0;
  const starCount = repositories.stars || 0;
  const topLang = languages.length > 0 ? languages[0].language : 'JavaScript';
  const topRepo = repositories.topItems && repositories.topItems.length > 0 ? repositories.topItems[0] : null;

  const insights = [
    {
      icon: <FiBox className="text-primary" />,
      text: `You currently maintain ${repoCount} public repositories on GitHub.`,
    },
    {
      icon: <FiStar className="text-warning" />,
      text: `Your repositories have received a total of ${starCount} stars from the community.`,
    },
    {
      icon: <FiCode className="text-success" />,
      text: `${topLang} is your most frequently used repository language.`,
    },
  ];

  if (topRepo) {
    insights.push({
      icon: <FiZap className="text-danger" />,
      text: `Your most starred project is '${topRepo.name}' with ${topRepo.stargazers_count || 0} stars.`,
    });
  }

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <FiTrendingUp className="text-primary fs-5" />
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">GitHub Insights</h3>
      </div>

      <div className="row g-3">
        {insights.map((item, idx) => (
          <div key={idx} className="col-12 col-md-6">
            <div className="p-3 bg-light rounded border d-flex align-items-center gap-3 h-100">
              <span className="p-2 rounded bg-white border shadow-xs fs-5">{item.icon}</span>
              <span className="small text-dark fw-medium">{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubInsights;
