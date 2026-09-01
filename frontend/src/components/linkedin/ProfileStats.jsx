import React from 'react';
import { FiActivity, FiCode, FiBriefcase, FiAward, FiFolder, FiBook } from 'react-icons/fi';

const ProfileStats = ({ profile = {}, strength = {} }) => {
  const skillsCount = (profile.skills || []).reduce((acc, cat) => acc + (cat.items ? cat.items.length : 0), 0);
  const expCount = (profile.experience || []).length;
  const eduCount = (profile.education || []).length;
  const certsCount = (profile.certifications || []).length;
  const projCount = (profile.projects || []).length;

  const stats = [
    {
      label: 'Profile Strength',
      value: `${strength.score || profile.profileStrength || 0}%`,
      icon: <FiActivity className="text-primary fs-4" />,
      bg: 'bg-primary-subtle',
    },
    {
      label: 'Skills',
      value: skillsCount,
      icon: <FiCode className="text-success fs-4" />,
      bg: 'bg-success-subtle',
    },
    {
      label: 'Experience',
      value: expCount,
      icon: <FiBriefcase className="text-warning fs-4" />,
      bg: 'bg-warning-subtle',
    },
    {
      label: 'Certifications',
      value: certsCount,
      icon: <FiAward className="text-danger fs-4" />,
      bg: 'bg-danger-subtle',
    },
    {
      label: 'Projects',
      value: projCount,
      icon: <FiFolder className="text-info fs-4" />,
      bg: 'bg-info-subtle',
    },
    {
      label: 'Education',
      value: eduCount,
      icon: <FiBook className="text-secondary fs-4" />,
      bg: 'bg-secondary-subtle',
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {stats.map((item, idx) => (
        <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-2">
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

export default ProfileStats;
