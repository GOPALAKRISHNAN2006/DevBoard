import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  analyzeJobMatch,
  analyzeResume,
} from '../../api/resumeApi';

import ResumeToolbar from '../../components/resume/ResumeToolbar';
import ResumeVersionSelector from '../../components/resume/ResumeVersionSelector';
import ResumeEditor from '../../components/resume/ResumeEditor';
import ResumePreview from '../../components/resume/ResumePreview';
import ResumeUploadModal from '../../components/resume/ResumeUploadModal';

import ATSScoreCard from '../../components/resume/ats/ATSScoreCard';
import ATSBreakdown from '../../components/resume/ats/ATSBreakdown';
import KeywordMatch from '../../components/resume/ats/KeywordMatch';
import SuggestionList from '../../components/resume/ats/SuggestionList';
import JobDescriptionAnalyzer from '../../components/resume/ats/JobDescriptionAnalyzer';

import { downloadResumePdf } from '../../utils/pdfGenerator';
import './Resume.css';

const DEFAULT_RESUME_DATA = {
  title: 'Frontend Developer Resume',
  targetRole: 'Frontend Developer',
  personalInfo: {
    name: 'Gopalakrishnan M',
    title: 'Frontend Engineer',
    email: 'gopal@example.com',
    phone: '+91 98765 43210',
    location: 'Chennai, TN',
    linkedin: 'https://linkedin.com/in/gopal',
    github: 'https://github.com/GOPALAKRISHNAN2006',
    portfolio: 'https://devboard.app',
  },
  summary:
    'Dedicated Frontend Developer with experience in React, JavaScript, Bootstrap 5, and Node.js. Passionate about building responsive, high-performance web applications and intuitive developer tools.',
  skills: [
    { category: 'Programming Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'] },
    { category: 'Frameworks & Libraries', items: ['React.js', 'Redux Toolkit', 'Bootstrap 5', 'Node.js', 'Express.js'] },
    { category: 'Databases & Tools', items: ['MongoDB', 'Mongoose', 'Git', 'GitHub', 'Vite', 'Postman'] },
  ],
  education: [
    {
      institution: 'Anna University',
      degree: 'B.Tech',
      field: 'Computer Science & Engineering',
      cgpa: '8.8 CGPA',
      startDate: '2022',
      endDate: '2026',
      location: 'Chennai',
      description: 'Focus on Data Structures, Algorithms, Software Engineering, and Web Systems.',
    },
  ],
  experience: [
    {
      company: 'DevBoard Systems',
      jobTitle: 'Frontend Engineer Intern',
      location: 'Remote',
      startDate: 'Jun 2024',
      endDate: 'Present',
      currentlyWorking: true,
      responsibilities:
        'Developed interactive dashboard components using React 19 and Bootstrap 5. Improved page load efficiency by 30% through standard optimization.',
      achievements: 'Integrated GitHub analytics & LeetCode tracking widgets.',
    },
  ],
  projects: [
    {
      name: 'DevBoard - Developer Career Management Platform',
      description:
        'A comprehensive platform for developers featuring project showcases, job tracking, ATS resume builder, and GitHub analytics.',
      technologies: 'React, Node.js, Express, MongoDB, Bootstrap 5',
      githubUrl: 'https://github.com/GOPALAKRISHNAN2006/DevBoard',
      liveDemoUrl: 'https://dev-board-mauve.vercel.app',
      startDate: 'Jan 2025',
      endDate: 'Present',
      achievements: 'Engineered ATS Compatibility Score calculation algorithm with transparent breakdown.',
    },
  ],
  certifications: [
    {
      name: 'Full Stack Web Development Certification',
      organization: 'DevBoard Academy',
      issueDate: 'Jan 2025',
      credentialId: 'DEV-8892',
      credentialUrl: 'https://devboard.app/cert/DEV-8892',
    },
  ],
  achievements: [
    {
      title: 'Top Contributor',
      description: 'Featured among top 5 code contributors on GitHub Developer Leaderboard.',
      date: 'Dec 2024',
    },
  ],
  languages: [
    { language: 'English', proficiency: 'Full Professional' },
    { language: 'Tamil', proficiency: 'Native' },
  ],
  sectionOrder: [
    'summary',
    'skills',
    'experience',
    'projects',
    'education',
    'certifications',
    'achievements',
    'languages',
  ],
  template: 'ats-classic',
  atsScore: 85,
  atsBreakdown: {
    contact: 10,
    sections: 15,
    keywords: 20,
    skills: 18,
    experience: 12,
    formatting: 8,
    completeness: 4,
  },
};

const Resume = () => {
  const [resumesList, setResumesList] = useState([]);
  const [activeResumeId, setActiveResumeId] = useState(null);
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME_DATA);

  const [loadingResumes, setLoadingResumes] = useState(true);
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Upload Modal state
  const [showUploadModal, setShowUploadModal] = useState(false);

  // ATS Analysis results state
  const [atsAnalysis, setAtsAnalysis] = useState(null);

  // Fetch list of resumes on load
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      const list = await getResumes();
      setResumesList(list);

      if (list && list.length > 0) {
        loadResumeDetails(list[0]._id);
      } else {
        await handleCreateNewResume();
      }
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      toast.error('Failed to load saved resumes');
    } finally {
      setLoadingResumes(false);
    }
  };

  const loadResumeDetails = async (id) => {
    try {
      setActiveResumeId(id);
      const data = await getResumeById(id);
      setResumeData(data);

      if (id) {
        const analysis = await analyzeResume(id);
        setAtsAnalysis(analysis);
      }
    } catch (err) {
      console.error('Error loading resume:', err);
      toast.error('Failed to load selected resume details');
    }
  };

  const handleCreateNewResume = async () => {
    try {
      setSaving(true);
      const res = await createResume(DEFAULT_RESUME_DATA);
      const newResume = res.resume;
      toast.success('New blank resume version created!');
      setResumesList((prev) => [newResume, ...prev]);
      setActiveResumeId(newResume._id);
      setResumeData(newResume);
    } catch (err) {
      console.error('Error creating resume:', err);
      toast.error('Failed to create new resume');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeParsedSuccess = (newResume) => {
    setResumesList((prev) => [newResume, ...prev]);
    setActiveResumeId(newResume._id);
    setResumeData(newResume);
    analyzeResume(newResume._id).then((analysis) => setAtsAnalysis(analysis));
  };

  const handleSaveResume = async () => {
    if (!activeResumeId) return;

    try {
      setSaving(true);
      const res = await updateResume(activeResumeId, resumeData);
      setResumeData(res.resume);
      toast.success('Resume saved successfully!');

      setResumesList((prev) =>
        prev.map((r) => (r._id === activeResumeId ? res.resume : r))
      );
    } catch (err) {
      console.error('Error saving resume:', err);
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicateResume = async (id) => {
    try {
      toast.loading('Duplicating resume...', { id: 'dup-toast' });
      const res = await duplicateResume(id);
      const newCopy = res.resume;
      setResumesList((prev) => [newCopy, ...prev]);
      loadResumeDetails(newCopy._id);
      toast.success('Resume version duplicated!', { id: 'dup-toast' });
    } catch (err) {
      console.error('Error duplicating resume:', err);
      toast.error('Failed to duplicate resume', { id: 'dup-toast' });
    }
  };

  const handleDeleteResume = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume version?')) return;

    try {
      toast.loading('Deleting resume...', { id: 'del-toast' });
      await deleteResume(id);
      const updatedList = resumesList.filter((r) => r._id !== id);
      setResumesList(updatedList);

      toast.success('Resume deleted successfully', { id: 'del-toast' });

      if (updatedList.length > 0) {
        loadResumeDetails(updatedList[0]._id);
      } else {
        handleCreateNewResume();
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
      toast.error('Failed to delete resume', { id: 'del-toast' });
    }
  };

  const handleAnalyzeAts = async () => {
    if (!activeResumeId) return;

    try {
      setAnalyzing(true);
      toast.loading('Running rule-based ATS analysis...', { id: 'ats-run' });
      const result = await analyzeResume(activeResumeId);
      setAtsAnalysis(result);

      if (result.atsScore !== undefined) {
        setResumeData((prev) => ({
          ...prev,
          atsScore: result.atsScore,
          atsBreakdown: result.breakdown,
        }));
      }

      toast.success(`Analysis completed! ATS Score: ${result.atsScore}/100`, { id: 'ats-run' });
    } catch (err) {
      console.error('Analysis error:', err);
      toast.error('Failed to analyze resume', { id: 'ats-run' });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleJobMatch = async (jobDescription) => {
    if (!activeResumeId) return;

    try {
      setAnalyzing(true);
      toast.loading('Analyzing job description & matching keywords...', { id: 'job-match' });
      const result = await analyzeJobMatch(activeResumeId, {
        jobDescription,
        targetRole: resumeData.targetRole,
      });

      setAtsAnalysis(result);
      if (result.atsScore !== undefined) {
        setResumeData((prev) => ({
          ...prev,
          atsScore: result.atsScore,
          atsBreakdown: result.breakdown,
        }));
      }

      toast.success(`Job match score evaluated: ${result.atsScore}/100!`, { id: 'job-match' });
    } catch (err) {
      console.error('Job match error:', err);
      toast.error('Failed to analyze job match', { id: 'job-match' });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownloadPdf = () => {
    const filename = `${resumeData.personalInfo?.name || 'Resume'}_${resumeData.targetRole || 'Developer'}.pdf`;
    downloadResumePdf('resume-pdf-container', filename);
  };

  const currentScore = atsAnalysis?.atsScore ?? resumeData.atsScore ?? 85;
  const currentBreakdown = atsAnalysis?.breakdown || resumeData.atsBreakdown || {};

  return (
    <div className="container-fluid py-3 px-lg-4 resume-builder-page">
      {/* Upload Modal */}
      <ResumeUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={handleResumeParsedSuccess}
      />

      {/* Top Toolbar */}
      <ResumeToolbar
        title={resumeData.title}
        onTitleChange={(val) => setResumeData((prev) => ({ ...prev, title: val }))}
        template={resumeData.template}
        onTemplateChange={(val) => setResumeData((prev) => ({ ...prev, template: val }))}
        onSave={handleSaveResume}
        onDownloadPdf={handleDownloadPdf}
        onAnalyze={handleAnalyzeAts}
        onOpenUploadModal={() => setShowUploadModal(true)}
        saving={saving}
        analyzing={analyzing}
      />

      {/* Version Selector */}
      <ResumeVersionSelector
        resumes={resumesList}
        activeResumeId={activeResumeId}
        onSelectResume={loadResumeDetails}
        onCreateNew={handleCreateNewResume}
        onOpenUploadModal={() => setShowUploadModal(true)}
        onDuplicate={handleDuplicateResume}
        onDelete={handleDeleteResume}
      />

      {/* Split-Screen Main Layout */}
      <div className="row g-4">
        {/* LEFT PANEL: Editor & Job Matcher */}
        <div className="col-lg-6 col-md-12">
          <div className="d-flex flex-column gap-3">
            {/* Editor Container */}
            <ResumeEditor data={resumeData} onChange={setResumeData} />

            {/* Job Description Analyzer */}
            <JobDescriptionAnalyzer
              targetRole={resumeData.targetRole}
              onTargetRoleChange={(val) => setResumeData((prev) => ({ ...prev, targetRole: val }))}
              onAnalyze={handleJobMatch}
              loading={analyzing}
            />
          </div>
        </div>

        {/* RIGHT PANEL: Live Resume Preview & ATS Analysis */}
        <div className="col-lg-6 col-md-12">
          <div className="d-flex flex-column gap-3">
            {/* ATS Score Overview */}
            <div className="row g-3">
              <div className="col-md-6">
                <ATSScoreCard score={currentScore} targetRole={resumeData.targetRole} />
              </div>
              <div className="col-md-6">
                <ATSBreakdown breakdown={currentBreakdown} />
              </div>
            </div>

            {/* Keyword Match & Suggestions */}
            {atsAnalysis && (
              <>
                <KeywordMatch
                  matched={atsAnalysis.matchedKeywords || []}
                  missing={atsAnalysis.missingKeywords || []}
                  matchPercentage={atsAnalysis.keywordMatchPercentage || 0}
                />
                <SuggestionList suggestions={atsAnalysis.suggestions || []} />
              </>
            )}

            {/* Live Real-Time Resume Preview */}
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;