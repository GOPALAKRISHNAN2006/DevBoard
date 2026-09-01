import React from 'react';
import { FiLinkedin, FiExternalLink, FiEdit3, FiMapPin, FiUser } from 'react-icons/fi';

const LinkedInProfileHero = ({ profile = {}, onOpenEditModal }) => {
  const {
    name = 'Developer',
    headline = 'Full Stack Developer',
    location = 'India',
    avatar = '',
    about = '',
    linkedinUrl = '',
  } = profile;

  return (
    <div className="card shadow-sm border-0 bg-white mb-4 overflow-hidden">
      {/* Cover Header Banner */}
      <div
        style={{
          height: '110px',
          background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
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
              <p className="text-primary fw-semibold small mb-1">{headline || 'Full Stack Developer'}</p>
              {location && (
                <span className="text-muted small d-flex align-items-center gap-1">
                  <FiMapPin /> {location}
                </span>
              )}
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 align-self-end">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-1"
              onClick={onOpenEditModal}
            >
              <FiEdit3 /> Edit Profile
            </button>

            {linkedinUrl && (
              <a
                href={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
              >
                <FiLinkedin /> Open LinkedIn <FiExternalLink />
              </a>
            )}
          </div>
        </div>

        {about && (
          <div className="pt-3 border-top text-secondary small" style={{ lineHeight: '1.55' }}>
            <strong className="text-dark d-block mb-1">About:</strong>
            <p className="mb-0 text-justify">{about}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInProfileHero;
