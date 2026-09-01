import React from 'react';
import { FaSort, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ALL_SECTIONS = [
  { key: 'summary', label: 'Summary' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'projects', label: 'Projects' },
  { key: 'education', label: 'Education' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'languages', label: 'Languages' },
];

/**
 * Resume Section Reordering Manager
 */
const SectionReorderForm = ({ sectionOrder = [], onChange }) => {
  const currentOrder =
    sectionOrder && sectionOrder.length > 0
      ? sectionOrder
      : ALL_SECTIONS.map((s) => s.key);

  const moveSection = (index, direction) => {
    if (
      (index === 0 && direction === 'up') ||
      (index === currentOrder.length - 1 && direction === 'down')
    ) {
      return;
    }

    const updated = [...currentOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange(updated);
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <h6 className="fw-bold mb-2 text-dark d-flex align-items-center gap-2">
        <FaSort className="text-primary" /> Reorder Resume Sections
      </h6>
      <p className="extra-small text-muted mb-2">
        Customize the vertical arrangement of your resume layout. The preview updates live immediately.
      </p>

      <div className="list-group">
        {currentOrder.map((key, idx) => {
          const secObj = ALL_SECTIONS.find((s) => s.key === key) || { key, label: key };
          return (
            <div
              key={key}
              className="list-group-item d-flex justify-content-between align-items-center py-2 px-3 bg-white mb-1 rounded border"
            >
              <span className="fw-semibold small">
                {idx + 1}. {secObj.label}
              </span>
              <div className="d-flex gap-1">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm py-0 px-2"
                  disabled={idx === 0}
                  onClick={() => moveSection(idx, 'up')}
                  title="Move Up"
                >
                  <FaArrowUp style={{ fontSize: '10px' }} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm py-0 px-2"
                  disabled={idx === currentOrder.length - 1}
                  onClick={() => moveSection(idx, 'down')}
                  title="Move Down"
                >
                  <FaArrowDown style={{ fontSize: '10px' }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionReorderForm;
