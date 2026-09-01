import React from 'react';
import { FiRefreshCw, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const ResumeComparison = ({ comparison = {}, onOpenSyncModal }) => {
  const {
    headlineMatch = false,
    skills = {},
    projects = {},
    certifications = {},
    links = {},
  } = comparison;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div>
          <h3 className="h6 fw-bold text-dark text-uppercase mb-1">Resume ↔ LinkedIn Alignment</h3>
          <p className="text-muted small mb-0">Compare DevBoard Resume data against LinkedIn Profile</p>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-primary fw-bold d-flex align-items-center gap-1"
          onClick={onOpenSyncModal}
        >
          <FiRefreshCw /> Sync From Resume
        </button>
      </div>

      <div className="row g-3">
        {/* Headline */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="p-3 bg-light rounded border h-100">
            <span className="extra-small text-muted fw-bold text-uppercase d-block mb-1">Headline Alignment</span>
            {headlineMatch ? (
              <span className="badge bg-success-subtle text-success d-inline-flex align-items-center gap-1">
                <FiCheckCircle /> Matched Target Role
              </span>
            ) : (
              <span className="badge bg-warning-subtle text-warning d-inline-flex align-items-center gap-1">
                <FiAlertCircle /> Target Role Differs
              </span>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="p-3 bg-light rounded border h-100">
            <span className="extra-small text-muted fw-bold text-uppercase d-block mb-1">Skills Comparison</span>
            <div className="small fw-semibold text-dark">
              Resume: {skills.resumeCount || 0} | LinkedIn: {skills.profileCount || 0}
            </div>
            {skills.missingFromProfile && skills.missingFromProfile.length > 0 ? (
              <span className="extra-small text-danger d-block mt-1">
                ⚠ {skills.missingFromProfile.length} missing from profile
              </span>
            ) : (
              <span className="extra-small text-success d-block mt-1">✓ Skills aligned</span>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="p-3 bg-light rounded border h-100">
            <span className="extra-small text-muted fw-bold text-uppercase d-block mb-1">Featured Projects</span>
            <div className="small fw-semibold text-dark">
              Resume: {projects.resumeCount || 0} | LinkedIn: {projects.profileCount || 0}
            </div>
            {projects.missingProjects && projects.missingProjects.length > 0 ? (
              <span className="extra-small text-warning d-block mt-1">
                ⚠ {projects.missingProjects.length} missing projects
              </span>
            ) : (
              <span className="extra-small text-success d-block mt-1">✓ Projects aligned</span>
            )}
          </div>
        </div>

        {/* Certifications */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="p-3 bg-light rounded border h-100">
            <span className="extra-small text-muted fw-bold text-uppercase d-block mb-1">Certifications</span>
            <div className="small fw-semibold text-dark">
              Resume: {certifications.resumeCount || 0} | LinkedIn: {certifications.profileCount || 0}
            </div>
            {certifications.missingCerts && certifications.missingCerts.length > 0 ? (
              <span className="extra-small text-warning d-block mt-1">
                ⚠ {certifications.missingCerts.length} missing certs
              </span>
            ) : (
              <span className="extra-small text-success d-block mt-1">✓ Certifications aligned</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeComparison;
