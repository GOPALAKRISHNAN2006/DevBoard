import api from './axios';

/**
 * Fetch all resumes belonging to the authenticated user
 */
export const getResumes = async () => {
  const response = await api.get('/resume');
  return response.data;
};

/**
 * Fetch single resume by ID
 */
export const getResumeById = async (id) => {
  const response = await api.get(`/resume/${id}`);
  return response.data;
};

/**
 * Create a new resume
 */
export const createResume = async (data) => {
  const response = await api.post('/resume', data);
  return response.data;
};

/**
 * Upload existing PDF resume file and extract structured resume JSON
 */
export const uploadResumeFile = async (file) => {
  const formData = new FormData();
  formData.append('resumeFile', file);

  const response = await api.post('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Update complete resume by ID
 */
export const updateResume = async (id, data) => {
  const response = await api.put(`/resume/${id}`, data);
  return response.data;
};

/**
 * Patch resume by ID
 */
export const patchResume = async (id, data) => {
  const response = await api.patch(`/resume/${id}`, data);
  return response.data;
};

/**
 * Delete resume by ID
 */
export const deleteResume = async (id) => {
  const response = await api.delete(`/resume/${id}`);
  return response.data;
};

/**
 * Duplicate resume version
 */
export const duplicateResume = async (id) => {
  const response = await api.post(`/resume/${id}/duplicate`);
  return response.data;
};

/**
 * Perform ATS analysis on resume
 */
export const analyzeResume = async (id) => {
  const response = await api.post(`/resume/${id}/analyze`);
  return response.data;
};

/**
 * Analyze resume against job description
 */
export const analyzeJobMatch = async (id, jobData) => {
  const response = await api.post(`/resume/${id}/job-match`, jobData);
  return response.data;
};

/**
 * Fetch ATS score and breakdown
 */
export const getAtsScore = async (id) => {
  const response = await api.get(`/resume/${id}/ats-score`);
  return response.data;
};
