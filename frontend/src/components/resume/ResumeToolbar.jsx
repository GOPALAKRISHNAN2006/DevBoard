import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaFilePdf, FaSearch, FaFileUpload, FaSpinner } from 'react-icons/fa';
import ResumeTemplateSelector from './ResumeTemplateSelector';

/**
 * Top Toolbar containing title, back button, template selector, save, PDF download, and Upload Existing buttons
 */
const ResumeToolbar = ({
  title = '',
  onTitleChange,
  template = 'ats-classic',
  onTemplateChange,
  onSave,
  onDownloadPdf,
  onAnalyze,
  onOpenUploadModal,
  saving = false,
  analyzing = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body p-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
        {/* Back Button & Title Input */}
        <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ minWidth: '280px' }}>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={() => navigate(-1)}
            title="Go Back"
          >
            <FaArrowLeft /> Back
          </button>

          <input
            type="text"
            className="form-control form-control-sm fw-bold fs-6"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Resume Title (e.g., Full Stack Developer Resume)"
          />
        </div>

        {/* Template Selector & Action Buttons */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <ResumeTemplateSelector selectedTemplate={template} onChange={onTemplateChange} />

          <button
            type="button"
            className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={onOpenUploadModal}
            title="Upload an existing PDF resume to populate builder"
          >
            <FaFileUpload /> Upload Resume
          </button>

          <button
            type="button"
            className="btn btn-outline-info btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={onAnalyze}
            disabled={analyzing}
          >
            {analyzing ? <FaSpinner className="spinner-border spinner-border-sm" /> : <FaSearch />}
            Analyze ATS
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? <FaSpinner className="spinner-border spinner-border-sm" /> : <FaSave />}
            Save Resume
          </button>

          <button
            type="button"
            className="btn btn-success btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={onDownloadPdf}
          >
            <FaFilePdf /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeToolbar;
