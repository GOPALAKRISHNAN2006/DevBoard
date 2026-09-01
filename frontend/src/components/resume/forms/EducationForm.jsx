import React from 'react';
import { FaGraduationCap, FaPlus, FaTrash } from 'react-icons/fa';

/**
 * Education Form Section
 */
const EducationForm = ({ education = [], onChange }) => {
  const activeEdu = Array.isArray(education) ? education : [];

  const handleAdd = () => {
    onChange([
      ...activeEdu,
      {
        institution: '',
        degree: '',
        field: '',
        cgpa: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    onChange(activeEdu.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...activeEdu];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <FaGraduationCap className="text-primary" /> Education
        </h6>
        <button type="button" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" onClick={handleAdd}>
          <FaPlus /> Add Education
        </button>
      </div>

      {activeEdu.length === 0 ? (
        <div className="text-muted small text-center py-2">No education entries added.</div>
      ) : (
        activeEdu.map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded border mb-3 relative">
            <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-1">
              <span className="fw-bold small text-secondary">Education #{idx + 1}</span>
              <button type="button" className="btn btn-outline-danger btn-sm py-0 px-2" onClick={() => handleRemove(idx)}>
                <FaTrash className="extra-small" /> Remove
              </button>
            </div>

            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Institution</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Anna University"
                  value={item.institution || ''}
                  onChange={(e) => handleChange(idx, 'institution', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Degree</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Bachelor of Technology"
                  value={item.degree || ''}
                  onChange={(e) => handleChange(idx, 'degree', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Field of Study</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Computer Science and Engineering"
                  value={item.field || ''}
                  onChange={(e) => handleChange(idx, 'field', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">CGPA / Percentage</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. 8.75 CGPA or 87%"
                  value={item.cgpa || ''}
                  onChange={(e) => handleChange(idx, 'cgpa', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">Start Date</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Aug 2020"
                  value={item.startDate || ''}
                  onChange={(e) => handleChange(idx, 'startDate', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">End Date</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. May 2024"
                  value={item.endDate || ''}
                  onChange={(e) => handleChange(idx, 'endDate', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">Location</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Chennai, TN"
                  value={item.location || ''}
                  onChange={(e) => handleChange(idx, 'location', e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold mb-1">Description / Coursework</label>
                <textarea
                  className="form-control form-control-sm"
                  rows="2"
                  placeholder="Relevant coursework: Data Structures, Web Development, Cloud Computing..."
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

export default EducationForm;
