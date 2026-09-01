import React, { useState } from 'react';
import { FaCode, FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const PREDEFINED_CATEGORIES = [
  'Programming Languages',
  'Frameworks',
  'Libraries',
  'Databases',
  'Tools',
  'Cloud',
  'Concepts',
  'Soft Skills',
];

/**
 * Categorized Skills Manager Form
 */
const SkillsForm = ({ skills = [], onChange }) => {
  const [selectedCat, setSelectedCat] = useState('Programming Languages');
  const [customCat, setCustomCat] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const activeSkills = Array.isArray(skills) ? skills : [];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;

    const targetCategory = customCat.trim() || selectedCat;
    const existingIndex = activeSkills.findIndex(
      (s) => s.category?.toLowerCase() === targetCategory.toLowerCase()
    );

    let updated = [...activeSkills];
    if (existingIndex >= 0) {
      const currentItems = Array.isArray(updated[existingIndex].items)
        ? updated[existingIndex].items
        : [];
      if (!currentItems.includes(skillInput.trim())) {
        updated[existingIndex] = {
          ...updated[existingIndex],
          items: [...currentItems, skillInput.trim()],
        };
      }
    } else {
      updated.push({
        category: targetCategory,
        items: [skillInput.trim()],
      });
    }

    onChange(updated);
    setSkillInput('');
  };

  const handleRemoveSkill = (catIdx, skillIdx) => {
    let updated = [...activeSkills];
    const cat = updated[catIdx];
    if (!cat) return;

    const newItems = cat.items.filter((_, i) => i !== skillIdx);
    if (newItems.length === 0) {
      updated = updated.filter((_, i) => i !== catIdx);
    } else {
      updated[catIdx] = { ...cat, items: newItems };
    }

    onChange(updated);
  };

  const handleRemoveCategory = (catIdx) => {
    const updated = activeSkills.filter((_, i) => i !== catIdx);
    onChange(updated);
  };

  const handleMoveCategory = (catIdx, direction) => {
    if (
      (catIdx === 0 && direction === 'up') ||
      (catIdx === activeSkills.length - 1 && direction === 'down')
    ) {
      return;
    }
    const updated = [...activeSkills];
    const targetIdx = direction === 'up' ? catIdx - 1 : catIdx + 1;
    const temp = updated[catIdx];
    updated[catIdx] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange(updated);
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
        <FaCode className="text-primary" /> Technical & Soft Skills
      </h6>

      {/* Add Skill Controls */}
      <form onSubmit={handleAddSkill} className="row g-2 mb-3 bg-white p-2 rounded border">
        <div className="col-md-4">
          <select
            className="form-select form-select-sm"
            value={selectedCat}
            onChange={(e) => {
              setSelectedCat(e.target.value);
              if (e.target.value !== 'Other') setCustomCat('');
            }}
          >
            {PREDEFINED_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="Other">Custom Category...</option>
          </select>
        </div>

        {selectedCat === 'Other' && (
          <div className="col-md-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Category Name..."
              value={customCat}
              onChange={(e) => setCustomCat(e.target.value)}
            />
          </div>
        )}

        <div className={selectedCat === 'Other' ? 'col-md-3' : 'col-md-6'}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="e.g. React, Node.js, TypeScript..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button type="submit" className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-1">
            <FaPlus /> Add
          </button>
        </div>
      </form>

      {/* Display Categorized Skills */}
      {activeSkills.length === 0 ? (
        <div className="text-muted small text-center py-2">No skills added yet. Use the controls above to categorize your tech stack.</div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {activeSkills.map((cat, catIdx) => (
            <div key={catIdx} className="p-2 bg-white rounded border">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold small text-primary">{cat.category}</span>
                <div className="d-flex align-items-center gap-1">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm py-0 px-1"
                    disabled={catIdx === 0}
                    onClick={() => handleMoveCategory(catIdx, 'up')}
                    title="Move Category Up"
                  >
                    <FaArrowUp style={{ fontSize: '10px' }} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm py-0 px-1"
                    disabled={catIdx === activeSkills.length - 1}
                    onClick={() => handleMoveCategory(catIdx, 'down')}
                    title="Move Category Down"
                  >
                    <FaArrowDown style={{ fontSize: '10px' }} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm py-0 px-1"
                    onClick={() => handleRemoveCategory(catIdx)}
                    title="Delete Category"
                  >
                    <FaTrash style={{ fontSize: '10px' }} />
                  </button>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-1">
                {(cat.items || []).map((skill, skillIdx) => (
                  <span key={skillIdx} className="badge bg-secondary-subtle text-dark border d-flex align-items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      className="btn-close ms-1"
                      style={{ width: '8px', height: '8px' }}
                      onClick={() => handleRemoveSkill(catIdx, skillIdx)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
