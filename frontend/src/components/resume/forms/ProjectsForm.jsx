import React, { useState } from 'react';
import { FaFolderOpen, FaPlus, FaTrash, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../../api/axios';

/**
 * Projects Form Section with DevBoard Projects import integration
 */
const ProjectsForm = ({ projects = [], onChange }) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [dbProjects, setDbProjects] = useState([]);
  const [loadingDbProjects, setLoadingDbProjects] = useState(false);

  const activeProjects = Array.isArray(projects) ? projects : [];

  const handleAdd = () => {
    onChange([
      ...activeProjects,
      {
        name: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveDemoUrl: '',
        startDate: '',
        endDate: '',
        achievements: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    onChange(activeProjects.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...activeProjects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const fetchDevBoardProjects = async () => {
    try {
      setLoadingDbProjects(true);
      const res = await api.get('/project');
      setDbProjects(res.data || []);
      setShowImportModal(true);
    } catch (err) {
      console.error('Fetch projects error:', err);
      toast.error('Failed to load DevBoard projects');
    } finally {
      setLoadingDbProjects(false);
    }
  };

  const handleImportProject = (proj) => {
    const techStr = Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack || '';
    const newEntry = {
      name: proj.title || '',
      description: proj.description || '',
      technologies: techStr,
      githubUrl: proj.githubUrl || '',
      liveDemoUrl: proj.liveUrl || '',
      startDate: '',
      endDate: proj.status === 'Completed' ? 'Completed' : 'In Progress',
      achievements: '',
    };

    onChange([...activeProjects, newEntry]);
    toast.success(`Imported "${proj.title}" into resume!`);
    setShowImportModal(false);
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <FaFolderOpen className="text-primary" /> Key Projects
        </h6>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
            onClick={fetchDevBoardProjects}
          >
            <FaDownload /> Import DevBoard Project
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" onClick={handleAdd}>
            <FaPlus /> Add Project
          </button>
        </div>
      </div>

      {/* DevBoard Import Modal */}
      {showImportModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title h6 fw-bold">Import From Saved DevBoard Projects</h5>
                <button type="button" className="btn-close" onClick={() => setShowImportModal(false)}></button>
              </div>
              <div className="modal-body p-3">
                {loadingDbProjects ? (
                  <div className="text-center py-3">Loading projects...</div>
                ) : dbProjects.length === 0 ? (
                  <div className="text-muted text-center py-3">No DevBoard projects found in your portfolio.</div>
                ) : (
                  <div className="list-group">
                    {dbProjects.map((p) => (
                      <button
                        key={p._id}
                        type="button"
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2"
                        onClick={() => handleImportProject(p)}
                      >
                        <div>
                          <div className="fw-bold small">{p.title}</div>
                          <div className="extra-small text-muted">{p.description?.slice(0, 70)}...</div>
                        </div>
                        <span className="btn btn-sm btn-primary">Import</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="modal-footer p-2">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowImportModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeProjects.length === 0 ? (
        <div className="text-muted small text-center py-2">No project entries added.</div>
      ) : (
        activeProjects.map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded border mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-1">
              <span className="fw-bold small text-secondary">Project #{idx + 1}</span>
              <button type="button" className="btn btn-outline-danger btn-sm py-0 px-2" onClick={() => handleRemove(idx)}>
                <FaTrash className="extra-small" /> Remove
              </button>
            </div>

            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Project Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Smart Scholarship Management System"
                  value={item.name || ''}
                  onChange={(e) => handleChange(idx, 'name', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Technologies Used</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. React, Node.js, Express, MongoDB"
                  value={item.technologies || ''}
                  onChange={(e) => handleChange(idx, 'technologies', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">GitHub Repository URL</label>
                <input
                  type="url"
                  className="form-control form-control-sm"
                  placeholder="e.g. https://github.com/user/project"
                  value={item.githubUrl || ''}
                  onChange={(e) => handleChange(idx, 'githubUrl', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Live Demo URL</label>
                <input
                  type="url"
                  className="form-control form-control-sm"
                  placeholder="e.g. https://project.vercel.app"
                  value={item.liveDemoUrl || ''}
                  onChange={(e) => handleChange(idx, 'liveDemoUrl', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Start Date</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Jan 2024"
                  value={item.startDate || ''}
                  onChange={(e) => handleChange(idx, 'startDate', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">End Date</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Mar 2024"
                  value={item.endDate || ''}
                  onChange={(e) => handleChange(idx, 'endDate', e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold mb-1">Project Description</label>
                <textarea
                  className="form-control form-control-sm"
                  rows="3"
                  placeholder="Built an automated portal processing 500+ applications daily with JWT authentication and role-based access control..."
                  value={item.description || ''}
                  onChange={(e) => handleChange(idx, 'description', e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectsForm;
