import React from 'react';
import { FiExternalLink, FiAward, FiStar, FiUser } from 'react-icons/fi';

const LeetcodeProfileHero = ({ profile = {} }) => {
  const {
    username = '',
    realName = '',
    avatar = '',
    ranking = 0,
    reputation = 0,
    aboutMe = '',
  } = profile;

  return (
    <div className="card shadow-sm mb-4 border-0 bg-white">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                className="rounded-circle border border-2 border-primary"
                width="72"
                height="72"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center border"
                style={{ width: '72px', height: '72px' }}
              >
                <FiUser size={36} className="text-secondary" />
              </div>
            )}

            <div>
              <h2 className="h4 fw-bold mb-1 text-dark">{realName || username}</h2>
              <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small fw-medium">
                <span>@{username}</span>
                <span>•</span>
                <span className="d-flex align-items-center gap-1 text-primary fw-semibold">
                  <FiAward /> Ranking #{ranking ? ranking.toLocaleString() : 'N/A'}
                </span>
                <span>•</span>
                <span className="d-flex align-items-center gap-1 text-warning fw-semibold">
                  <FiStar /> Reputation: {reputation}
                </span>
              </div>
            </div>
          </div>

          <div>
            <a
              href={`https://leetcode.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-2"
            >
              Open LeetCode <FiExternalLink />
            </a>
          </div>
        </div>

        {aboutMe && (
          <div className="mt-3 pt-3 border-top text-secondary small" style={{ lineHeight: '1.5' }}>
            <strong>About: </strong>
            {aboutMe}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeetcodeProfileHero;
