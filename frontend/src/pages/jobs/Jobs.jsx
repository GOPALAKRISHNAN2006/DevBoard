/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTrendingUp,
  FiColumns,
  FiList,
  FiMapPin,
  FiCalendar,
  FiX,
  FiArrowRight,
} from "react-icons/fi";

import api from "../../api/axios";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";
import useDebounce from "../../hooks/useDebounce";
import "./Jobs.css";

const blank = {
  company: "",
  role: "",
  location: "",
  jobType: "Remote",
  status: "Applied",
  notes: "",
  salary: "",
};

const statuses = [
  "Applied",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
];

export default function Jobs() {
  const location = useLocation();

  const [items, setItems] = useState(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("kanban"); // "kanban" or "table"
  const [form, setForm] = useState(null);
  const [deleteConfirmJob, setDeleteConfirmJob] = useState(null);
  const [allKanbanJobs, setAllKanbanJobs] = useState([]);

  const debouncedQ = useDebounce(q, 350);

  // Load jobs for table view
  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page,
        limit: viewMode === "kanban" ? 100 : 8,
      });

      if (debouncedQ) params.append("search", debouncedQ);
      if (filter) params.append("status", filter);

      const { data } = await api.get(`/jobs?${params.toString()}`);
      setItems(data.jobs || []);
      setTotalPages(data.totalPages || 1);
      if (viewMode === "kanban") {
        setAllKanbanJobs(data.jobs || []);
      }
    } catch {
      setItems([]);
      toast.error("Could not load jobs");
    }
  }, [page, debouncedQ, filter, viewMode]);

  // Reload when page/search/filter/viewMode changes
  useEffect(() => {
    load();
  }, [load]);

  // Open Add Job form when /jobs/new is visited
  useEffect(() => {
    if (location.pathname === "/jobs/new") {
      setForm(blank);
    }
  }, [location.pathname]);

  const list = items || [];

  // Overall Statistics across loaded jobs
  const jobStats = useMemo(() => {
    const jobsList = allKanbanJobs.length ? allKanbanJobs : (items || []);
    return {
      total: jobsList.length,
      Applied: jobsList.filter((j) => j.status === "Applied").length,
      Assessment: jobsList.filter((j) => j.status === "Assessment").length,
      Interview: jobsList.filter((j) => j.status === "Interview").length,
      Offer: jobsList.filter((j) => j.status === "Offer").length,
      Rejected: jobsList.filter((j) => j.status === "Rejected").length,
    };
  }, [allKanbanJobs, items]);

  // Quick move status directly without modal
  const handleQuickStatusChange = async (job, newStatus) => {
    try {
      await api.put(`/jobs/${job._id}`, { status: newStatus });
      toast.success(`Moved to ${newStatus}`);
      load();
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Update form field
  const set = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  // Save job application
  const save = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await api.put(`/jobs/${form._id}`, form);
        toast.success("Application updated");
      } else {
        await api.post("/jobs", form);
        toast.success("Application tracked");
      }
      setForm(null);
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save application");
    }
  };

  // Delete job
  const handleDeleteJob = async (job) => {
    try {
      await api.delete(`/jobs/${job._id}`);
      toast.success("Application removed");
      setDeleteConfirmJob(null);
      load();
    } catch {
      toast.error("Unable to delete application");
    }
  };

  if (items === null) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="section-head animate-slide-up">
        <div>
          <h1 className="page-title">Job Application Pipeline</h1>
          <p className="page-subtitle">
            Manage your career opportunities from first application to final offer.
          </p>
        </div>
        <button
          className="btn btn-primary fw-bold"
          data-testid="add-job-button"
          onClick={() => setForm(blank)}
        >
          <FiPlus /> Track Application
        </button>
      </div>

      {/* Interactive Top Stat Cards */}
      <div className="row g-3 mb-4 animate-fade-in animate-stagger-1">
        <div className="col-4 col-md-2">
          <div
            className={`card p-3 text-center stat-filter-card ${filter === "" ? "active" : ""}`}
            onClick={() => setFilter("")}
            title="Filter all jobs"
          >
            <div className="text-muted extra-small fw-semibold text-uppercase">Total</div>
            <h4 className="h5 fw-bold mb-0 mt-1">{jobStats.total}</h4>
          </div>
        </div>

        <div className="col-4 col-md-2">
          <div
            className={`card p-3 text-center stat-filter-card ${filter === "Applied" ? "active" : ""}`}
            onClick={() => setFilter(filter === "Applied" ? "" : "Applied")}
            title="Filter by Applied"
          >
            <div className="text-primary extra-small fw-semibold text-uppercase">Applied</div>
            <h4 className="h5 fw-bold mb-0 mt-1 text-primary">{jobStats.Applied}</h4>
          </div>
        </div>

        <div className="col-4 col-md-2">
          <div
            className={`card p-3 text-center stat-filter-card ${filter === "Assessment" ? "active" : ""}`}
            onClick={() => setFilter(filter === "Assessment" ? "" : "Assessment")}
            title="Filter by Assessment"
          >
            <div className="text-warning extra-small fw-semibold text-uppercase">Assessment</div>
            <h4 className="h5 fw-bold mb-0 mt-1 text-warning">{jobStats.Assessment}</h4>
          </div>
        </div>

        <div className="col-4 col-md-2">
          <div
            className={`card p-3 text-center stat-filter-card ${filter === "Interview" ? "active" : ""}`}
            onClick={() => setFilter(filter === "Interview" ? "" : "Interview")}
            title="Filter by Interview"
          >
            <div className="text-purple extra-small fw-semibold text-uppercase">Interview</div>
            <h4 className="h5 fw-bold mb-0 mt-1 text-purple">{jobStats.Interview}</h4>
          </div>
        </div>

        <div className="col-4 col-md-2">
          <div
            className={`card p-3 text-center stat-filter-card ${filter === "Offer" ? "active" : ""}`}
            onClick={() => setFilter(filter === "Offer" ? "" : "Offer")}
            title="Filter by Offer"
          >
            <div className="text-success extra-small fw-semibold text-uppercase">Offers</div>
            <h4 className="h5 fw-bold mb-0 mt-1 text-success">{jobStats.Offer}</h4>
          </div>
        </div>

        <div className="col-4 col-md-2">
          <div
            className={`card p-3 text-center stat-filter-card ${filter === "Rejected" ? "active" : ""}`}
            onClick={() => setFilter(filter === "Rejected" ? "" : "Rejected")}
            title="Filter by Rejected"
          >
            <div className="text-danger extra-small fw-semibold text-uppercase">Rejected</div>
            <h4 className="h5 fw-bold mb-0 mt-1 text-danger">{jobStats.Rejected}</h4>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Status Filter & View Toggle */}
      <div className="jobs-toolbar animate-fade-in animate-stagger-2">
        <div className="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
          {/* Search Box */}
          <div className="input-group search-box flex-grow-1">
            <span className="input-group-text">
              <FiSearch />
            </span>
            <input
              className="form-control"
              placeholder="Search companies, roles, notes..."
              data-testid="jobs-search-input"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Status Dropdown Filter */}
          <select
            className="form-select filter-select"
            data-testid="jobs-status-filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="view-mode-toggle">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "kanban" ? "active" : ""}`}
            onClick={() => setViewMode("kanban")}
          >
            <FiColumns /> Kanban Board
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "table" ? "active" : ""}`}
            onClick={() => setViewMode("table")}
          >
            <FiList /> List Table
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === "kanban" ? (
        /* KANBAN BOARD VIEW */
        <div className="kanban-board animate-fade-in animate-stagger-3">
          {statuses.map((statusKey) => {
            const columnJobs = list.filter(
              (j) => (j.status || "Applied").toLowerCase() === statusKey.toLowerCase()
            );

            return (
              <div className="kanban-column" key={statusKey}>
                <div className="kanban-column-header">
                  <div className="kanban-column-title">
                    <span className={`column-dot ${statusKey.toLowerCase()}`} />
                    <span>{statusKey}</span>
                    <span className="column-count-badge">{columnJobs.length}</span>
                  </div>
                  <button
                    type="button"
                    className="icon-btn"
                    title={`Add job to ${statusKey}`}
                    onClick={() => setForm({ ...blank, status: statusKey })}
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="kanban-cards-list">
                  {columnJobs.length === 0 ? (
                    <div className="text-center text-muted extra-small p-3 border rounded border-dashed">
                      No jobs in {statusKey}
                    </div>
                  ) : (
                    columnJobs.map((job) => (
                      <div
                        key={job._id}
                        className="kanban-job-card"
                        data-testid={`job-card-${job._id}`}
                      >
                        <div className="job-card-top">
                          <div>
                            <div className="job-role" data-testid={`job-role-${job._id}`}>
                              {job.role}
                            </div>
                            <div className="job-company" data-testid={`job-company-${job._id}`}>
                              {job.company}
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <button
                              type="button"
                              className="icon-btn p-1"
                              data-testid={`edit-job-${job._id}`}
                              onClick={() => setForm(job)}
                              title="Edit job"
                            >
                              <FiEdit2 size={13} />
                            </button>
                            <button
                              type="button"
                              className="icon-btn text-danger p-1"
                              data-testid={`delete-job-${job._id}`}
                              onClick={() => setDeleteConfirmJob(job)}
                              title="Delete job"
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        </div>

                        <div className="job-card-meta">
                          <span className="d-flex align-items-center gap-1">
                            <FiMapPin size={11} /> {job.location || "Remote"}
                          </span>
                          {job.jobType && (
                            <span className="job-tag">{job.jobType}</span>
                          )}
                          {job.salary && (
                            <span className="job-tag text-success">{job.salary}</span>
                          )}
                        </div>

                        {job.notes && (
                          <div className="job-notes-snippet">{job.notes}</div>
                        )}

                        <div className="job-card-footer">
                          <span className="extra-small text-muted d-flex align-items-center gap-1">
                            <FiCalendar size={11} />{" "}
                            {job.appliedDate
                              ? new Date(job.appliedDate).toLocaleDateString()
                              : "Recently"}
                          </span>

                          <select
                            className="job-stage-select"
                            value={job.status || "Applied"}
                            onChange={(e) => handleQuickStatusChange(job, e.target.value)}
                            title="Move stage"
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                → {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE LIST VIEW */
        <div className="card shadow-sm border-0 p-4 animate-fade-in animate-stagger-3">
          {list.length ? (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Role & Company</th>
                    <th>Location & Type</th>
                    <th>Stage / Status</th>
                    <th>Date</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((j) => (
                    <tr key={j._id} data-testid={`job-row-${j._id}`}>
                      <td>
                        <strong data-testid={`job-role-${j._id}`}>{j.role}</strong>
                        <div className="text-muted small" data-testid={`job-company-${j._id}`}>
                          {j.company}
                        </div>
                      </td>

                      <td data-testid={`job-location-${j._id}`}>
                        <div>{j.location}</div>
                        <span className="job-tag extra-small">{j.jobType || "Remote"}</span>
                      </td>

                      <td>
                        <select
                          className="job-stage-select"
                          value={j.status || "Applied"}
                          onChange={(e) => handleQuickStatusChange(j, e.target.value)}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="small text-muted">
                        {j.appliedDate
                          ? new Date(j.appliedDate).toLocaleDateString()
                          : "Recently"}
                      </td>

                      <td className="text-end">
                        <button
                          type="button"
                          className="icon-btn me-1"
                          data-testid={`edit-job-${j._id}`}
                          onClick={() => setForm(j)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          className="icon-btn text-danger"
                          data-testid={`delete-job-${j._id}`}
                          onClick={() => setDeleteConfirmJob(j)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No jobs found"
              text="Add an application to start organizing your opportunities."
            />
          )}

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Job Modal */}
      {form && (
        <div className="app-modal-backdrop" onMouseDown={() => setForm(null)}>
          <div className="app-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="app-modal-head">
              <h5>{form._id ? "Edit Application" : "Track New Application"}</h5>
              <button type="button" onClick={() => setForm(null)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={save} className="p-4">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Company Name *</label>
                  <input
                    className="form-control"
                    data-testid="job-company-input"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder="e.g. Stripe, Linear"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Role Title *</label>
                  <input
                    className="form-control"
                    data-testid="job-role-input"
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Location *</label>
                  <input
                    className="form-control"
                    data-testid="job-location-input"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="e.g. Remote, San Francisco"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Compensation / Salary</label>
                  <input
                    className="form-control"
                    value={form.salary || ""}
                    onChange={(e) => set("salary", e.target.value)}
                    placeholder="e.g. $140,000 - $160,000"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Job Type</label>
                  <select
                    className="form-select"
                    data-testid="job-type-select"
                    value={form.jobType}
                    onChange={(e) => set("jobType", e.target.value)}
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Current Pipeline Stage</label>
                  <select
                    className="form-select"
                    data-testid="job-status-select"
                    value={form.status}
                    onChange={(e) => set("status", e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Interview Notes & Questions</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    data-testid="job-notes-input"
                    value={form.notes || ""}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Take notes on rounds, interviewers, recruiter tips..."
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="cancel-job-button"
                  onClick={() => setForm(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-testid="save-job-button"
                >
                  {form._id ? "Update Application" : "Save to Pipeline"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmJob && (
        <div
          className="app-modal-backdrop"
          onMouseDown={() => setDeleteConfirmJob(null)}
        >
          <div className="app-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="app-modal-head">
              <h5>Remove Application</h5>
              <button type="button" onClick={() => setDeleteConfirmJob(null)}>
                <FiX />
              </button>
            </div>
            <div className="p-4">
              <p className="mb-4">
                Are you sure you want to remove the application for{" "}
                <strong>{deleteConfirmJob.role}</strong> at{" "}
                <strong>{deleteConfirmJob.company}</strong>?
              </p>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeleteConfirmJob(null)}
                >
                  Keep Application
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteJob(deleteConfirmJob)}
                >
                  Remove Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}