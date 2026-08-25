/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiSearch,
  FiX,
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


  const [items, setItems] = useState(null),
    [q, setQ] = useState(""),
    [statusFilter, setStatusFilter] = useState(""),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [form, setForm] = useState(blank),
    [show, setShow] = useState(false),
    [del, setDel] = useState(null);

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
  return (
    <Layout>
      <div className="section-head">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Showcase the work you are proud of.</p>
        </div>
        <button
          className="btn btn-primary"
          data-testid="add-project-button"
          onClick={() => {
            setForm(blank);
            setShow(true);
          }}
        >
          <FiPlus /> Add project
        </button>
      </div>
      <div className="card p-3">
        <div className="d-flex gap-2 mb-3">
          <div className="input-group search-box flex-grow-1">
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
          <select 
            className="form-select w-auto" data-testid="projects-status-filter" 
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
        {filtered.length ? (
          <div className="row g-3">
            {filtered.map((p) => (
              <div className="col-md-6 col-xl-4" key={p._id}>
                <div className="project-card">
                  <div className="d-flex justify-content-between">
                    <span className="folder">&lt;/&gt;</span>
                    <div>
                      <button  data-testid={`edit-project-${p._id}`}
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
                      <button  data-testid={`delete-project-${p._id}`} onClick={() => setDel(p)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <h5>{p.title}</h5>
                  <p>{p.description}</p>
                  <div className="techs">
                    {p.techStack?.map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                  <div className="mt-3">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank">
                        Code <FiExternalLink />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank">
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
      <Dialog
        show={show}
        onClose={() => setShow(false)}
        title={`${form._id ? "Edit" : "Add"} project`}
      >
        <form onSubmit={save} className="p-4" data-testid="project-form">
          <label>Project title</label>
          <input
            className="form-control mb-3"
            data-testid="project-title-input"
            value={form.title || ""}
            onChange={(e) => set("title", e.target.value)}
            required
          />
          <label>Description</label>
          <textarea
            className="form-control mb-3"
             data-testid="project-description-input"
            rows="3"
            value={form.description || ""}
            onChange={(e) => set("description", e.target.value)}
            required
          />
          <label>
            Tech stack <small className="text-muted">(comma separated)</small>
          </label>
          <input
            className="form-control mb-3"
            data-testid="project-techstack-input"
            value={form.techStack || ""}
            onChange={(e) => set("techStack", e.target.value)}
          />
          <label>GitHub URL</label>
          <input
            className="form-control mb-3"
              data-testid="project-github-input"
            value={form.githubUrl || ""}
            onChange={(e) => set("githubUrl", e.target.value)}
          />
          <label>Status</label>
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
          <label>Live URL</label>
          <input
            className="form-control"
            data-testid="project-liveurl-input"
            value={form.liveUrl || ""}
            onChange={(e) => set("liveUrl", e.target.value)}
          />
          <div className="text-end mt-4">
            <button
              type="button"
              className="btn btn-light me-2"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" data-testid="save-project-button">Save project</button>
          </div>
        </form>
      </Dialog>
      <Dialog show={!!del} onClose={() => setDel(null)} title="Delete project?">
        <div className="p-4">
          <p className="text-muted">This action cannot be undone.</p>
          <button className="btn btn-light me-2" onClick={() => setDel(null)}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
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
      </Dialog>
    </Layout>
  );
}
