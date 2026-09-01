import React from 'react';
import { FaLightbulb, FaExclamationCircle, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';

/**
 * Actionable ATS Improvement Suggestions List
 */
const SuggestionList = ({ suggestions = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'critical':
        return <FaExclamationCircle className="text-danger flex-shrink-0 mt-1" />;
      case 'warning':
        return <FaExclamationCircle className="text-warning flex-shrink-0 mt-1" />;
      case 'safety':
        return <FaShieldAlt className="text-primary flex-shrink-0 mt-1" />;
      default:
        return <FaInfoCircle className="text-info flex-shrink-0 mt-1" />;
    }
  };

  const getBadge = (type) => {
    switch (type) {
      case 'critical':
        return <span className="badge bg-danger">Critical</span>;
      case 'warning':
        return <span className="badge bg-warning text-dark">Warning</span>;
      case 'safety':
        return <span className="badge bg-primary">Safety</span>;
      default:
        return <span className="badge bg-info text-dark">Recommendation</span>;
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header bg-light py-2 d-flex align-items-center gap-2">
        <FaLightbulb className="text-warning" />
        <h6 className="card-title mb-0 fw-bold small text-uppercase">Actionable ATS Suggestions</h6>
      </div>
      <div className="card-body p-3">
        {suggestions.length === 0 ? (
          <div className="text-center py-3 text-muted small">
            ✨ Great job! No critical ATS issues identified.
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {suggestions.map((item, idx) => (
              <li key={idx} className="list-group-item px-0 py-2 d-flex align-items-start gap-2 bg-transparent">
                {getIcon(item.type)}
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold small">{item.category}</span>
                    {getBadge(item.type)}
                  </div>
                  <p className="small text-secondary mb-0">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SuggestionList;
