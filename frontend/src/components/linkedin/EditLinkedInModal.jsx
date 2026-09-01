import React, { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const EditLinkedInModal = ({ show, profile = {}, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    headline: '',
    location: '',
    about: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    leetcodeUrl: '',
    targetRole: 'Full Stack Developer',
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        headline: profile.headline || '',
        location: profile.location || '',
        about: profile.about || '',
        linkedinUrl: profile.linkedinUrl || '',
        githubUrl: profile.githubUrl || '',
        portfolioUrl: profile.portfolioUrl || '',
        leetcodeUrl: profile.leetcodeUrl || '',
        targetRole: profile.targetRole || 'Full Stack Developer',
        skills: profile.skills || [],
        experience: profile.experience || [],
        education: profile.education || [],
        certifications: profile.certifications || [],
        projects: profile.projects || [],
      });
    }
  }, [profile]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit LinkedIn Career Profile</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body p-4">
            <form id="edit-linkedin-form" onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small">Professional Headline</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    placeholder="e.g. Software Developer | MERN Stack | Java"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small">Target Role</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small">Location</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. India"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small">LinkedIn URL</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold small">GitHub URL</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold small">Portfolio URL</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://portfolio.dev"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold small">LeetCode URL</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.leetcodeUrl}
                    onChange={(e) => setFormData({ ...formData, leetcodeUrl: e.target.value })}
                    placeholder="https://leetcode.com/username"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small">About / Summary</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="4"
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    placeholder="Write a professional summary highlighting your core skills and passions..."
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm fw-bold" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" form="edit-linkedin-form" className="btn btn-primary btn-sm fw-bold">
              <FaSave /> Save Profile Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLinkedInModal;
