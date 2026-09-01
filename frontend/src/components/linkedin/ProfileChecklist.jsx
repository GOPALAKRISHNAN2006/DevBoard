import React from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

const ProfileChecklist = ({ profile = {}, user = {}, onOpenEditModal }) => {
  const checklist = [
    { label: 'Profile Photo', done: !!user.avatar || !!profile.avatar },
    { label: 'Full Name', done: !!user.name || !!profile.name },
    { label: 'Professional Headline', done: !!profile.headline },
    { label: 'About Section', done: !!profile.about },
    { label: 'Skills List', done: (profile.skills || []).some((s) => s.items?.length > 0) },
    { label: 'Education', done: (profile.education || []).length > 0 },
    { label: 'Work Experience', done: (profile.experience || []).length > 0 },
    { label: 'Featured Projects', done: (profile.projects || []).length > 0 },
    { label: 'Certifications', done: (profile.certifications || []).length > 0 },
    { label: 'LinkedIn URL', done: !!user.linkedinUrl || !!profile.linkedinUrl },
    { label: 'GitHub URL', done: !!profile.githubUrl },
  ];

  const completedCount = checklist.filter((item) => item.done).length;

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-0">LinkedIn Profile Checklist</h3>
        <span className="badge bg-primary">
          {completedCount} / {checklist.length} Completed
        </span>
      </div>

      <div className="row g-2">
        {checklist.map((item, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4">
            <div
              className={`p-2 px-3 rounded border d-flex align-items-center justify-content-between cursor-pointer ${
                item.done ? 'bg-success-subtle border-success text-dark' : 'bg-light text-muted'
              }`}
              onClick={() => !item.done && onOpenEditModal()}
              title={item.done ? 'Completed' : 'Click to complete'}
            >
              <div className="d-flex align-items-center gap-2 small fw-semibold">
                {item.done ? (
                  <FiCheckSquare className="text-success fs-5" />
                ) : (
                  <FiSquare className="text-muted fs-5" />
                )}
                <span>{item.label}</span>
              </div>
              {!item.done && <span className="extra-small text-primary fw-bold">Add ↗</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileChecklist;
