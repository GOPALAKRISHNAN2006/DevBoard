/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiSearch,
  FiX,
  FiFolder,
  FiCheckCircle,
  FiClock,
  FiList,
  FiGrid,
  FiStar,
  FiGithub,
  FiEye,
} from "react-icons/fi";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";
import useDebounce from "../../hooks/useDebounce";
import "./Projects.css";

const blank = {
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  status: "Completed",
  featured: false,
};

function Dialog({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div className="app-modal-backdrop" onMouseDown={onClose}>
      <div className="app-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="app-modal-head">
          <h5>{title}</h5>
          <button type="button" onClick={onClose}>
            <FiX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Projects() {
  const [items, setItems] = useState(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [form, setForm] = useState(blank);
  const [show, setShow] = useState(false);
  const [del, setDel] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);

  const debouncedQ = useDebounce(q, 350);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams({ page, limit: 9 });
      if (debouncedQ) params.append("search", debouncedQ);
      if (statusFilter && statusFilter !== "Featured") {
        params.append("status", statusFilter);
      }

      const { data } = await api.get(`/project?${params.toString()}`);
      let list = data.projects || [];
      if (statusFilter === "Featured") {
        list = list.filter((p) => p.featured);
      }
      setItems(list);
      setTotalPages(data.pages || 1);
    } catch {
      setItems([]);
      toast.error("Could not load projects");
    }
  }, [page, debouncedQ, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = items || [];

  // Compute Project Statistics
  const projectStats = useMemo(() => {
    const list = items || [];
    const completed = list.filter((p) => p.status === "Completed").length;
    const inProgress = list.filter((p) => p.status === "In Progress").length;
    const planned = list.filter((p) => p.status === "Planned").length;
    const featured = list.filter((p) => p.featured).length;

    return {
      total: list.length,
      completed,
      inProgress,
      planned,
      featured,
    };
  }, [items]);

  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  // 1-Click Toggle Featured Star
  const handleToggleFeatured = async (p, e) => {
    e.stopPropagation();
    try {
      await api.put(`/project/${p._id}`, { featured: !p.featured });
      toast.success(p.featured ? "Removed from featured" : "Marked as featured ⭐");
      load();
    } catch {
      toast.error("Failed to update featured status");
    }
  };

  const save = async (e) => {
    e.preventDefault();
    const body = {
      ...form,
      techStack: (form.techStack || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    };
    try {
      form._id
        ? await api.put(`/project/${form._id}`, body)
        : await api.post("/project", body);
      toast.success("Project saved successfully");
      setShow(false);
      setForm(blank);
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Unable to save project");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/project/${id}`);
      toast.success("Project removed");
      setDel(null);
      load();
    } catch {
      toast.error("Failed to delete project");
    }
  };

  if (items === null) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  const getStatusBadge = (st) => {
    switch (st) {
      case "Completed":
        return "bg-success-subtle text-success border-success";
      case "In Progress":
        return "bg-warning-subtle text-warning border-warning";
      case "Planned":
        return "bg-secondary-subtle text-secondary border-secondary";
      default:
        return "bg-light text-dark border";
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="section-head animate-slide-up">
        <div>
          <h1 className="page-title">Projects Portfolio</h1>
          <p className="page-subtitle">
            Showcase your best engineering accomplishments, tech stack, and live demos.
          </p>
        </div>
        <button
          className="btn btn-primary fw-bold"
          data-testid="add-project-button"
          onClick={() => {
            setForm(blank);
            setShow(true);
          }}
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {/* Statistics Row */}
      <div className="row g-3 mb-4 animate-fade-in animate-stagger-1">
        <div className="col-6 col-md-3">
          <div
            className={`card interactive-card p-3 text-center ${statusFilter === "" ? "border-primary" : ""}`}
            onClick={() => setStatusFilter("")}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center justify-content-center mb-1">
              <span className="p-2 rounded bg-primary-subtle text-primary">
                <FiFolder size={18} />
              </span>
            </div>
            <h4 className="h5 fw-bold mb-0">{projectStats.total}</h4>
            <span className="extra-small text-muted fw-semibold text-uppercase">
              Total Projects
            </span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className={`card interactive-card p-3 text-center ${statusFilter === "Completed" ? "border-success" : ""}`}
            onClick={() => setStatusFilter("Completed")}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center justify-content-center mb-1">
              <span className="p-2 rounded bg-success-subtle text-success">
                <FiCheckCircle size={18} />
              </span>
            </div>
            <h4 className="h5 fw-bold mb-0 text-success">{projectStats.completed}</h4>
            <span className="extra-small text-muted fw-semibold text-uppercase">
              Completed
            </span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className={`card interactive-card p-3 text-center ${statusFilter === "In Progress" ? "border-warning" : ""}`}
            onClick={() => setStatusFilter("In Progress")}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center justify-content-center mb-1">
              <span className="p-2 rounded bg-warning-subtle text-warning">
                <FiClock size={18} />
              </span>
            </div>
            <h4 className="h5 fw-bold mb-0 text-warning">{projectStats.inProgress}</h4>
            <span className="extra-small text-muted fw-semibold text-uppercase">
              In Progress
            </span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className={`card interactive-card p-3 text-center ${statusFilter === "Featured" ? "border-warning" : ""}`}
            onClick={() => setStatusFilter("Featured")}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center justify-content-center mb-1">
              <span className="p-2 rounded bg-warning-subtle text-warning">
                <FiStar size={18} />
              </span>
            </div>
            <h4 className="h5 fw-bold mb-0 text-warning">{projectStats.featured}</h4>
            <span className="extra-small text-muted fw-semibold text-uppercase">
              Featured Starred
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filter Tabs & View Toggle */}
      <div className="projects-toolbar animate-fade-in animate-stagger-2">
        <div className="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
          <div className="input-group search-box" style={{ maxWidth: "320px" }}>
            <span className="input-group-text">
              <FiSearch />
            </span>
            <input
              className="form-control"
              placeholder="Search projects..."
              data-testid="projects-search-input"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Filter Pills */}
          <div className="project-filter-pills">
            {["All", "Completed", "In Progress", "Planned", "Featured"].map((tab) => {
              const active =
                (tab === "All" && statusFilter === "") || statusFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  className={`project-filter-pill ${active ? "active" : ""}`}
                  onClick={() => {
                    setStatusFilter(tab === "All" ? "" : tab);
                    setPage(1);
                  }}
                >
                  {tab === "Featured" && <FiStar className="me-1" />}
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid / List View Toggle */}
        <div className="view-mode-toggle">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <FiGrid /> Grid
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <FiList /> List
          </button>
        </div>
      </div>

      {/* Projects Display Container */}
      {viewMode === "grid" ? (
        /* GRID VIEW */
        filtered.length ? (
          <div className="row g-4 animate-fade-in animate-stagger-3">
            {filtered.map((p) => (
              <div className="col-md-6 col-xl-4" key={p._id}>
                <div
                  className="project-card"
                  onClick={() => setPreviewProject(p)}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <div className="project-card-header">
                      <div className="project-folder-icon">
                        <FiFolder />
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className={`star-btn ${p.featured ? "active" : ""}`}
                          onClick={(e) => handleToggleFeatured(p, e)}
                          title={p.featured ? "Unstar" : "Star as featured"}
                        >
                          <FiStar />
                        </button>
                        <span className={`badge extra-small border ${getStatusBadge(p.status)}`}>
                          {p.status || "Completed"}
                        </span>
                        <button
                          type="button"
                          className="icon-btn p-1"
                          data-testid={`edit-project-${p._id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setForm({
                              ...p,
                              techStack: Array.isArray(p.techStack)
                                ? p.techStack.join(", ")
                                : "",
                            });
                            setShow(true);
                          }}
                          title="Edit"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn text-danger p-1"
                          data-testid={`delete-project-${p._id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDel(p);
                          }}
                          title="Delete"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h5 className="project-title" data-testid={`project-title-${p._id}`}>
                      {p.title}
                    </h5>
                    <p className="project-desc">{p.description}</p>

                    {/* Tech Stack Pills */}
                    {p.techStack && p.techStack.length > 0 && (
                      <div className="techs">
                        {p.techStack.slice(0, 5).map((t, i) => (
                          <span key={i}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="project-card-footer">
                    <span className="extra-small text-muted">
                      Click card for details
                    </span>
                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-btn"
                          title="GitHub Code"
                        >
                          <FiGithub /> Code
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-btn text-primary"
                          title="Live Demo"
                        >
                          <FiExternalLink /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects found"
            text="Add your portfolio projects to showcase your technical expertise."
          />
        )
      ) : (
        /* LIST VIEW */
        <div className="card shadow-sm border-0 p-3 animate-fade-in animate-stagger-3">
          {filtered.length ? (
            <div>
              {filtered.map((p) => (
                <div
                  key={p._id}
                  className="project-list-row"
                  onClick={() => setPreviewProject(p)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="project-folder-icon" style={{ width: 34, height: 34 }}>
                      <FiFolder size={16} />
                    </div>
                    <div>
                      <strong className="d-block">{p.title}</strong>
                      <span className="text-muted extra-small">
                        {p.techStack?.slice(0, 4).join(" • ") || "No tags"}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <span className={`badge extra-small border ${getStatusBadge(p.status)}`}>
                      {p.status || "Completed"}
                    </span>
                    <div className="d-flex align-items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="icon-btn"
                          title="GitHub"
                        >
                          <FiGithub />
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="icon-btn text-primary"
                          title="Live Demo"
                        >
                          <FiExternalLink />
                        </a>
                      )}
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setForm({
                            ...p,
                            techStack: Array.isArray(p.techStack)
                              ? p.techStack.join(", ")
                              : "",
                          });
                          setShow(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        type="button"
                        className="icon-btn text-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDel(p);
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No projects found"
              text="Add your portfolio projects to showcase your technical expertise."
            />
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}

      {/* Add / Edit Project Dialog */}
      <Dialog
        show={show}
        onClose={() => setShow(false)}
        title={form._id ? "Edit Project" : "Add New Project"}
      >
        <form onSubmit={save} className="p-4">
          <div className="mb-3">
            <label className="form-label">Project Title *</label>
            <input
              className="form-control"
              data-testid="project-title-input"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. DevBoard - Developer Command Center"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description *</label>
            <textarea
              className="form-control"
              data-testid="project-description-input"
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe key architecture, problems solved, and accomplishments..."
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tech Stack (comma separated)</label>
            <input
              className="form-control"
              data-testid="project-tech-input"
              value={form.techStack}
              onChange={(e) => set("techStack", e.target.value)}
              placeholder="React, TypeScript, Node.js, MongoDB"
            />
            {form.techStack && (
              <div className="techs mt-2">
                {form.techStack
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
              </div>
            )}
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label">Live URL</label>
              <input
                className="form-control"
                data-testid="project-live-input"
                value={form.liveUrl}
                onChange={(e) => set("liveUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">GitHub Repository URL</label>
              <input
                className="form-control"
                data-testid="project-github-input"
                value={form.githubUrl}
                onChange={(e) => set("githubUrl", e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                data-testid="project-status-select"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Planned">Planned</option>
              </select>
            </div>

            <div className="col-12 col-md-6 d-flex align-items-center pt-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="featuredCheck"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                />
                <label className="form-check-label fw-semibold" htmlFor="featuredCheck">
                  Feature on top of portfolio ⭐
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              data-testid="save-project-button"
            >
              Save Project
            </button>
          </div>
        </form>
      </Dialog>

      {/* Project Details Preview Modal */}
      {previewProject && (
        <Dialog
          show={!!previewProject}
          onClose={() => setPreviewProject(null)}
          title={previewProject.title}
        >
          <div className="p-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className={`badge border ${getStatusBadge(previewProject.status)}`}>
                {previewProject.status || "Completed"}
              </span>
              {previewProject.featured && (
                <span className="badge bg-warning-subtle text-warning border border-warning">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h6 className="fw-bold mb-2">About Project</h6>
            <p className="text-secondary" style={{ lineHeight: 1.6 }}>
              {previewProject.description}
            </p>

            <h6 className="fw-bold mb-2 mt-4">Technologies</h6>
            <div className="techs mb-4">
              {previewProject.techStack?.map((t, idx) => (
                <span key={idx} className="p-2 px-3 fs-7">
                  {t}
                </span>
              ))}
            </div>

            <div className="d-flex gap-2 pt-3 border-top">
              {previewProject.liveUrl && (
                <a
                  href={previewProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <FiExternalLink /> Launch Demo
                </a>
              )}
              {previewProject.githubUrl && (
                <a
                  href={previewProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <FiGithub /> View Source Code
                </a>
              )}
              <button
                type="button"
                className="btn btn-light btn-sm ms-auto"
                onClick={() => setPreviewProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {del && (
        <Dialog
          show={!!del}
          onClose={() => setDel(null)}
          title="Delete Project"
        >
          <div className="p-4">
            <p className="mb-4">
              Are you sure you want to permanently delete project{" "}
              <strong>{del.title}</strong>? This action cannot be undone.
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDel(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(del._id)}
              >
                Delete Project
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </Layout>
  );
}
