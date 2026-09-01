import React from 'react';
import { FaTrophy, FaPlus, FaTrash } from 'react-icons/fa';

/**
 * Achievements & Honors Form Section
 */
const AchievementsForm = ({ achievements = [], onChange }) => {
  const activeAchievements = Array.isArray(achievements) ? achievements : [];

  const handleAdd = () => {
    onChange([
      ...activeAchievements,
      {
        title: '',
        description: '',
        date: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    onChange(activeAchievements.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...activeAchievements];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <FaTrophy className="text-primary" /> Honors & Achievements
        </h6>
        <button type="button" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" onClick={handleAdd}>
          <FaPlus /> Add Achievement
        </button>
      </div>

      {activeAchievements.length === 0 ? (
        <div className="text-muted small text-center py-2">No achievement entries added.</div>
      ) : (
        activeAchievements.map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded border mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-1">
              <span className="fw-bold small text-secondary">Achievement #{idx + 1}</span>
              <button type="button" className="btn btn-outline-danger btn-sm py-0 px-2" onClick={() => handleRemove(idx)}>
                <FaTrash className="extra-small" /> Remove
              </button>
            </div>

            <div className="row g-2">
              <div className="col-md-8">
                <label className="form-label small fw-bold mb-1">Title</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Winner - National Hackathon 2024"
                  value={item.title || ''}
                  onChange={(e) => handleChange(idx, 'title', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">Date</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Feb 2024"
                  value={item.date || ''}
                  onChange={(e) => handleChange(idx, 'date', e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold mb-1">Description</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Secured 1st place among 150+ teams by building an AI-powered code reviewer..."
                  value={item.description || ''}
                  onChange={(e) => handleChange(idx, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AchievementsForm;
