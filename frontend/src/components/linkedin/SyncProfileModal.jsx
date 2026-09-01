import React from 'react';
import { FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

const SyncProfileModal = ({ show, onConfirm, onClose, syncing = false }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold d-flex align-items-center gap-2 text-dark">
              <FiRefreshCw className="text-primary" /> Confirm Profile Synchronization
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body py-4">
            <div className="p-3 bg-warning-subtle rounded border border-warning text-dark small mb-3">
              <div className="d-flex align-items-center gap-2 fw-bold mb-1 text-warning-emphasis">
                <FiAlertTriangle /> Attention:
              </div>
              Syncing will update your current LinkedIn profile data stored in DevBoard using your latest DevBoard Resume & Projects.
            </div>

            <p className="small text-muted mb-0">
              This process will align your headline, summary, skills, experience, education, certifications, and featured projects across DevBoard.
            </p>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button type="button" className="btn btn-secondary btn-sm fw-bold" onClick={onClose} disabled={syncing}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-2"
              onClick={onConfirm}
              disabled={syncing}
            >
              {syncing ? 'Syncing...' : 'Confirm & Sync'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncProfileModal;
