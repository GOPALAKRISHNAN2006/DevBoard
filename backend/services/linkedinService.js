/**
 * linkedinService.js
 * Business logic service for profile strength, headline suggestions, resume comparison, and career suggestions.
 */

/**
 * Calculate transparent DevBoard Profile Strength (0 - 100%)
 */
export const calculateProfileStrength = (profileData = {}, user = {}) => {
  const completed = [];
  const missing = [];
  const breakdown = {
    basicInformation: 0,
    headline: 0,
    about: 0,
    skills: 0,
    experience: 0,
    education: 0,
    projects: 0,
    certifications: 0,
    links: 0,
  };

  const name = user.name || profileData.name;
  const avatar = user.avatar || profileData.avatar;
  const headline = profileData.headline;
  const about = profileData.about;
  const skills = profileData.skills || [];
  const experience = profileData.experience || [];
  const education = profileData.education || [];
  const projects = profileData.projects || [];
  const certifications = profileData.certifications || [];
  const linkedinUrl = user.linkedinUrl || profileData.linkedinUrl;
  const githubUrl = user.githubUrl || profileData.githubUrl;
  const portfolioUrl = user.portfolioUrl || profileData.portfolioUrl;

  // 1. Basic Info (15%)
  if (name && avatar) {
    breakdown.basicInformation = 15;
    completed.push("Profile photo & Name");
  } else if (name) {
    breakdown.basicInformation = 10;
    completed.push("Name");
    missing.push("Profile photo");
  } else {
    missing.push("Basic contact details");
  }

  // 2. Professional Headline (10%)
  if (headline && headline.trim().length >= 10) {
    breakdown.headline = 10;
    completed.push("Professional headline");
  } else {
    missing.push("Professional headline");
  }

  // 3. About Section (15%)
  if (about && about.trim().length >= 50) {
    breakdown.about = 15;
    completed.push("About summary");
  } else if (about) {
    breakdown.about = 8;
    completed.push("Short About summary");
    missing.push("Detailed About summary (50+ chars)");
  } else {
    missing.push("About summary");
  }

  // 4. Skills (15%)
  const totalSkillsCount = skills.reduce((acc, cat) => acc + (cat.items ? cat.items.length : 0), 0);
  if (totalSkillsCount >= 5) {
    breakdown.skills = 15;
    completed.push("5+ Key Skills");
  } else if (totalSkillsCount > 0) {
    breakdown.skills = 8;
    completed.push("Skills list");
    missing.push("Add at least 5 skills");
  } else {
    missing.push("Skills list");
  }

  // 5. Work Experience (20%)
  if (experience.length > 0) {
    breakdown.experience = 20;
    completed.push("Work Experience");
  } else {
    missing.push("Work Experience");
  }

  // 6. Education (10%)
  if (education.length > 0) {
    breakdown.education = 10;
    completed.push("Education");
  } else {
    missing.push("Education background");
  }

  // 7. Projects (5%)
  if (projects.length > 0) {
    breakdown.projects = 5;
    completed.push("Featured Projects");
  } else {
    missing.push("Featured Projects");
  }

  // 8. Certifications (5%)
  if (certifications.length > 0) {
    breakdown.certifications = 5;
    completed.push("Certifications");
  } else {
    missing.push("Certifications");
  }

  // 9. Links (5%)
  if (linkedinUrl && (githubUrl || portfolioUrl)) {
    breakdown.links = 5;
    completed.push("LinkedIn & Professional Links");
  } else if (linkedinUrl) {
    breakdown.links = 3;
    completed.push("LinkedIn URL");
    missing.push("GitHub or Portfolio URL");
  } else {
    missing.push("LinkedIn URL");
  }

  const score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return {
    score,
    breakdown,
    completed,
    missing,
  };
};

/**
 * Generate Smart Professional Headline Suggestions based on actual skills
 */
export const generateHeadlineSuggestions = (skills = [], targetRole = "Full Stack Developer") => {
  const allSkills = [];
  if (Array.isArray(skills)) {
    skills.forEach((cat) => {
      if (typeof cat === "string") allSkills.push(cat);
      else if (cat.items) allSkills.push(...cat.items);
    });
  }

  const topSkills = [...new Set(allSkills)].slice(0, 4).join(" | ");

  return [
    `${targetRole} ${topSkills ? `| ${topSkills}` : ""}`,
    `Software Developer | Specializing in ${topSkills || "Modern Web Tech"}`,
    `Aspiring ${targetRole} | Passionate about Problem-Solving & Scalable Code`,
  ];
};

/**
 * Compare DevBoard Resume ↔ LinkedIn Profile Data
 */
export const compareResumeProfile = (resumeData = {}, linkedinProfile = {}) => {
  // Extract Resume Skills
  const resumeSkills = [];
  if (Array.isArray(resumeData.skills)) {
    resumeData.skills.forEach((cat) => {
      if (Array.isArray(cat.items)) resumeSkills.push(...cat.items);
    });
  }

  // Extract Profile Skills
  const profileSkills = [];
  if (Array.isArray(linkedinProfile.skills)) {
    linkedinProfile.skills.forEach((cat) => {
      if (Array.isArray(cat.items)) profileSkills.push(...cat.items);
    });
  }

  const missingFromProfile = resumeSkills.filter(
    (s) => !profileSkills.some((ps) => ps.toLowerCase() === s.toLowerCase())
  );

  // Projects comparison
  const resumeProjects = (resumeData.projects || []).map((p) => p.name);
  const profileProjects = (linkedinProfile.projects || []).map((p) => p.name);
  const missingProjects = resumeProjects.filter(
    (rp) => !profileProjects.some((pp) => pp?.toLowerCase() === rp?.toLowerCase())
  );

  // Certifications comparison
  const resumeCerts = (resumeData.certifications || []).map((c) => c.name);
  const profileCerts = (linkedinProfile.certifications || []).map((c) => c.name);
  const missingCerts = resumeCerts.filter(
    (rc) => !profileCerts.some((pc) => pc?.toLowerCase() === rc?.toLowerCase())
  );

  const headlineMatch = !!(
    resumeData.targetRole &&
    linkedinProfile.headline &&
    linkedinProfile.headline.toLowerCase().includes(resumeData.targetRole.toLowerCase())
  );

  return {
    headlineMatch,
    skills: {
      resumeCount: resumeSkills.length,
      profileCount: profileSkills.length,
      missingFromProfile: [...new Set(missingFromProfile)],
    },
    projects: {
      resumeCount: resumeProjects.length,
      profileCount: profileProjects.length,
      missingProjects: [...new Set(missingProjects)],
    },
    certifications: {
      resumeCount: resumeCerts.length,
      profileCount: profileCerts.length,
      missingCerts: [...new Set(missingCerts)],
    },
    links: {
      linkedin: !!linkedinProfile.linkedinUrl,
      github: !!linkedinProfile.githubUrl,
      portfolio: !!linkedinProfile.portfolioUrl,
      leetcode: !!linkedinProfile.leetcodeUrl,
    },
  };
};

/**
 * Generate Actionable Career Branding Suggestions
 */
export const generateCareerSuggestions = (linkedinProfile = {}, resumeData = {}) => {
  const suggestions = [];

  if (!linkedinProfile.linkedinUrl) {
    suggestions.push({ type: "warning", message: "Add your official LinkedIn URL to enable 1-click profile access." });
  }
  if (!linkedinProfile.githubUrl) {
    suggestions.push({ type: "warning", message: "Add your GitHub URL to showcase repositories to recruiters." });
  }
  if (!linkedinProfile.about || linkedinProfile.about.length < 100) {
    suggestions.push({ type: "warning", message: "Expand your About section (100+ words) to describe your core passions and achievements." });
  }

  const comparison = compareResumeProfile(resumeData, linkedinProfile);
  if (comparison.skills.missingFromProfile.length > 0) {
    suggestions.push({
      type: "info",
      message: `Your resume lists ${comparison.skills.missingFromProfile.length} skills (${comparison.skills.missingFromProfile.slice(0, 3).join(", ")}) not present on your profile. Click Sync to align them.`,
    });
  }

  if (comparison.projects.missingProjects.length > 0) {
    suggestions.push({
      type: "info",
      message: `Your resume features projects (${comparison.projects.missingProjects[0]}) missing from your profile.`,
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({ type: "success", message: "Your professional profile is well-aligned with your resume!" });
  }

  return suggestions;
};
