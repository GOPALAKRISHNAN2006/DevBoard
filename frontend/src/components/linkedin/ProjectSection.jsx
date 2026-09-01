import React from 'react';
import { FiFolder, FiExternalLink, FiGithub, FiPlus, FiEdit3 } from 'react-icons/fi';

const ProjectSection = ({ projects = [], onOpenEditModal }) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Featured Projects</h3>
          <span className="badge bg-primary-subtle text-primary">{projects.length} Projects</span>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenEditModal}
        >
          <FiEdit3 /> Manage Projects
        </button>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="text-center py-4 bg-light rounded border">
          <FiFolder className="fs-1 text-muted mb-2" />
          <p className="text-muted small mb-2">No projects added to your LinkedIn profile data.</p>
          <button type="button" className="btn btn-sm btn-primary" onClick={onOpenEditModal}>
            <FiPlus /> Add Project
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {projects.map((proj, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="h6 fw-bold text-dark mb-1">{proj.name}</h4>
                  {proj.technologies && (
                    <span className="badge bg-white text-secondary border mb-2 d-inline-block">
                      {proj.technologies}
                    </span>
                  )}
                  {proj.description && (
                    <p className="text-secondary small mb-2 text-justify">{proj.description}</p>
                  )}
                </div>

                <div className="d-flex gap-2 mt-2 pt-2 border-top">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl.startsWith('http') ? proj.githubUrl : `https://${proj.githubUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-dark py-0 px-2 fw-semibold"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <FiGithub /> GitHub
                    </a>
                  )}
                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl.startsWith('http') ? proj.liveDemoUrl : `https://${proj.liveDemoUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary py-0 px-2 fw-semibold"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Live Demo <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
