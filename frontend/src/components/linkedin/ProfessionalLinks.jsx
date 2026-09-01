import React from 'react';
import { FiLinkedin, FiGithub, FiGlobe, FiCode, FiExternalLink, FiEdit3 } from 'react-icons/fi';

const ProfessionalLinks = ({ profile = {}, onOpenEditModal }) => {
  const links = [
    {
      name: 'LinkedIn',
      url: profile.linkedinUrl,
      icon: <FiLinkedin className="text-primary fs-5" />,
    },
    {
      name: 'GitHub',
      url: profile.githubUrl,
      icon: <FiGithub className="text-dark fs-5" />,
    },
    {
      name: 'Portfolio',
      url: profile.portfolioUrl,
      icon: <FiGlobe className="text-success fs-5" />,
    },
    {
      name: 'LeetCode',
      url: profile.leetcodeUrl,
      icon: <FiCode className="text-warning fs-5" />,
    },
  ];

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Professional Links</h3>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenEditModal}
        >
          <FiEdit3 /> Manage Links
        </button>
      </div>

      <div className="d-flex flex-column gap-2">
        {links.map((link, idx) => (
          <div
            key={idx}
            className="d-flex align-items-center justify-content-between p-3 bg-light rounded border"
          >
            <div className="d-flex align-items-center gap-3">
              {link.icon}
              <div>
                <strong className="text-dark d-block small">{link.name}</strong>
                <span className="extra-small text-muted">
                  {link.url ? link.url : 'Not added yet'}
                </span>
              </div>
            </div>

            {link.url ? (
              <a
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary py-0 px-2 fw-semibold"
                style={{ fontSize: '0.75rem' }}
              >
                Open <FiExternalLink />
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-light py-0 px-2 fw-semibold text-muted border"
                style={{ fontSize: '0.75rem' }}
                onClick={onOpenEditModal}
              >
                Add Link
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalLinks;
