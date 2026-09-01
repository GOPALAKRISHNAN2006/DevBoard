import React, { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiSearch,
  FiMapPin,
  FiArchive,
  FiTrash2,
  FiTag,
  FiX,
  FiSave,
  FiEdit3,
} from "react-icons/fi";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import EmptyState from "../../components/EmptyState";
import useDebounce from "../../hooks/useDebounce";
import "./Notes.css";

// Memoized Note Item Component to avoid unnecessary DOM operations
const NoteItem = React.memo(({ note, isActive, onOpen, onToggle, onDelete }) => {
  return (
    <div
      className={`note-item ${isActive ? "selected" : ""}`}
      data-testid={`note-item-${note._id}`}
      onClick={() => onOpen(note)}
    >
      <div className="note-item-header">
        <span className="note-item-title">{note.title || "Untitled"}</span>
        <div className="note-item-actions">
          {note.isPinned && <FiMapPin className="pin-indicator text-warning" />}
          <button
            type="button"
            className="note-action-btn"
            data-testid={`edit-note-button-${note._id}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(note);
            }}
            title="Edit note"
            aria-label={`Edit ${note.title || "note"}`}
          >
            <FiEdit3 />
          </button>
          <button
            type="button"
            className="note-action-btn"
            data-testid={`pin-note-button-${note._id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(note, "isPinned");
            }}
            title={note.isPinned ? "Unpin" : "Pin"}
          >
            <FiMapPin />
          </button>
          <button
            type="button"
            className="note-action-btn"
            data-testid={`archive-note-button-${note._id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(note, "isArchived");
            }}
            title={note.isArchived ? "Unarchive" : "Archive"}
          >
            <FiArchive />
          </button>
          <button
            type="button"
            className="note-action-btn danger"
            data-testid={`delete-note-button-${note._id}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note);
            }}
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      <p className="note-item-preview">
        {note.content?.slice(0, 80) || "No content…"}
      </p>
      {note.tags?.length > 0 && (
        <div className="note-item-tags">
          {note.tags.slice(0, 3).map((t) => (
            <span key={t} className="note-tag">
              {t}
            </span>
          ))}
        </div>
      )}
      <span className="note-item-date">
        {new Date(note.updatedAt).toLocaleDateString()}
      </span>
    </div>
  );
});

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 350);
  const [filter, setFilter] = useState("active");
  const [active, setActive] = useState(null); // note being edited
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [loading, setLoading] = useState(true);
  const saveTimeout = useRef(null);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get(
        `/notes?search=${debouncedSearch}&filter=${filter}`
      );
      setNotes(Array.isArray(data) ? data : []);
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const openNote = useCallback((note) => {
    setIsNew(false);
    setActive(note);
    setForm({
      title: note.title,
      content: note.content,
      tags: note.tags?.join(", ") || "",
    });
  }, []);

  const openNew = useCallback(() => {
    setIsNew(true);
    setActive(null);
    setForm({ title: "", content: "", tags: "" });
  }, []);

  const save = async () => {
    const body = {
      title: form.title || "Untitled",
      content: form.content || "",
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (isNew) {
        const { data } = await api.post("/notes", body);
        toast.success("Note created");
        setIsNew(false);
        setActive(data.note);
        load();
      } else if (active) {
        const { data } = await api.put(`/notes/${active._id}`, body);
        toast.success("Saved");
        setActive(data.note);
        load();
      }
    } catch {
      toast.error("Could not save note");
    }
  };

  const autoSave = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      if (!isNew && active) {
        api
          .put(`/notes/${active._id}`, {
            title: field === "title" ? value : form.title,
            content: field === "content" ? value : form.content,
            tags: (field === "tags" ? value : form.tags)
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          })
          .catch(() => {});
      }
    }, 1200);
  };

  const toggle = useCallback(
    async (note, field) => {
      try {
        await api.put(`/notes/${note._id}`, { [field]: !note[field] });
        load();
        if (active?._id === note._id)
          setActive((n) => ({ ...n, [field]: !n[field] }));
      } catch {
        toast.error("Failed to update note");
      }
    },
    [load, active]
  );

  const remove = useCallback(
    async (note) => {
      if (!window.confirm("Delete this note?")) return;
      try {
        await api.delete(`/notes/${note._id}`);
        toast.success("Note deleted");
        if (active?._id === note._id) {
          setActive(null);
          setIsNew(false);
        }
        load();
      } catch {
        toast.error("Could not delete note");
      }
    },
    [load, active]
  );

  const close = () => {
    setActive(null);
    setIsNew(false);
  };

  return (
    <Layout>
      <div className="notes-page">
        {/* Sidebar */}
        <aside className="notes-sidebar">
          <div className="notes-sidebar-header">
            <h1 className="page-title">Notes</h1>
            <button
              type="button"
              className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
              onClick={openNew}
              data-testid="new-note-button"
            >
              <FiPlus /> New
            </button>
          </div>

          <div className="notes-search">
            <FiSearch className="notes-search-icon" />
            <input
              className="form-control"
              placeholder="Search notes…"
              data-testid="notes-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="notes-filters">
            {["active", "archived"].map((f) => (
              <button
                type="button"
                key={f}
                className={`filter-pill ${filter === f ? "active" : ""}`}
                data-testid={`notes-filter-${f}`}
                onClick={() => setFilter(f)}
              >
                {f === "active" ? "All Notes" : "Archived"}
              </button>
            ))}
          </div>

          <div className="notes-list">
            {loading ? (
              <div className="notes-skeleton">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="note-skeleton-item p-3 bg-light rounded mb-2" />
                ))}
              </div>
            ) : notes.length === 0 ? (
              <EmptyState
                title="No notes found"
                text="Create your first note."
              />
            ) : (
              notes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  isActive={active?._id === note._id}
                  onOpen={openNote}
                  onToggle={toggle}
                  onDelete={remove}
                />
              ))
            )}
          </div>
        </aside>

        {/* Editor */}
        <main className="notes-editor">
          {active || isNew ? (
            <>
              <div className="editor-toolbar">
                <input
                  className="editor-title"
                  placeholder="Note title…"
                  data-testid="note-title-input"
                  value={form.title}
                  onChange={(e) => autoSave("title", e.target.value)}
                />
                <div className="editor-toolbar-actions d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
                    data-testid="save-note-button"
                    onClick={save}
                  >
                    <FiSave /> Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-sm fw-bold"
                    data-testid="close-note-button"
                    onClick={close}
                  >
                    <FiX />
                  </button>
                </div>
              </div>

              <div className="editor-meta">
                <div className="editor-tags-row">
                  <FiTag className="tag-icon text-muted" />
                  <input
                    className="editor-tags-input"
                    placeholder="Tags (comma separated)…"
                    data-testid="note-tags-input"
                    value={form.tags}
                    onChange={(e) => autoSave("tags", e.target.value)}
                  />
                </div>
              </div>

              <textarea
                className="editor-body"
                placeholder="Start writing your note… (Markdown supported)"
                data-testid="note-content-input"
                value={form.content}
                onChange={(e) => autoSave("content", e.target.value)}
                spellCheck
              />
            </>
          ) : (
            <div className="editor-empty">
              <FiEdit3 size={40} className="mb-2 text-muted" />
              <h3 className="h5 fw-bold text-dark mb-1">Select or create a note</h3>
              <p className="small text-muted mb-3">
                Pick a note from the list or hit <strong>New</strong> to start writing.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
                onClick={openNew}
              >
                <FiPlus /> New Note
              </button>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
