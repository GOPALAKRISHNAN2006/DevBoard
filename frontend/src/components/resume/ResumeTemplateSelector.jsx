import React from 'react';
import { FaPalette } from 'react-icons/fa';

const TEMPLATES = [
  { id: 'ats-classic', name: 'ATS Classic (Standard)' },
  { id: 'modern-developer', name: 'Modern Developer' },
  { id: 'minimal', name: 'Minimal One-Column' },
  { id: 'fresher-student', name: 'Fresher / Student Focus' },
];

/**
 * Template Selection dropdown component
 */
const ResumeTemplateSelector = ({ selectedTemplate = 'ats-classic', onChange }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <FaPalette className="text-secondary" />
      <select
        className="form-select form-select-sm fw-bold border-primary"
        value={selectedTemplate}
        onChange={(e) => onChange(e.target.value)}
        style={{ minWidth: '180px' }}
      >
        {TEMPLATES.map((tmpl) => (
          <option key={tmpl.id} value={tmpl.id}>
            {tmpl.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResumeTemplateSelector;
