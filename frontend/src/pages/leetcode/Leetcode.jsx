import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiRefreshCw, FiExternalLink, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

import LeetcodeProfileHero from '../../components/leetcode/LeetcodeProfileHero';
import OverviewStatCards from '../../components/leetcode/OverviewStatCards';
import DifficultyProgress from '../../components/leetcode/DifficultyProgress';
import DifficultyChart from '../../components/leetcode/DifficultyChart';
import SubmissionHeatmap from '../../components/leetcode/SubmissionHeatmap';
import CodingInsights from '../../components/leetcode/CodingInsights';
import LanguageAnalytics from '../../components/leetcode/LanguageAnalytics';
import BadgeGrid from '../../components/leetcode/BadgeGrid';
import ContestCard from '../../components/leetcode/ContestCard';
import RecentProblems from '../../components/leetcode/RecentProblems';
import MilestoneTracker from '../../components/leetcode/MilestoneTracker';

export default function Leetcode() {
  const { user, refreshUser } = useAuth();

  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const username = user?.leetcodeUsername;

  const fetchStats = useCallback(
    async (forceRefresh = false) => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        if (forceRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }
        setError(null);

        const res = await api.get(`/leetcode/stats${forceRefresh ? '?forceRefresh=true' : ''}`);
        setData(res.data);

        if (forceRefresh) {
          toast.success('LeetCode statistics updated');
        }
      } catch (err) {
        console.error('LeetCode API Error:', err);
        setError(err.response?.data?.message || 'Unable to load LeetCode statistics');
        if (forceRefresh) {
          toast.error('Failed to update LeetCode statistics');
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [username]
  );

  useEffect(() => {
    let active = true;
    refreshUser()
      .catch(() => {})
      .finally(() => {
        if (active) {
          fetchStats(false);
        }
      });
    return () => {
      active = false;
    };
  }, [refreshUser, fetchStats]);

  // Loading State
  if (loading) {
    return (
      <Layout>
        <div className="py-5 text-center">
          <Loader />
          <p className="text-muted mt-3 fw-medium">Loading LeetCode analytics...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ============================= */}
      {/* PAGE HEADER */}
      {/* ============================= */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1" data-testid="leetcode-page-title">
            LeetCode Analytics
          </h1>
          <p className="text-muted small mb-0" data-testid="leetcode-page-subtitle">
            Comprehensive problem-solving insights, submission activity, and milestones.
          </p>
        </div>

        {data && (
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm fw-bold d-flex align-items-center gap-2"
              onClick={() => fetchStats(true)}
              disabled={refreshing}
              title="Refresh statistics from LeetCode"
            >
              <FiRefreshCw className={refreshing ? 'spin-icon' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh Stats'}
            </button>

            <a
              href={`https://leetcode.com/${data.profile?.username}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
              data-testid="leetcode-open-profile"
            >
              Open LeetCode <FiExternalLink />
            </a>
          </div>
        )}
      </div>

      {/* ============================= */}
      {/* SECTION 15 — NOT CONNECTED STATE */}
      {/* ============================= */}
      {!username ? (
        <EmptyState
          title="Connect LeetCode"
          text="Add your LeetCode username in Profile Settings to view your coding analytics."
          action={
            <Link to="/profile" className="btn btn-primary mt-3" data-testid="leetcode-profile-settings">
              Go to Profile Settings
            </Link>
          }
        />
      ) : error ? (
        /* ============================= */
        /* SECTION 14 — ERROR STATE */
        /* ============================= */
        <div className="card border-danger shadow-sm p-4 text-center my-4">
          <FiAlertCircle className="text-danger fs-1 mb-2 mx-auto" />
          <h4 className="h5 fw-bold text-dark">Unable to load LeetCode statistics</h4>
          <p className="text-muted small mb-3">{error}</p>
          <div className="d-flex justify-content-center gap-2">
            <button type="button" className="btn btn-primary btn-sm fw-bold" onClick={() => fetchStats(true)}>
              Try Again
            </button>
            <Link to="/profile" className="btn btn-outline-secondary btn-sm fw-bold">
              Check Profile Settings
            </Link>
          </div>
        </div>
      ) : (
        /* ============================= */
        /* LEETCODE ANALYTICS DASHBOARD */
        /* ============================= */
        <>
          {/* SECTION 1 — PROFILE HERO */}
          <LeetcodeProfileHero profile={data.profile} />

          {/* SECTION 2 — OVERVIEW STATISTICS */}
          <OverviewStatCards
            solved={data.solved}
            submissions={data.submissions}
            profile={data.profile}
            activity={data.activity}
          />

          {/* SECTION 3 & 4 — DIFFICULTY PROGRESS & DISTRIBUTION CHART */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-6">
              <DifficultyProgress solved={data.solved} />
            </div>
            <div className="col-12 col-lg-6">
              <DifficultyChart solved={data.solved} />
            </div>
          </div>

          {/* SECTION 5 — SUBMISSION ACTIVITY HEATMAP */}
          <SubmissionHeatmap activity={data.activity} submissions={data.submissions} />

          {/* SECTION 6 & 7 — INSIGHTS & LANGUAGE ANALYTICS */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-6">
              <CodingInsights solved={data.solved} activity={data.activity} />
            </div>
            <div className="col-12 col-lg-6">
              <LanguageAnalytics languages={data.languages} />
            </div>
          </div>

          {/* SECTION 8 — BADGES & ACHIEVEMENTS */}
          <BadgeGrid badges={data.badges} />

          {/* SECTION 9 — CONTEST PERFORMANCE */}
          <div className="mb-4">
            <ContestCard contest={data.contest} />
          </div>

          {/* SECTION 10 — RECENT PROBLEMS */}
          <RecentProblems recentProblems={data.recentProblems} />

          {/* SECTION 11 — MILESTONE TRACKER */}
          <MilestoneTracker solved={data.solved} />
        </>
      )}
    </Layout>
  );
}
