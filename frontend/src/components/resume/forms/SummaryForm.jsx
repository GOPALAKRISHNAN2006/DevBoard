import React from 'react';
import { FaFileAlt, FaLightbulb } from 'react-icons/fa';

/**
 * Summary Form with Character and Word Counter
 */
const SummaryForm = ({ summary = '', onChange }) => {
  const charCount = summary ? summary.length : 0;
  const wordCount = summary && summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <FaFileAlt className="text-primary" /> Professional Summary
        </h6>
        <div className="badge bg-secondary">
          {wordCount} words | {charCount} chars
        </div>
      </div>

      <div className="mb-2">
        <textarea
          className="form-control form-control-sm"
          rows="4"
          placeholder="Write a concise 3-4 sentence overview of your technical experience, core stack, key accomplishments, and target roles..."
          value={summary}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
      </div>

      <div className="alert alert-info py-2 px-3 small mb-0 d-flex align-items-center gap-2">
        <FaLightbulb className="text-warning flex-shrink-0" />
        <div>
          <strong>ATS Tip:</strong> Include your target title, years of experience, and top 3 core skills in the first 2 sentences.
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
