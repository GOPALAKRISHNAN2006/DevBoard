import React, { useState } from 'react';
import { FaFileUpload, FaSpinner, FaFilePdf, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { uploadResumeFile } from '../../api/resumeApi';

/**
 * Modal to upload an existing PDF resume and convert it into a DevBoard resume version
 */
const ResumeUploadModal = ({ isOpen = false, onClose, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        toast.error('Only PDF files are supported');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a PDF file first');
      return;
    }

    try {
      setUploading(true);
      toast.loading('Extracting resume content & parsing fields...', { id: 'upload-parse' });

      const res = await uploadResumeFile(selectedFile);
      toast.success('Resume imported successfully!', { id: 'upload-parse' });

      if (onSuccess && res.resume) {
        onSuccess(res.resume);
      }
      setSelectedFile(null);
      onClose();
    } catch (err) {
      console.error('Error uploading resume:', err);
      toast.error(err.response?.data?.message || 'Failed to upload/parse resume', { id: 'upload-parse' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title h6 fw-bold d-flex align-items-center gap-2">
              <FaFileUpload /> Upload Existing Resume (PDF)
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} disabled={uploading}></button>
          </div>

          <form onSubmit={handleUploadSubmit}>
            <div className="modal-body p-4">
              <p className="small text-secondary mb-3">
                Upload your existing PDF resume. DevBoard will extract your contact info, summary, technical skills, education, and work experience automatically into our builder!
              </p>

              {/* File Drop Area */}
              <div
                className="border border-2 border-dashed border-primary rounded p-4 text-center bg-light mb-3 cursor-pointer"
                onClick={() => document.getElementById('resume-pdf-input')?.click()}
                style={{ cursor: 'pointer' }}
              >
                <FaFilePdf className="display-4 text-danger mb-2" />
                <div className="fw-bold small text-dark mb-1">
                  {selectedFile ? selectedFile.name : 'Click to select or drop your PDF resume'}
                </div>
                <div className="extra-small text-muted">
                  {selectedFile
                    ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                    : 'Supports PDF files up to 10MB'}
                </div>
                <input
                  type="file"
                  id="resume-pdf-input"
                  className="d-none"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                />
              </div>

              {selectedFile && (
                <div className="alert alert-success py-2 px-3 small d-flex justify-content-between align-items-center">
                  <span>
                    Ready to parse: <strong>{selectedFile.name}</strong>
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-danger p-0"
                    onClick={() => setSelectedFile(null)}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="modal-footer bg-light p-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose} disabled={uploading}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-2"
                disabled={uploading || !selectedFile}
              >
                {uploading ? (
                  <>
                    <FaSpinner className="spinner-border spinner-border-sm" /> Extracting Text...
                  </>
                ) : (
                  <>
                    <FaFileUpload /> Parse & Create Resume
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadModal;
