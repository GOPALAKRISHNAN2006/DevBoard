import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FiGithub, FiExternalLink, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import api from '../../api/axios';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

import GithubProfileHero from '../../components/github/GithubProfileHero';
import GithubOverviewStats from '../../components/github/GithubOverviewStats';
import GithubProfileStrength from '../../components/github/GithubProfileStrength';
import GithubInsights from '../../components/github/GithubInsights';
import LanguageAnalytics from '../../components/github/LanguageAnalytics';
import RepositoryAnalytics from '../../components/github/RepositoryAnalytics';
import TopRepositories from '../../components/github/TopRepositories';
import RecentRepositories from '../../components/github/RecentRepositories';
import RepositorySearchFilterSort from '../../components/github/RepositorySearchFilterSort';
import RepositoryDetailsModal from '../../components/github/RepositoryDetailsModal';
import ProjectIntegrationCard from '../../components/github/ProjectIntegrationCard';
import ResumeGithubComparison from '../../components/github/ResumeGithubComparison';
import GithubProfileChecklist from '../../components/github/GithubProfileChecklist';
import GithubProfileReadme from '../../components/github/GithubProfileReadme';
import RepositoryQualityCard from '../../components/github/RepositoryQualityCard';
import GithubCareerInsights from '../../components/github/GithubCareerInsights';

export default function Github() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Search, Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('updated');

  // Modal State
  const [selectedRepoName, setSelectedRepoName] = useState(null);

  const fetchAnalytics = useCallback(async (forceRefresh = false) => {
    try {
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const res = await api.get(`/github/analytics${forceRefresh ? '?forceRefresh=true' : ''}`);
      setData(res.data);

      if (forceRefresh) {
        toast.success('GitHub statistics updated successfully');
      }
    } catch (err) {
      console.error('Fetch GitHub analytics error:', err);
      const msg = err.response?.data?.message || 'Unable to load GitHub developer analytics.';
      setError(msg);
      if (forceRefresh) toast.error(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const rawRepos = data?.repositories?.items || [];
  const languagesList = data?.languages?.map((l) => l.language) || [];

  // Filter & Sort Repositories
  const filteredAndSortedRepos = useMemo(() => {
    let result = [...rawRepos];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q))
      );
    }

    // Language filter
    if (selectedLanguage !== 'All') {
      result = result.filter(
        (r) => r.language && r.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'stars') return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      if (sortBy === 'forks') return (b.forks_count || 0) - (a.forks_count || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      // Default: updated
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    return result;
  }, [rawRepos, searchQuery, selectedLanguage, sortBy]);

  if (loading) {
    return (
      <Layout>
        <div className="py-5 text-center">
          <Loader />
          <p className="text-muted mt-3 fw-medium">Loading GitHub Developer Analytics...</p>
        </div>
      </Layout>
    );
  }

  if (error && !data) {
    return (
      <Layout>
        <div className="section-head">
          <div>
            <h1 className="page-title">GitHub</h1>
            <p className="page-subtitle">Your coding footprint.</p>
          </div>
        </div>
        <EmptyState
          title="Could not load GitHub Data"
          text={error}
          action={
            <Link to="/profile" className="btn btn-primary mt-3">
              Go to Profile Settings
            </Link>
          }
        />
      </Layout>
    );
  }

  const profile = data?.profile || {};
  const repositories = data?.repositories || {};
  const languages = data?.languages || [];
  const analytics = data?.analytics || {};
  const profileStrength = data?.profileStrength || {};

  return (
    <Layout>
      {/* ============================= */}
      {/* PAGE HEADER */}
      {/* ============================= */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">GitHub Developer Analytics</h1>
          <p className="text-muted small mb-0">
            Your coding activity, repositories and open-source progress.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-2"
            onClick={() => fetchAnalytics(true)}
            disabled={refreshing}
          >
            <FiRefreshCw className={refreshing ? 'spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh Stats'}
          </button>

          {profile.profileUrl && (
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-sm fw-bold d-flex align-items-center gap-1"
            >
              <FiGithub /> Open GitHub <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      {/* SECTION 1 — PROFILE HERO */}
      <GithubProfileHero profile={profile} />

      {/* SECTION 2 — GITHUB OVERVIEW */}
      <GithubOverviewStats profile={profile} repositories={repositories} languages={languages} />

      {/* SECTION 3 — DEVBOARD PROFILE STRENGTH */}
      <GithubProfileStrength profileStrength={profileStrength} />

      {/* SECTION 4 & 5 — GITHUB INSIGHTS */}
      <GithubInsights profile={profile} repositories={repositories} languages={languages} />

      {/* SECTION 6 — LANGUAGE ANALYTICS */}
      <LanguageAnalytics languages={languages} />

      {/* SECTION 7 — REPOSITORY ANALYTICS */}
      <RepositoryAnalytics analytics={analytics} />

      {/* SECTION 8 — TOP REPOSITORIES */}
      <TopRepositories repositories={rawRepos} onSelectRepo={(name) => setSelectedRepoName(name)} />

      {/* SECTION 9 — RECENT REPOSITORIES */}
      <RecentRepositories repositories={rawRepos} onSelectRepo={(name) => setSelectedRepoName(name)} />

      {/* SECTION 10, 11, 12 — SEARCH, FILTER & SORT */}
      <RepositorySearchFilterSort
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        sortBy={sortBy}
        onSortChange={setSortBy}
        availableLanguages={languagesList}
      />

      {/* FILTERED REPOSITORY GRID */}
      <div className="card shadow-sm border-0 bg-white p-4 mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">
            Filtered Repositories ({filteredAndSortedRepos.length})
          </h3>
        </div>

        {filteredAndSortedRepos.length === 0 ? (
          <div className="text-center py-4 bg-light rounded border">
            <p className="text-muted small mb-0">No repositories match your filter criteria.</p>
          </div>
        ) : (
          <div className="row g-3">
            {filteredAndSortedRepos.map((repo, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="p-3 bg-light rounded border h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                      <strong className="text-dark text-truncate" style={{ maxWidth: '160px' }}>
                        {repo.name}
                      </strong>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-muted">
                        <FiExternalLink />
                      </a>
                    </div>
                    {repo.description && (
                      <p className="text-secondary extra-small mb-2 text-justify">
                        {repo.description.length > 80 ? `${repo.description.slice(0, 80)}…` : repo.description}
                      </p>
                    )}
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top extra-small text-muted">
                    <span>{repo.language || '—'}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0 extra-small fw-semibold text-primary text-decoration-none"
                      onClick={() => setSelectedRepoName(repo.name)}
                    >
                      View Details ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 15 — PORTFOLIO PROJECT INTEGRATION */}
      <ProjectIntegrationCard projectMatches={data?.projectMatches} />

      {/* SECTION 16 — RESUME INTEGRATION */}
      <ResumeGithubComparison resumeMatches={data?.resumeProjectsMatches} />

      {/* SECTION 17 — PROFILE CHECKLIST */}
      <GithubProfileChecklist profile={profile} repositories={repositories} hasProfileReadme={data?.hasProfileReadme} />

      {/* SECTION 18 — PROFILE README */}
      <GithubProfileReadme
        hasProfileReadme={data?.hasProfileReadme}
        profileReadmeUrl={data?.profileReadmeUrl}
        username={profile.username}
      />

      {/* SECTION 19 — REPOSITORY QUALITY */}
      <RepositoryQualityCard topRepositories={repositories.topItems} />

      {/* SECTION 20 — CAREER INSIGHTS */}
      <GithubCareerInsights profile={profile} repositories={repositories} profileStrength={profileStrength} />

      {/* SECTION 13 — REPOSITORY DETAILS MODAL */}
      <RepositoryDetailsModal repoName={selectedRepoName} onClose={() => setSelectedRepoName(null)} />
    </Layout>
  );
}
