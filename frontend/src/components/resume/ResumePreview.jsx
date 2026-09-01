import React from 'react';
import ATSClassicTemplate from './templates/ATSClassicTemplate';
import ModernDeveloperTemplate from './templates/ModernDeveloperTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import FresherStudentTemplate from './templates/FresherStudentTemplate';

/**
 * Live Resume Preview container component
 * Updates immediately when user modifies any form field in state.
 */
const ResumePreview = ({ data = {} }) => {
  const templateKey = data.template || 'ats-classic';

  const renderTemplate = () => {
    switch (templateKey) {
      case 'modern-developer':
        return <ModernDeveloperTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'fresher-student':
        return <FresherStudentTemplate data={data} />;
      case 'ats-classic':
      default:
        return <ATSClassicTemplate data={data} />;
    }
  };

  return (
    <div className="resume-preview-wrapper bg-dark-subtle p-3 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-2 px-1">
        <span className="fw-bold text-uppercase small text-secondary">Live Resume Preview</span>
        <span className="badge bg-secondary text-capitalize">{templateKey.replace('-', ' ')}</span>
      </div>

      {/* Container targeted for PDF Export */}
      <div id="resume-pdf-container" className="resume-pdf-paper bg-white rounded overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
