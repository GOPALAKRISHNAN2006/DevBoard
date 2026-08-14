import { useEffect, useState } from 'react';
import { FiGithub, FiStar, FiGitBranch, FiCode, FiExternalLink, FiBook } from 'react-icons/fi';
import { getPublicGithubProfile, getPublicGithubRepos } from '../../api/githubPublic';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import EmptyState from '../../components/EmptyState';
import { Link } from 'react-router-dom';
import './Github.css';

export default function Github() {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState(undefined);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [isRefreshingUser, setIsRefreshingUser] = useState(true);
  const username = user?.githubUsername;

  useEffect(() => {
    let active = true;
    refreshUser()
      .catch(() => {})
      .finally(() => { if (active) setIsRefreshingUser(false); });
    return () => { active = false; };
  }, [refreshUser]);

  useEffect(() => {
    if (isRefreshingUser) return;
    if (!username) {
      return;
    }
    getPublicGithubProfile(username)
      .then((profileData) => {
        setProfile(profileData);
        setError("");
      })
      .catch((err) => {
        setProfile(null);
        setError(err.response?.data?.message || "Unable to connect to GitHub right now.");
      });

    getPublicGithubRepos(username)
      .then((reposData) => {
        const sorted = Array.isArray(reposData)
          ? reposData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          : [];
        setRepos(sorted);
      })
      .catch((err) => {
        setRepos([]);
        setError((current) => current || err.response?.data?.message || "Unable to load GitHub repositories.");
      });
  }, [username, isRefreshingUser]);

  const isLoading = isRefreshingUser || (Boolean(username) && profile === undefined);

  if (!username || (!profile && !isLoading)) {
    return (
      <Layout>
        <div className="section-head">
          <div>
            <h1 className="page-title" data-testid="github-page-title">GitHub</h1>
            <p className="page-subtitle">Your coding footprint.</p>
          </div>
        </div>
        <EmptyState
          title={error ? "Could not load GitHub" : "GitHub not connected"}
          text={error || "Add your GitHub username in Profile Settings to see your activity."}
          action={<Link to="/profile" className="btn btn-primary mt-3">Go to Profile Settings</Link>}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-head">
        <div>
          <h1 className="page-title"
           data-testid="github-page-title">GitHub</h1>
          <p className="page-subtitle"
          data-testid="github-username">Your coding footprint — @{profile?.login || username}</p>
        </div>
        {profile && <a href={profile.html_url} target="_blank" rel="noreferrer" className="btn btn-primary">
          <FiGithub /> Open GitHub
        </a>}
      </div>

      {isLoading ? (
        <div className="github-loading-grid" aria-label="Loading GitHub details">
          <div className="github-skeleton github-skeleton-profile" />
          <div className="row g-3 mt-1">
            {[1, 2, 3, 4].map((item) => <div className="col-6 col-lg-3" key={item}><div className="github-skeleton github-skeleton-stat" /></div>)}
          </div>
          <div className="github-skeleton github-skeleton-repos" />
        </div>
      ) : <>
      {/* Profile Card */}
      <div className="card p-4 mb-4">
        <div className="d-flex align-items-center gap-3">
          <img
            src={profile.avatar_url}
            className="rounded-circle"
            width="72"
            height="72"
            alt="avatar"
          />
          <div>
            <h4 className="mb-1 fw-bold">{profile.name || profile.login}</h4>
            <a href={profile.html_url} target="_blank" rel="noreferrer" className="text-muted small">
              @{profile.login}
            </a>
            {profile.bio && <p className="text-muted mb-0 mt-1 small">{profile.bio}</p>}
          </div>
        </div>
        <div className="row g-3 mt-3">
          {[
            [FiGithub, "Repositories", profile.public_repos],
            [FiStar, "Followers", profile.followers],
            [FiGitBranch, "Following", profile.following],
            [FiCode, "Public Gists", profile.public_gists],
          ].map(([I, l, v]) => (
            <div className="col-6 col-lg-3" key={l}>
              <div className="card p-3 text-center">
                <I size={20} className="mb-2 mx-auto d-block text-muted" />
                <h4 className="fw-bold mb-0">{v || 0}</h4>
                <small className="text-muted">{l}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repositories */}
      <div className="section-head mb-3">
        <h5 className="m-0"
         data-testid="github-repositories-title">All Repositories</h5>
        <span className="badge bg-light text-dark border">{repos.length} repos</span>
      </div>
      {repos.length > 0 ? (
        <div className="row g-3">
          {repos.map(repo => (
            <div className="col-md-6 col-lg-4" key={repo.id}>
              <div className="card p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-start justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <FiBook size={14} className="text-muted flex-shrink-0" />
                      <strong className="text-truncate" 
                      data-testid={`github-repository-${repo.id}`}style={{maxWidth: 160}}
                       data-testid={`github-repository-${repo.id}`}>{repo.name}</strong>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-muted flex-shrink-0">
                      <FiExternalLink size={14} />
                    </a>
                  </div>
                  {repo.description && (
                    <p className="text-muted small mt-2 mb-0" style={{lineHeight: 1.5}}>
                      {repo.description.slice(0, 100)}{repo.description.length > 100 ? "…" : ""}
                    </p>
                  )}
                </div>
                <div className="d-flex align-items-center gap-3 mt-3">
                  {repo.language && (
                    <span className="small text-muted">
                      <span className="repo-lang-dot" /> {repo.language}
                    </span>
                  )}
                  <span className="small text-muted d-flex align-items-center gap-1">
                    <FiStar size={12} /> {repo.stargazers_count}
                  </span>
                  <span className="small text-muted d-flex align-items-center gap-1">
                    <FiGitBranch size={12} /> {repo.forks_count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No repositories" text="No public repositories found." />
      )}
      </>}
    </Layout>
  );
}
