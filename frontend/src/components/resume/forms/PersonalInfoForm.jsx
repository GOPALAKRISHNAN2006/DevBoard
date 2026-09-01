import React from 'react';
import { FaUser, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../../api/axios';

/**
 * Personal Information Form with DevBoard Profile Import integration
 */
const PersonalInfoForm = ({ personalInfo = {}, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...personalInfo,
      [name]: value,
    });
  };

  const handleImportProfile = async () => {
    try {
      toast.loading('Importing profile details...', { id: 'import-profile' });
      const res = await api.get('/user/profile');
      const user = res.data;

      onChange({
        ...personalInfo,
        name: user.name || personalInfo.name || '',
        email: user.email || personalInfo.email || '',
        phone: user.phone || personalInfo.phone || '',
        location: user.location || personalInfo.location || '',
        linkedin: user.linkedinUrl || personalInfo.linkedin || '',
        github: user.githubUsername ? `https://github.com/${user.githubUsername}` : personalInfo.github || '',
        portfolio: user.portfolioUrl || user.website || personalInfo.portfolio || '',
      });

      toast.success('Profile information imported successfully!', { id: 'import-profile' });
    } catch (err) {
      console.error('Import profile error:', err);
      toast.error('Failed to import profile details', { id: 'import-profile' });
    }
  };

  return (
    <div className="form-section p-3 bg-light rounded border mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <FaUser className="text-primary" /> Personal Information
        </h6>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
          onClick={handleImportProfile}
        >
          <FaDownload /> Import Profile
        </button>
      </div>

      <div className="row g-2">
        <div className="col-md-6">
          <label className="form-label small fw-bold mb-1">Full Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="name"
            placeholder="e.g. Gopalakrishnan M"
            value={personalInfo.name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold mb-1">Professional Title</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="title"
            placeholder="e.g. Senior Full Stack Engineer"
            value={personalInfo.title || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold mb-1">Email Address</label>
          <input
            type="email"
            className="form-control form-control-sm"
            name="email"
            placeholder="e.g. gopal@example.com"
            value={personalInfo.email || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold mb-1">Phone Number</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="phone"
            placeholder="e.g. +91 98765 43210"
            value={personalInfo.phone || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold mb-1">Location</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="location"
            placeholder="e.g. Chennai, India"
            value={personalInfo.location || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold mb-1">LinkedIn URL</label>
          <input
            type="url"
            className="form-control form-control-sm"
            name="linkedin"
            placeholder="e.g. https://linkedin.com/in/gopal"
            value={personalInfo.linkedin || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold mb-1">GitHub URL</label>
          <input
            type="url"
            className="form-control form-control-sm"
            name="github"
            placeholder="e.g. https://github.com/gopal"
            value={personalInfo.github || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold mb-1">Portfolio / Website</label>
          <input
            type="url"
            className="form-control form-control-sm"
            name="portfolio"
            placeholder="e.g. https://gopal.dev"
            value={personalInfo.portfolio || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
