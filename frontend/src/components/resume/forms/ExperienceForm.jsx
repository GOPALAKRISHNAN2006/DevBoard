import React from 'react';
import { FaBriefcase, FaPlus, FaTrash } from 'react-icons/fa';

/**
 * Work Experience Form Section
 */
const ExperienceForm = ({ experience = [], onChange }) => {
  const activeExp = Array.isArray(experience) ? experience : [];

  const handleAdd = () => {
    onChange([
      ...activeExp,
      {
        company: '',
        jobTitle: '',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        responsibilities: '',
        achievements: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    onChange(activeExp.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...activeExp];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <FaBriefcase className="text-primary" /> Work Experience
        </h6>
        <button type="button" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" onClick={handleAdd}>
          <FaPlus /> Add Experience
        </button>
      </div>

      {activeExp.length === 0 ? (
        <div className="text-muted small text-center py-2">No experience entries added.</div>
      ) : (
        activeExp.map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded border mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-1">
              <span className="fw-bold small text-secondary">Experience #{idx + 1}</span>
              <button type="button" className="btn btn-outline-danger btn-sm py-0 px-2" onClick={() => handleRemove(idx)}>
                <FaTrash className="extra-small" /> Remove
              </button>
            </div>

            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Company / Organization</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Acme Tech Corp"
                  value={item.company || ''}
                  onChange={(e) => handleChange(idx, 'company', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Job Title</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Software Engineer Intern"
                  value={item.jobTitle || ''}
                  onChange={(e) => handleChange(idx, 'jobTitle', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">Location</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Remote / Bengaluru"
                  value={item.location || ''}
                  onChange={(e) => handleChange(idx, 'location', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">Start Date</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Jan 2023"
                  value={item.startDate || ''}
                  onChange={(e) => handleChange(idx, 'startDate', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">End Date</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Dec 2023"
                  disabled={item.currentlyWorking}
                  value={item.currentlyWorking ? 'Present' : item.endDate || ''}
                  onChange={(e) => handleChange(idx, 'endDate', e.target.value)}
                />
                <div className="form-check mt-1">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`curr-${idx}`}
                    checked={item.currentlyWorking || false}
                    onChange={(e) => handleChange(idx, 'currentlyWorking', e.target.checked)}
                  />
                  <label className="form-check-label extra-small" htmlFor={`curr-${idx}`}>
                    Currently Working Here
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold mb-1">Responsibilities & Impact</label>
                <textarea
                  className="form-control form-control-sm"
                  rows="3"
                  placeholder="• Developed RESTful APIs using Node.js & Express reducing latency by 20%..."
                  value={item.responsibilities || ''}
                  onChange={(e) => handleChange(idx, 'responsibilities', e.target.value)}
                ></textarea>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold mb-1">Key Achievements</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Awarded Best Intern Q3 for delivering real-time notification engine"
                  value={item.achievements || ''}
                  onChange={(e) => handleChange(idx, 'achievements', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExperienceForm;
