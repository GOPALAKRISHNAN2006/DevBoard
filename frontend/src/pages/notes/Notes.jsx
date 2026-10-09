import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  FiCheck,
  FiCode,
  FiList,
  FiBold,
  FiItalic,
  FiBookOpen,
} from "react-icons/fi";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import EmptyState from "../../components/EmptyState";
import useDebounce from "../../hooks/useDebounce";
import "./Notes.css";

// Memoized Note Item Component
const NoteItem = React.memo(({ note, isActive, onOpen, onToggle, onDelete }) => {
  return (
    <div
      className={`note-item ${isActive ? "selected" : ""}`}
      data-testid={`note-item-${note._id}`}
      onClick={() => onOpen(note)}
    >
      <div className="note-item-header">
        <span className="note-item-title">{note.title || "Untitled Note"}</span>
        <div className="note-item-actions">
          {note.isPinned && <FiMapPin className="text-warning me-1" size={13} />}
          <button
            type="button"
            className="note-action-btn"
            data-testid={`edit-note-button-${note._id}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(note);
            }}
            title="Edit note"
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
            title={note.isPinned ? "Unpin note" : "Pin note"}
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
        {note.content?.slice(0, 95) || "No content…"}
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
        {new Date(note.updatedAt || Date.now()).toLocaleDateString()}
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
  const [saveStatus, setSaveStatus] = useState("saved"); // "saved" | "saving"
  const [deleteModalNote, setDeleteModalNote] = useState(null);
  const saveTimeout = useRef(null);

  const load = useCallback(async () => {
    try {
      const apiFilter = filter === "archived" ? "archived" : "active";
      const { data } = await api.get(
        `/notes?search=${debouncedSearch}&filter=${apiFilter}`
      );
      let list = Array.isArray(data) ? data : [];
      if (filter === "pinned") {
        list = list.filter((n) => n.isPinned);
      }
      setNotes(list);

      // Auto-select first note if none active
      if (!active && !isNew && list.length > 0) {
        setActive(list[0]);
        setForm({
          title: list[0].title || "",
          content: list[0].content || "",
          tags: list[0].tags?.join(", ") || "",
        });
      }
    } catch {
      setNotes([]);
      toast.error("Could not load notes");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filter, active, isNew]);

  useEffect(() => {
    load();
  }, [load]);

  const openNote = useCallback((note) => {
    setIsNew(false);
    setActive(note);
    setForm({
      title: note.title || "",
      content: note.content || "",
      tags: note.tags?.join(", ") || "",
    });
    setSaveStatus("saved");
  }, []);

  const openNew = useCallback(() => {
    setIsNew(true);
    setActive(null);
    setForm({ title: "", content: "", tags: "" });
    setSaveStatus("saved");
  }, []);

  // Save explicitly
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
      setSaveStatus("saving");
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
      setSaveStatus("saved");
    } catch {
      toast.error("Could not save note");
      setSaveStatus("saved");
    }
  };

  // Debounced Auto-save
  const handleFieldChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setSaveStatus("saving");
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      if (!isNew && active) {
        try {
          await api.put(`/notes/${active._id}`, {
            title: field === "title" ? value : form.title,
            content: field === "content" ? value : form.content,
            tags: (field === "tags" ? value : form.tags)
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          });
          setSaveStatus("saved");
        } catch {
          setSaveStatus("saved");
        }
      } else {
        setSaveStatus("saved");
      }
    }, 1200);
  };

  // Formatting helpers to insert markdown snippets
  const insertFormatting = (prefix, suffix = "") => {
    const textarea = document.getElementById("note-editor-body");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.content;
    const selected = text.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    handleFieldChange("content", newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected.length || 4)
      );
    }, 50);
  };

  const toggle = useCallback(
    async (note, field) => {
      try {
        await api.put(`/notes/${note._id}`, { [field]: !note[field] });
        toast.success(`Note ${field === "isPinned" ? (note.isPinned ? "unpinned" : "pinned") : (note.isArchived ? "unarchived" : "archived")}`);
        load();
        if (active?._id === note._id)
          setActive((n) => ({ ...n, [field]: !n[field] }));
      } catch {
        toast.error("Failed to update note");
      }
    },
    [load, active]
  );

  const confirmDelete = async (note) => {
    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted");
      if (active?._id === note._id) {
        setActive(null);
        setIsNew(false);
      }
      setDeleteModalNote(null);
      load();
    } catch {
      toast.error("Could not delete note");
    }
  };

  // Compute Word & Character counts
  const wordCount = useMemo(() => {
    if (!form.content.trim()) return 0;
    return form.content.trim().split(/\s+/).length;
  }, [form.content]);

  return (
    <Layout>
      <div className="notes-page animate-slide-up">
        {/* Left Sidebar */}
        <aside className="notes-sidebar">
          <div className="notes-sidebar-header">
            <div>
              <h1 className="page-title fs-5 mb-0">Notes</h1>
              <span className="text-muted extra-small">{notes.length} items</span>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
              onClick={openNew}
              data-testid="new-note-button"
            >
              <FiPlus /> New Note
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
            {[
              ["active", "All"],
              ["pinned", "Pinned"],
              ["archived", "Archived"],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                className={`filter-pill ${filter === val ? "active" : ""}`}
                onClick={() => setFilter(val)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="notes-list">
            {notes.length === 0 ? (
              <div className="p-4 text-center text-muted extra-small">
                {search ? "No matching notes found." : "No notes yet. Create your first note above!"}
              </div>
            ) : (
              notes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  isActive={active?._id === note._id}
                  onOpen={openNote}
                  onToggle={toggle}
                  onDelete={(n) => setDeleteModalNote(n)}
                />
              ))
            )}
          </div>
        </aside>

        {/* Right Editor Area */}
        <main className="notes-editor">
          {active || isNew ? (
            <>
              {/* Editor Top Toolbar */}
              <div className="editor-toolbar">
                <div className="editor-actions-left">
                  <button
                    type="button"
                    className="format-btn"
                    title="Bold"
                    onClick={() => insertFormatting("**", "**")}
                  >
                    <FiBold />
                  </button>
                  <button
                    type="button"
                    className="format-btn"
                    title="Italic"
                    onClick={() => insertFormatting("*", "*")}
                  >
                    <FiItalic />
                  </button>
                  <button
                    type="button"
                    className="format-btn"
                    title="Code block"
                    onClick={() => insertFormatting("```\n", "\n```")}
                  >
                    <FiCode />
                  </button>
                  <button
                    type="button"
                    className="format-btn"
                    title="Bullet list"
                    onClick={() => insertFormatting("- ")}
                  >
                    <FiList />
                  </button>
                </div>

                <div className="editor-actions-right">
                  <div className="editor-status-badge">
                    <span
                      className={`editor-status-dot ${saveStatus === "saving" ? "saving" : ""}`}
                    />
                    <span>{saveStatus === "saving" ? "Saving..." : "Saved"}</span>
                  </div>

                  {active && (
                    <button
                      type="button"
                      className={`btn btn-sm ${active.isPinned ? "btn-warning" : "btn-light"}`}
                      onClick={() => toggle(active, "isPinned")}
                      title="Pin note"
                    >
                      <FiMapPin /> {active.isPinned ? "Pinned" : "Pin"}
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
                    onClick={save}
                    data-testid="save-note-button"
                  >
                    <FiSave /> Save
                  </button>
                </div>
              </div>

              {/* Title Input */}
              <input
                className="editor-title"
                placeholder="Note Title..."
                data-testid="note-title-input"
                value={form.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />

              {/* Tags Input */}
              <div className="editor-tags-row">
                <FiTag className="text-muted" size={14} />
                <input
                  className="editor-tags-input"
                  placeholder="Add tags separated by commas (e.g. Architecture, Interview, React)"
                  data-testid="note-tags-input"
                  value={form.tags}
                  onChange={(e) => handleFieldChange("tags", e.target.value)}
                />
              </div>

              {/* Body Textarea */}
              <textarea
                id="note-editor-body"
                className="editor-body"
                placeholder="Write your developer notes, snippets, system architecture thoughts..."
                data-testid="note-content-input"
                value={form.content}
                onChange={(e) => handleFieldChange("content", e.target.value)}
              />

              {/* Editor Meta Footer */}
              <div className="editor-footer-meta">
                <span>
                  {wordCount} words • {form.content.length} characters
                </span>
                <span>
                  Markdown syntax supported (*bold*, - lists, `code`)
                </span>
              </div>
            </>
          ) : (
            <div className="editor-empty">
              <FiBookOpen size={48} className="mb-3 opacity-50" />
              <h5 className="fw-bold">No Note Selected</h5>
              <p className="small text-muted mb-3">
                Select an existing note from the left sidebar or create a new scratchpad.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={openNew}
              >
                <FiPlus /> Create New Note
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalNote && (
        <div
          className="app-modal-backdrop"
          onMouseDown={() => setDeleteModalNote(null)}
        >
          <div className="app-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="app-modal-head">
              <h5>Delete Note</h5>
              <button type="button" onClick={() => setDeleteModalNote(null)}>
                <FiX />
              </button>
            </div>
            <div className="p-4">
              <p className="mb-4">
                Are you sure you want to delete{" "}
                <strong>{deleteModalNote.title || "this note"}</strong>?
              </p>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeleteModalNote(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => confirmDelete(deleteModalNote)}
                >
                  Delete Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
