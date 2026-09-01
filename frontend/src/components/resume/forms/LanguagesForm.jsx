import React from 'react';
import { FaGlobe, FaPlus, FaTrash } from 'react-icons/fa';

/**
 * Languages & Proficiency Form Section
 */
const LanguagesForm = ({ languages = [], onChange }) => {
  const activeLangs = Array.isArray(languages) ? languages : [];

  const handleAdd = () => {
    onChange([
      ...activeLangs,
      {
        language: '',
        proficiency: 'Professional Working',
      },
    ]);
  };

  const handleRemove = (index) => {
    onChange(activeLangs.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...activeLangs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <FaGlobe className="text-primary" /> Languages
        </h6>
        <button type="button" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" onClick={handleAdd}>
          <FaPlus /> Add Language
        </button>
      </div>

      {activeLangs.length === 0 ? (
        <div className="text-muted small text-center py-2">No language entries added.</div>
      ) : (
        activeLangs.map((item, idx) => (
          <div key={idx} className="bg-white p-2 rounded border mb-2 d-flex align-items-center gap-2">
            <div className="w-50">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="e.g. English, Tamil, German"
                value={item.language || ''}
                onChange={(e) => handleChange(idx, 'language', e.target.value)}
              />
            </div>
            <div className="w-50">
              <select
                className="form-select form-select-sm"
                value={item.proficiency || 'Professional Working'}
                onChange={(e) => handleChange(idx, 'proficiency', e.target.value)}
              >
                <option value="Native / Bilingual">Native / Bilingual</option>
                <option value="Full Professional">Full Professional</option>
                <option value="Professional Working">Professional Working</option>
                <option value="Elementary">Elementary</option>
              </select>
            </div>
            <button type="button" className="btn btn-outline-danger btn-sm py-0 px-2" onClick={() => handleRemove(idx)}>
              <FaTrash className="extra-small" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default LanguagesForm;
