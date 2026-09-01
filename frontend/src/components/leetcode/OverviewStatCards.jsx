import React from 'react';
import {
  FiCheckCircle,
  FiTrendingUp,
  FiZap,
  FiPercent,
  FiAward,
  FiStar,
  FiCalendar,
  FiCode,
} from 'react-icons/fi';

const OverviewStatCards = ({ solved = {}, submissions = {}, profile = {}, activity = {} }) => {
  const cards = [
    {
      label: 'Total Solved',
      value: solved.total ?? 0,
      icon: <FiCode className="text-primary fs-4" />,
      badge: 'All',
      bg: 'bg-primary-subtle',
    },
    {
      label: 'Easy Solved',
      value: solved.easy ?? 0,
      icon: <FiCheckCircle className="text-success fs-4" />,
      badge: 'Easy',
      bg: 'bg-success-subtle',
    },
    {
      label: 'Medium Solved',
      value: solved.medium ?? 0,
      icon: <FiTrendingUp className="text-warning fs-4" />,
      badge: 'Medium',
      bg: 'bg-warning-subtle',
    },
    {
      label: 'Hard Solved',
      value: solved.hard ?? 0,
      icon: <FiZap className="text-danger fs-4" />,
      badge: 'Hard',
      bg: 'bg-danger-subtle',
    },
    {
      label: 'Acceptance Rate',
      value: submissions.acceptanceRate || 'N/A',
      icon: <FiPercent className="text-info fs-4" />,
      badge: 'Rate',
      bg: 'bg-info-subtle',
    },
    {
      label: 'Global Ranking',
      value: profile.ranking ? `#${profile.ranking.toLocaleString()}` : 'N/A',
      icon: <FiAward className="text-primary fs-4" />,
      badge: 'Rank',
      bg: 'bg-primary-subtle',
    },
    {
      label: 'Reputation',
      value: profile.reputation ?? 0,
      icon: <FiStar className="text-warning fs-4" />,
      badge: 'Points',
      bg: 'bg-warning-subtle',
    },
    {
      label: 'Active Days',
      value: activity.activeDays ?? 0,
      icon: <FiCalendar className="text-success fs-4" />,
      badge: 'Days',
      bg: 'bg-success-subtle',
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card, idx) => (
        <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm border-0 bg-white p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className={`p-2 rounded ${card.bg}`}>{card.icon}</span>
              <span className="badge bg-light text-secondary border">{card.badge}</span>
            </div>
            <h3 className="h4 fw-bold mb-1 text-dark">{card.value}</h3>
            <span className="text-muted small fw-medium">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStatCards;
