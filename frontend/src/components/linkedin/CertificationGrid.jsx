import React from 'react';
import { FiAward, FiExternalLink, FiPlus, FiEdit3 } from 'react-icons/fi';

const CertificationGrid = ({ certifications = [], onOpenEditModal }) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">Certifications</h3>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenEditModal}
        >
          <FiEdit3 /> Manage Certifications
        </button>
      </div>

      {!certifications || certifications.length === 0 ? (
        <div className="text-center py-4 bg-light rounded border">
          <FiAward className="fs-1 text-muted mb-2" />
          <p className="text-muted small mb-2">No certifications added.</p>
          <button type="button" className="btn btn-sm btn-primary" onClick={onOpenEditModal}>
            <FiPlus /> Add Certification
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {certifications.map((cert, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="h6 fw-bold text-dark mb-1">{cert.name}</h4>
                  <span className="fw-semibold text-secondary small d-block mb-1">{cert.organization}</span>
                  {cert.issueDate && <span className="extra-small text-muted d-block mb-2">Issued: {cert.issueDate}</span>}
                </div>

                {cert.credentialUrl && (
                  <div className="mt-2 pt-2 border-top">
                    <a
                      href={cert.credentialUrl.startsWith('http') ? cert.credentialUrl : `https://${cert.credentialUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary py-0 px-2 fw-semibold"
                      style={{ fontSize: '0.75rem' }}
                    >
                      View Credential <FiExternalLink />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationGrid;
