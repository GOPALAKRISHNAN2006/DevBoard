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
  const [form, setForm] = useState(blank);
  const [show, setShow] = useState(false);
  const [del, setDel] = useState(null);

  const debouncedQ = useDebounce(q, 350);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams({ page, limit: 6 });
      if (debouncedQ) params.append("search", debouncedQ);
      if (statusFilter) params.append("status", statusFilter);

      const { data } = await api.get(`/project?${params.toString()}`);
      setItems(data.projects || []);
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

    return {
      total: list.length,
      completed,
      inProgress,
      planned,
    };
  }, [items]);

  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

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
      toast.success("Project saved");
      setShow(false);
      setForm(blank);
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Unable to save project");
    }
  };

  if (items === null)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

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
      <div className="section-head">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Showcase the work you are proud of.</p>
        </div>
        <button
          className="btn btn-primary fw-bold d-flex align-items-center gap-1"
          data-testid="add-project-button"
          onClick={() => {
            setForm(blank);
            setShow(true);
          }}
        >
          <FiPlus /> Add project
        </button>
      </div>

      {/* Statistics Row */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 bg-white p-3 text-center">
            <div className="d-flex align-items-center justify-content-center mb-1">
              <span className="p-2 rounded bg-primary-subtle text-primary">
                <FiFolder size={18} />
              </span>
            </div>
            <h4 className="h5 fw-bold mb-0 text-dark">{projectStats.total}</h4>
            <span className="extra-small text-muted fw-semibold text-uppercase">Total Projects</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 bg-white p-3 text-center">
            <div className="d-flex align-items-center justify-content-center mb-1">
              <span className="p-2 rounded bg-success-subtle text-success">
                <FiCheckCircle size={18} />
              </span>
            </div>
            <h4 className="h5 fw-bold mb-0 text-dark">{projectStats.completed}</h4>
            <span className="extra-small text-muted fw-semibold text-uppercase">Completed</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 bg-white p-3 text-center">
            <div className="d-flex align-items-center justify-content-center mb-1">
              <span className="p-2 rounded bg-warning-subtle text-warning">
                <FiClock size={18} />
              </span>
            </div>
            <h4 className="h5 fw-bold mb-0 text-dark">{projectStats.inProgress}</h4>
            <span className="extra-small text-muted fw-semibold text-uppercase">In Progress</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 bg-white p-3 text-center">
            <div className="d-flex align-items-center justify-content-center mb-1">
              <span className="p-2 rounded bg-secondary-subtle text-secondary">
                <FiList size={18} />
              </span>
            </div>
            <h4 className="h5 fw-bold mb-0 text-dark">{projectStats.planned}</h4>
            <span className="extra-small text-muted fw-semibold text-uppercase">Planned</span>
          </div>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="card shadow-sm border-0 bg-white p-4">
        {/* Search & Filter Bar */}
        <div className="d-flex gap-2 mb-4">
          <div className="input-group search-box flex-grow-1">
            <span className="input-group-text bg-light border-end-0">
              <FiSearch className="text-muted" />
            </span>
            <input
              className="form-control border-start-0"
              placeholder="Search projects..."
              data-testid="projects-search-input"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="form-select w-auto"
            data-testid="projects-status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
          </select>
        </div>

        {/* Project Cards Grid */}
        {filtered.length ? (
          <div className="row g-3">
            {filtered.map((p) => (
              <div className="col-md-6 col-xl-4" key={p._id}>
                <div className="project-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="folder">&lt;/&gt;</span>
                      <div className="d-flex align-items-center gap-2">
                        <span className={`badge extra-small border ${getStatusBadge(p.status)}`}>
                          {p.status || "Completed"}
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-link p-0 text-muted"
                          data-testid={`edit-project-${p._id}`}
                          onClick={() => {
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
                          className="btn btn-sm btn-link p-0 text-danger"
                          data-testid={`delete-project-${p._id}`}
                          onClick={() => setDel(p)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>

                    <h5 className="fw-bold text-dark h6 mb-1">{p.title}</h5>
                    <p className="text-secondary small mb-2 text-justify" style={{ lineHeight: "1.4" }}>
                      {p.description}
                    </p>

                    <div className="techs">
                      {p.techStack?.map((x) => (
                        <span key={x}>{x}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-top d-flex gap-3 extra-small fw-semibold">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-decoration-none text-dark d-flex align-items-center gap-1">
                        Code <FiExternalLink />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-decoration-none text-primary d-flex align-items-center gap-1">
                        Live demo <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects found"
            text="Create a project to bring your portfolio to life."
          />
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Add / Edit Dialog Modal */}
      <Dialog
        show={show}
        onClose={() => setShow(false)}
        title={`${form._id ? "Edit" : "Add"} project`}
      >
        <form onSubmit={save} className="p-4" data-testid="project-form">
          <label className="form-label small fw-semibold">Project title</label>
          <input
            className="form-control mb-3"
            data-testid="project-title-input"
            value={form.title || ""}
            onChange={(e) => set("title", e.target.value)}
            required
          />
          <label className="form-label small fw-semibold">Description</label>
          <textarea
            className="form-control mb-3"
            data-testid="project-description-input"
            rows="3"
            value={form.description || ""}
            onChange={(e) => set("description", e.target.value)}
            required
          />
          <label className="form-label small fw-semibold">
            Tech stack <small className="text-muted">(comma separated)</small>
          </label>
          <input
            className="form-control mb-3"
            data-testid="project-techstack-input"
            value={form.techStack || ""}
            onChange={(e) => set("techStack", e.target.value)}
          />
          <label className="form-label small fw-semibold">GitHub URL</label>
          <input
            className="form-control mb-3"
            data-testid="project-github-input"
            value={form.githubUrl || ""}
            onChange={(e) => set("githubUrl", e.target.value)}
          />
          <label className="form-label small fw-semibold">Status</label>
          <select
            className="form-select mb-3"
            data-testid="project-status-select"
            value={form.status || "Completed"}
            onChange={(e) => set("status", e.target.value)}
          >
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
          </select>
          <label className="form-label small fw-semibold">Live URL</label>
          <input
            className="form-control"
            data-testid="project-liveurl-input"
            value={form.liveUrl || ""}
            onChange={(e) => set("liveUrl", e.target.value)}
          />
          <div className="text-end mt-4">
            <button
              type="button"
              className="btn btn-light me-2 fw-semibold"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary fw-semibold"
              data-testid="save-project-button"
            >
              Save project
            </button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog Modal */}
      <Dialog show={!!del} onClose={() => setDel(null)} title="Delete project?">
        <div className="p-4">
          <p className="text-muted small">Are you sure you want to delete this project? This action cannot be undone.</p>
          <div className="text-end mt-3">
            <button className="btn btn-light me-2 fw-semibold" onClick={() => setDel(null)}>
              Cancel
            </button>
            <button
              className="btn btn-danger fw-semibold"
              data-testid="delete-project-button"
              onClick={async () => {
                try {
                  await api.delete(`/project/${del._id}`);
                  toast.success("Project deleted");
                  setDel(null);
                  load();
                } catch {
                  toast.error("Unable to delete project");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </Layout>
  );
}
