import React, { useEffect, useState, useCallback } from 'react';
import { FiLinkedin, FiExternalLink, FiEdit3, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

import api from '../../api/axios';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';

import LinkedInProfileHero from '../../components/linkedin/LinkedInProfileHero';
import ProfileStats from '../../components/linkedin/ProfileStats';
import ProfileStrengthCard from '../../components/linkedin/ProfileStrengthCard';
import ProfessionalHeadline from '../../components/linkedin/ProfessionalHeadline';
import AboutSection from '../../components/linkedin/AboutSection';
import SkillsSection from '../../components/linkedin/SkillsSection';
import ExperienceTimeline from '../../components/linkedin/ExperienceTimeline';
import EducationSection from '../../components/linkedin/EducationSection';
import CertificationGrid from '../../components/linkedin/CertificationGrid';
import ProjectSection from '../../components/linkedin/ProjectSection';
import ProfessionalLinks from '../../components/linkedin/ProfessionalLinks';
import ResumeComparison from '../../components/linkedin/ResumeComparison';
import CareerSuggestions from '../../components/linkedin/CareerSuggestions';
import ProfileChecklist from '../../components/linkedin/ProfileChecklist';
import EditLinkedInModal from '../../components/linkedin/EditLinkedInModal';
import SyncProfileModal from '../../components/linkedin/SyncProfileModal';

export default function LinkedIn() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/linkedin/profile');
      setData(res.data);
    } catch (err) {
      console.error('Fetch LinkedIn profile error:', err);
      setError(err.response?.data?.message || 'Failed to load LinkedIn career profile.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Handle Edit Save
  const handleSaveProfile = async (updatedFields) => {
    try {
      setSaving(true);
      const res = await api.put('/linkedin/profile', updatedFields);
      setData((prev) => ({
        ...prev,
        profile: res.data.profile,
        strength: res.data.strength,
      }));
      toast.success('LinkedIn profile updated successfully');
      setShowEditModal(false);
    } catch (err) {
      console.error('Update LinkedIn profile error:', err);
      toast.error('Failed to update LinkedIn profile');
    } finally {
      setSaving(false);
    }
  };

  // Handle Apply Headline Suggestion
  const handleApplyHeadline = async (newHeadline) => {
    try {
      const res = await api.put('/linkedin/profile', { headline: newHeadline });
      setData((prev) => ({
        ...prev,
        profile: res.data.profile,
        strength: res.data.strength,
      }));
      toast.success('Headline updated with suggestion');
    } catch (err) {
      toast.error('Failed to apply headline suggestion');
    }
  };

  // Handle Sync Resume Confirmation
  const handleConfirmSync = async () => {
    try {
      setSyncing(true);
      const res = await api.post('/linkedin/sync-resume');
      setData((prev) => ({
        ...prev,
        profile: res.data.profile,
        strength: res.data.strength,
      }));
      toast.success('LinkedIn profile synchronized from DevBoard Resume');
      setShowSyncModal(false);
    } catch (err) {
      console.error('Sync profile error:', err);
      toast.error('Failed to sync profile data');
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-5 text-center">
          <Loader />
          <p className="text-muted mt-3 fw-medium">Loading LinkedIn career profile...</p>
        </div>
      </Layout>
    );
  }

  const profile = data?.profile || {};
  const strength = data?.strength || {};
  const headlineSuggestions = data?.headlineSuggestions || [];
  const comparison = data?.comparison || {};
  const careerSuggestions = data?.careerSuggestions || [];

  return (
    <Layout>
      {/* ============================= */}
      {/* PAGE HEADER */}
      {/* ============================= */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">LinkedIn Career Dashboard</h1>
          <p className="text-muted small mb-0">
            Build and manage your professional presence powered by DevBoard.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={() => setShowEditModal(true)}
          >
            <FiEdit3 /> Edit Profile
          </button>

          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl.startsWith('http') ? profile.linkedinUrl : `https://${profile.linkedinUrl}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1"
            >
              <FiLinkedin /> Open LinkedIn <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      {error ? (
        <div className="card border-danger p-4 text-center my-4">
          <FiAlertCircle className="text-danger fs-1 mb-2 mx-auto" />
          <h4 className="h5 fw-bold text-dark">Unable to load LinkedIn profile</h4>
          <p className="text-muted small mb-3">{error}</p>
          <button type="button" className="btn btn-primary btn-sm fw-bold" onClick={fetchProfile}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* SECTION 1 — LINKEDIN PROFILE HERO */}
          <LinkedInProfileHero profile={profile} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 2 — PROFILE STATISTICS */}
          <ProfileStats profile={profile} strength={strength} />

          {/* SECTION 3 — DEVBOARD PROFILE STRENGTH */}
          <ProfileStrengthCard strength={strength} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 4 — PROFESSIONAL HEADLINE */}
          <ProfessionalHeadline
            headline={profile.headline}
            suggestions={headlineSuggestions}
            onOpenEditModal={() => setShowEditModal(true)}
            onApplyHeadline={handleApplyHeadline}
          />

          {/* SECTION 5 — ABOUT / SUMMARY */}
          <AboutSection about={profile.about} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 6 & 7 — SKILLS & SKILL ANALYTICS */}
          <SkillsSection skills={profile.skills} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 8 — WORK EXPERIENCE TIMELINE */}
          <ExperienceTimeline experience={profile.experience} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 9 — EDUCATION */}
          <EducationSection education={profile.education} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 10 — CERTIFICATIONS */}
          <CertificationGrid certifications={profile.certifications} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 11 — FEATURED PROJECTS */}
          <ProjectSection projects={profile.projects} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 12 — PROFESSIONAL LINKS */}
          <ProfessionalLinks profile={profile} onOpenEditModal={() => setShowEditModal(true)} />

          {/* SECTION 13 & 14 — RESUME ↔ LINKEDIN COMPARISON & SYNC */}
          <ResumeComparison comparison={comparison} onOpenSyncModal={() => setShowSyncModal(true)} />

          {/* SECTION 15 & 16 — CAREER BRANDING & TARGET ALIGNMENT */}
          <CareerSuggestions suggestions={careerSuggestions} targetRole={profile.targetRole} />

          {/* SECTION 17 — LINKEDIN PROFILE CHECKLIST */}
          <ProfileChecklist profile={profile} user={profile} onOpenEditModal={() => setShowEditModal(true)} />
        </>
      )}

      {/* EDIT MODAL */}
      <EditLinkedInModal
        show={showEditModal}
        profile={profile}
        onSave={handleSaveProfile}
        onClose={() => setShowEditModal(false)}
      />

      {/* SYNC MODAL */}
      <SyncProfileModal
        show={showSyncModal}
        onConfirm={handleConfirmSync}
        onClose={() => setShowSyncModal(false)}
        syncing={syncing}
      />
    </Layout>
  );
}
