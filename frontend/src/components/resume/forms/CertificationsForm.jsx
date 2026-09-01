import React from 'react';
import { FaCertificate, FaPlus, FaTrash } from 'react-icons/fa';

/**
 * Certifications Form Section
 */
const CertificationsForm = ({ certifications = [], onChange }) => {
  const activeCerts = Array.isArray(certifications) ? certifications : [];

  const handleAdd = () => {
    onChange([
      ...activeCerts,
      {
        name: '',
        organization: '',
        issueDate: '',
        credentialId: '',
        credentialUrl: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    onChange(activeCerts.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...activeCerts];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <FaCertificate className="text-primary" /> Certifications
        </h6>
        <button type="button" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" onClick={handleAdd}>
          <FaPlus /> Add Certification
        </button>
      </div>

      {activeCerts.length === 0 ? (
        <div className="text-muted small text-center py-2">No certification entries added.</div>
      ) : (
        activeCerts.map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded border mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-1">
              <span className="fw-bold small text-secondary">Certification #{idx + 1}</span>
              <button type="button" className="btn btn-outline-danger btn-sm py-0 px-2" onClick={() => handleRemove(idx)}>
                <FaTrash className="extra-small" /> Remove
              </button>
            </div>

            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Certification Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. AWS Certified Developer Associate"
                  value={item.name || ''}
                  onChange={(e) => handleChange(idx, 'name', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold mb-1">Issuing Organization</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Amazon Web Services"
                  value={item.organization || ''}
                  onChange={(e) => handleChange(idx, 'organization', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">Issue Date</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Nov 2023"
                  value={item.issueDate || ''}
                  onChange={(e) => handleChange(idx, 'issueDate', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">Credential ID</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. AWS-1234567"
                  value={item.credentialId || ''}
                  onChange={(e) => handleChange(idx, 'credentialId', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold mb-1">Credential URL</label>
                <input
                  type="url"
                  className="form-control form-control-sm"
                  placeholder="e.g. https://credly.com/..."
                  value={item.credentialUrl || ''}
                  onChange={(e) => handleChange(idx, 'credentialUrl', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CertificationsForm;
