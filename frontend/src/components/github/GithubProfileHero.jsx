import React from 'react';
import { FiGithub, FiExternalLink, FiMapPin, FiBriefcase, FiGlobe, FiCalendar, FiUser } from 'react-icons/fi';

const GithubProfileHero = ({ profile = {} }) => {
  const {
    name = 'Developer',
    username = '',
    avatar = '',
    bio = '',
    location = '',
    company = '',
    website = '',
    profileUrl = '',
    createdAt = '',
  } = profile;

  return (
    <div className="card shadow-sm border-0 bg-white mb-4 overflow-hidden">
      {/* GitHub Gradient Banner */}
      <div
        style={{
          height: '110px',
          background: 'linear-gradient(135deg, #24292e 0%, #040d21 100%)',
        }}
      />

      <div className="card-body p-4 pt-0">
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-3" style={{ marginTop: '-45px' }}>
          <div className="d-flex align-items-end gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="rounded-circle border border-4 border-white shadow"
                width="90"
                height="90"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div
                className="rounded-circle bg-light border border-4 border-white shadow d-flex align-items-center justify-content-center"
                style={{ width: '90px', height: '90px' }}
              >
                <FiUser size={42} className="text-secondary" />
              </div>
            )}

            <div className="pt-2">
              <h2 className="h4 fw-bold mb-1 text-dark">{name}</h2>
              <p className="text-primary fw-semibold small mb-1">@{username}</p>
              <div className="d-flex flex-wrap align-items-center gap-3 text-muted extra-small">
                {location && (
                  <span className="d-flex align-items-center gap-1">
                    <FiMapPin /> {location}
                  </span>
                )}
                {company && (
                  <span className="d-flex align-items-center gap-1">
                    <FiBriefcase /> {company}
                  </span>
                )}
                {website && (
                  <a
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none text-muted d-flex align-items-center gap-1"
                  >
                    <FiGlobe /> {website}
                  </a>
                )}
                {createdAt && (
                  <span className="d-flex align-items-center gap-1">
                    <FiCalendar /> Joined {createdAt}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 align-self-end">
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark btn-sm fw-bold d-flex align-items-center gap-1"
              >
                <FiGithub /> Open GitHub <FiExternalLink />
              </a>
            )}
          </div>
        </div>

        {bio && (
          <div className="pt-3 border-top text-secondary small" style={{ lineHeight: '1.55' }}>
            <p className="mb-0">{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubProfileHero;
