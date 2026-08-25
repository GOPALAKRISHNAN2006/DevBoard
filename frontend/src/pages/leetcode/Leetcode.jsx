import { useEffect, useState } from "react";
import { FiCode, FiExternalLink } from "react-icons/fi";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import { Link } from "react-router-dom";

export default function Leetcode() {
  const { user, refreshUser } = useAuth();

  const [data, setData] = useState(undefined);
  const [isRefreshingUser, setIsRefreshingUser] = useState(true);

  const username = user?.leetcodeUsername;

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

    api
      .get("/leetcode/stats")
      .then((r) => setData(r.data))
      .catch(() => setData(null));
  }, [username, isRefreshingUser]);

  // Loading
  if (isRefreshingUser || (username && data === undefined)) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>

      {/* ============================= */}
      {/* PAGE HEADER */}
      {/* ============================= */}

      <div className="section-head">
        <div>
          <h1
            className="page-title"
            data-testid="leetcode-page-title"
          >
            LeetCode
          </h1>

          <p
            className="page-subtitle"
            data-testid="leetcode-page-subtitle"
          >
            Your problem-solving progress.
          </p>
        </div>

        {data && (
          <a
            href={`https://leetcode.com/${data.username}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            data-testid="leetcode-open-profile"
          >
            <FiExternalLink />
            Open LeetCode
          </a>
        )}
      </div>

      {/* ============================= */}
      {/* NOT CONNECTED */}
      {/* ============================= */}

      {!username ? (
        <EmptyState
          title="LeetCode not connected"
          text="Add your LeetCode username in Profile Settings to view your stats."
          action={
            <Link
              to="/profile"
              className="btn btn-primary mt-3"
              data-testid="leetcode-profile-settings"
            >
              Go to Profile Settings
            </Link>
          }
        />
      ) : !data ? (

        /* ============================= */
        /* LOAD ERROR */
        /* ============================= */

        <EmptyState
          title="Could not load LeetCode stats"
          text="Check if your username is correct in Profile Settings."
        />

      ) : (

        /* ============================= */
        /* LEETCODE DATA */
        /* ============================= */

        <>
          {/* Profile Card */}

          <div
            className="card p-4 mb-4"
            data-testid="leetcode-profile-card"
          >
            <div className="d-flex align-items-center gap-3">

              {data.avatar && (
                <img
                  src={data.avatar}
                  className="rounded-circle"
                  width="64"
                  height="64"
                  alt="avatar"
                  data-testid="leetcode-avatar"
                  loading="lazy"
                  decoding="async"
                />
              )}

              <div>

                <h3
                  className="mb-0 fw-bold"
                  data-testid="leetcode-name"
                >
                  {data.realName || data.username}
                </h3>

                <p
                  className="text-muted mb-0 small"
                  data-testid="leetcode-username"
                >
                  @{data.username} · Ranking #
                  {data.ranking?.toLocaleString()}
                </p>

              </div>
            </div>
          </div>

          {/* ============================= */}
          {/* STATISTICS */}
          {/* ============================= */}

          <div className="row g-3">

            {[
              ["Total Solved", data.totalSolved, "blue"],
              ["Easy", data.easySolved, "green"],
              ["Medium", data.mediumSolved, "orange"],
              ["Hard", data.hardSolved, "purple"],
            ].map(([label, value, tone]) => (

              <div
                className="col-6 col-lg-3"
                key={label}
              >

                <div
                  className="card p-3 text-center"
                  data-testid={`leetcode-stat-${label
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >

                  <FiCode
                    size={20}
                    className={`mb-2 mx-auto d-block text-${
                      tone === "blue"
                        ? "primary"
                        : tone === "green"
                        ? "success"
                        : tone === "orange"
                        ? "warning"
                        : "danger"
                    }`}
                  />

                  <h3
                    className="fw-bold mb-0"
                    data-testid={`leetcode-value-${label
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {value ?? "—"}
                  </h3>

                  <small className="text-muted">
                    {label}
                  </small>

                </div>

              </div>

            ))}

          </div>
        </>
      )}

    </Layout>
  );
}
