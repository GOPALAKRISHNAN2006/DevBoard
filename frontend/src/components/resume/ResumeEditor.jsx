import React, { useState } from 'react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import SkillsForm from './forms/SkillsForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import AchievementsForm from './forms/AchievementsForm';
import LanguagesForm from './forms/LanguagesForm';
import SectionReorderForm from './forms/SectionReorderForm';

/**
 * Main Resume Editor panel housing all modular form sections
 */
const ResumeEditor = ({ data = {}, onChange }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const updateSection = (key, value) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certs' },
    { id: 'achievements', label: 'Honors' },
    { id: 'languages', label: 'Languages' },
    { id: 'reorder', label: 'Reorder' },
  ];

  return (
    <div className="resume-editor-container bg-white p-3 rounded shadow-sm">
      {/* Navigation Pills */}
      <ul className="nav nav-pills nav-fill mb-3 bg-light p-1 rounded gap-1 flex-nowrap overflow-auto">
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item">
            <button
              type="button"
              className={`nav-link btn-sm text-nowrap py-1 px-2 fw-semibold ${
                activeTab === tab.id ? 'active bg-primary text-white' : 'text-dark'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Active Form Section */}
      <div className="tab-content">
        {activeTab === 'personal' && (
          <PersonalInfoForm
            personalInfo={data.personalInfo}
            onChange={(val) => updateSection('personalInfo', val)}
          />
        )}

        {activeTab === 'summary' && (
          <SummaryForm
            summary={data.summary}
            onChange={(val) => updateSection('summary', val)}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsForm
            skills={data.skills}
            onChange={(val) => updateSection('skills', val)}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            experience={data.experience}
            onChange={(val) => updateSection('experience', val)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsForm
            projects={data.projects}
            onChange={(val) => updateSection('projects', val)}
          />
        )}

        {activeTab === 'education' && (
          <EducationForm
            education={data.education}
            onChange={(val) => updateSection('education', val)}
          />
        )}

        {activeTab === 'certifications' && (
          <CertificationsForm
            certifications={data.certifications}
            onChange={(val) => updateSection('certifications', val)}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsForm
            achievements={data.achievements}
            onChange={(val) => updateSection('achievements', val)}
          />
        )}

        {activeTab === 'languages' && (
          <LanguagesForm
            languages={data.languages}
            onChange={(val) => updateSection('languages', val)}
          />
        )}

        {activeTab === 'reorder' && (
          <SectionReorderForm
            sectionOrder={data.sectionOrder}
            onChange={(val) => updateSection('sectionOrder', val)}
          />
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;
