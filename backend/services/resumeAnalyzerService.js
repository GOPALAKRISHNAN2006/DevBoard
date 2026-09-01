/**
 * resumeAnalyzerService.js
 * Rule-based ATS Analyzer and Job Description Matcher Engine
 */

// Standard ATS recognized section names
export const STANDARD_SECTIONS = [
  "summary",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
  "achievements",
];

// Common tech keywords bank for fallback extraction & taxonomy mapping
const COMMON_TECH_KEYWORDS = [
  "javascript", "typescript", "react", "next.js", "vue", "angular", "node.js",
  "express", "mongodb", "mongoose", "sql", "postgresql", "mysql", "redis",
  "python", "django", "flask", "java", "spring boot", "c++", "c#", ".net",
  "html", "css", "bootstrap", "tailwind", "rest api", "graphql", "docker",
  "kubernetes", "aws", "azure", "gcp", "git", "github", "ci/cd", "agile",
  "scrum", "jest", "cypress", "microservices", "system design", "data structures",
  "algorithms", "object-oriented programming", "oop", "webpack", "vite"
];

// Stop words to remove during keyword extraction
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "about", "above", "after", "again", "against",
  "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been",
  "before", "being", "below", "between", "both", "but", "by", "can", "cannot", "could",
  "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "him", "his", "how", "i", "if",
  "in", "into", "is", "it", "its", "just", "me", "more", "most", "my", "no", "nor",
  "not", "of", "off", "on", "once", "only", "or", "other", "our", "out", "over", "own",
  "same", "she", "should", "so", "some", "such", "than", "that", "the", "their", "them",
  "then", "there", "these", "they", "this", "those", "through", "to", "too", "under",
  "until", "up", "very", "was", "we", "were", "what", "when", "where", "which", "while",
  "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself", "yourselves",
  "experience", "knowledge", "ability", "working", "work", "years", "strong", "required",
  "skills", "job", "candidate", "role", "team", "looking", "must", "good", "great"
]);

/**
 * Extract distinct keywords from job description text
 */
export const extractJobKeywords = (jobDescription = "") => {
  if (!jobDescription || typeof jobDescription !== "string") return [];

  const normalizedText = jobDescription.toLowerCase();
  const foundKeywords = new Set();

  // Check known tech bank
  COMMON_TECH_KEYWORDS.forEach((kw) => {
    if (normalizedText.includes(kw)) {
      foundKeywords.add(kw);
    }
  });

  // Extract clean words of length >= 3
  const words = normalizedText
    .replace(/[^a-z0-9#+.\s-]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));

  words.forEach((w) => foundKeywords.add(w));

  return Array.from(foundKeywords);
};

/**
 * Compare resume content text against extracted job keywords
 */
export const compareKeywords = (resume, jobKeywords = []) => {
  if (!jobKeywords || jobKeywords.length === 0) {
    return {
      matched: [],
      missing: [],
      matchPercentage: 0,
    };
  }

  // Concatenate all resume text for searching
  const textBuffer = [];
  if (resume.summary) textBuffer.push(resume.summary);
  if (resume.targetRole) textBuffer.push(resume.targetRole);

  if (Array.isArray(resume.skills)) {
    resume.skills.forEach((cat) => {
      if (cat.category) textBuffer.push(cat.category);
      if (Array.isArray(cat.items)) textBuffer.push(cat.items.join(" "));
    });
  }

  if (Array.isArray(resume.experience)) {
    resume.experience.forEach((exp) => {
      if (exp.jobTitle) textBuffer.push(exp.jobTitle);
      if (exp.company) textBuffer.push(exp.company);
      if (exp.responsibilities) textBuffer.push(exp.responsibilities);
      if (exp.achievements) textBuffer.push(exp.achievements);
    });
  }

  if (Array.isArray(resume.projects)) {
    resume.projects.forEach((proj) => {
      if (proj.name) textBuffer.push(proj.name);
      if (proj.description) textBuffer.push(proj.description);
      if (proj.technologies) textBuffer.push(proj.technologies);
      if (proj.achievements) textBuffer.push(proj.achievements);
    });
  }

  if (Array.isArray(resume.education)) {
    resume.education.forEach((edu) => {
      if (edu.degree) textBuffer.push(edu.degree);
      if (edu.field) textBuffer.push(edu.field);
      if (edu.institution) textBuffer.push(edu.institution);
    });
  }

  if (Array.isArray(resume.certifications)) {
    resume.certifications.forEach((cert) => {
      if (cert.name) textBuffer.push(cert.name);
      if (cert.organization) textBuffer.push(cert.organization);
    });
  }

  const fullResumeText = textBuffer.join(" ").toLowerCase();

  const matched = [];
  const missing = [];

  jobKeywords.forEach((kw) => {
    if (fullResumeText.includes(kw.toLowerCase())) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const matchPercentage =
    jobKeywords.length > 0
      ? Math.round((matched.length / jobKeywords.length) * 100)
      : 0;

  return { matched, missing, matchPercentage };
};

/**
 * 1. Contact Info Score (Max 10)
 */
export const calculateContactScore = (resume) => {
  let score = 0;
  const p = resume.personalInfo || {};

  if (p.name && p.name.trim()) score += 2;
  if (p.email && p.email.trim()) score += 2;
  if (p.phone && p.phone.trim()) score += 2;
  if (p.location && p.location.trim()) score += 1;
  if (p.linkedin && p.linkedin.trim()) score += 1.5;
  if (p.github && p.github.trim()) score += 1.5;

  return Math.min(10, Math.round(score));
};

/**
 * 2. Standard Sections Score (Max 15)
 */
export const calculateSectionScore = (resume) => {
  let score = 0;

  if (resume.summary && resume.summary.trim().length > 30) score += 3;
  if (Array.isArray(resume.skills) && resume.skills.some((s) => s.items && s.items.length > 0)) score += 3;
  if (Array.isArray(resume.experience) && resume.experience.length > 0) score += 3;
  if (Array.isArray(resume.projects) && resume.projects.length > 0) score += 3;
  if (Array.isArray(resume.education) && resume.education.length > 0) score += 3;

  return Math.min(15, Math.round(score));
};

/**
 * 3. Keyword Score (Max 25)
 */
export const calculateKeywordScore = (keywordResult) => {
  if (!keywordResult || !keywordResult.matchPercentage) return 12; // Base fallback when no JD provided
  return Math.round((keywordResult.matchPercentage / 100) * 25);
};

/**
 * 4. Skills Match Score (Max 20)
 */
export const calculateSkillsScore = (resume) => {
  let totalSkillCount = 0;
  let categoryCount = 0;

  if (Array.isArray(resume.skills)) {
    resume.skills.forEach((cat) => {
      if (cat.items && cat.items.length > 0) {
        categoryCount += 1;
        totalSkillCount += cat.items.length;
      }
    });
  }

  let score = 0;
  if (totalSkillCount >= 10) score += 12;
  else if (totalSkillCount >= 5) score += 8;
  else if (totalSkillCount > 0) score += 4;

  if (categoryCount >= 3) score += 8;
  else if (categoryCount >= 2) score += 5;
  else if (categoryCount >= 1) score += 2;

  return Math.min(20, Math.round(score));
};

/**
 * 5. Experience / Projects Score (Max 15)
 */
export const calculateExperienceProjectsScore = (resume) => {
  let score = 0;

  const hasExp = Array.isArray(resume.experience) && resume.experience.length > 0;
  const hasProj = Array.isArray(resume.projects) && resume.projects.length > 0;

  if (hasExp) {
    score += 8;
    const detailedExp = resume.experience.some(
      (e) => (e.responsibilities && e.responsibilities.length > 50) || (e.achievements && e.achievements.length > 20)
    );
    if (detailedExp) score += 2;
  }

  if (hasProj) {
    score += 4;
    const detailedProj = resume.projects.some(
      (p) => p.description && p.description.length > 40
    );
    if (detailedProj) score += 1;
  }

  return Math.min(15, Math.round(score));
};

/**
 * 6. Formatting & Structure Score (Max 10)
 */
export const calculateFormattingScore = (resume) => {
  let score = 10;

  // Check section order consistency
  if (!Array.isArray(resume.sectionOrder) || resume.sectionOrder.length < 4) {
    score -= 2;
  }

  // Check template validity
  if (!["ats-classic", "modern-developer", "minimal", "fresher-student"].includes(resume.template)) {
    score -= 2;
  }

  // Check for suspicious special characters like tables or images indicators
  const summary = resume.summary || "";
  if (/[^\x00-\x7F\u2013\u2014\u2022]/.test(summary)) {
    score -= 1;
  }

  return Math.max(0, Math.round(score));
};

/**
 * 7. Completeness Score (Max 5)
 */
export const calculateCompletenessScore = (resume) => {
  let filledFields = 0;
  let totalFields = 7;

  if (resume.title) filledFields++;
  if (resume.targetRole) filledFields++;
  if (resume.personalInfo?.name && resume.personalInfo?.email) filledFields++;
  if (resume.summary) filledFields++;
  if (resume.skills?.length > 0) filledFields++;
  if (resume.education?.length > 0) filledFields++;
  if (resume.experience?.length > 0 || resume.projects?.length > 0) filledFields++;

  return Math.round((filledFields / totalFields) * 5);
};

/**
 * Actionable ATS Improvement Suggestions
 */
export const generateSuggestions = (resume, keywordResult = {}, contactScore = 0) => {
  const suggestions = [];

  // Contact Info Suggestions
  const p = resume.personalInfo || {};
  if (!p.github) {
    suggestions.push({
      type: "warning",
      category: "Contact",
      text: "Add a GitHub profile link to showcase your code repositories to recruiters.",
    });
  }
  if (!p.linkedin) {
    suggestions.push({
      type: "warning",
      category: "Contact",
      text: "Add your LinkedIn profile URL for recruiter verification.",
    });
  }
  if (!p.phone || !p.email) {
    suggestions.push({
      type: "critical",
      category: "Contact",
      text: "Ensure both primary email and phone number are clearly provided.",
    });
  }

  // Target Role & Summary
  if (!resume.targetRole) {
    suggestions.push({
      type: "warning",
      category: "Target Role",
      text: "Specify a Target Job Role (e.g., 'Frontend Developer') to align section relevancy.",
    });
  }

  if (!resume.summary || resume.summary.length < 50) {
    suggestions.push({
      type: "info",
      category: "Summary",
      text: "Expand your professional summary (aim for 2-4 sentences) highlighting core stack & career goals.",
    });
  }

  // Skills
  const totalSkills = (resume.skills || []).reduce((acc, cat) => acc + (cat.items?.length || 0), 0);
  if (totalSkills < 8) {
    suggestions.push({
      type: "warning",
      category: "Skills",
      text: "Group your core technical skills into clear categories (Languages, Frameworks, Databases, Tools).",
    });
  }

  // Experience & Projects
  const expList = resume.experience || [];
  const projList = resume.projects || [];

  if (expList.length === 0 && projList.length === 0) {
    suggestions.push({
      type: "critical",
      category: "Experience",
      text: "Add at least 1 work experience entry or 2 technical projects with descriptions.",
    });
  } else {
    // Check for measurable results / metrics
    const hasMetrics = [...expList, ...projList].some((item) =>
      /\b(\d+%|\$\d+|\d+x|\d+\+)\b/.test(item.description || item.responsibilities || item.achievements || "")
    );
    if (!hasMetrics) {
      suggestions.push({
        type: "tip",
        category: "Content Impact",
        text: "Add measurable results to your project/experience descriptions (e.g., 'Improved load speed by 35%').",
      });
    }
  }

  // Keyword Missing Safety Warnings
  if (keywordResult.missing && keywordResult.missing.length > 0) {
    const topMissing = keywordResult.missing.slice(0, 5).join(", ");
    suggestions.push({
      type: "safety",
      category: "Keywords",
      text: `Your resume missing keywords found in job description: [ ${topMissing} ]. Note: Consider adding these keywords ONLY if you have genuine experience with them. Never fabricate skills or experience.`,
    });
  }

  return suggestions;
};

/**
 * Calculate complete ATS compatibility evaluation
 */
export const calculateFinalScore = (resume, jobDescription = "", targetRole = "") => {
  const effectiveTargetRole = targetRole || resume.targetRole || "";
  const jobKeywords = extractJobKeywords(jobDescription);
  const keywordResult = compareKeywords(resume, jobKeywords);

  const breakdown = {
    contact: calculateContactScore(resume),               // max 10
    sections: calculateSectionScore(resume),              // max 15
    keywords: calculateKeywordScore(keywordResult),       // max 25
    skills: calculateSkillsScore(resume),                 // max 20
    experience: calculateExperienceProjectsScore(resume), // max 15
    formatting: calculateFormattingScore(resume),         // max 10
    completeness: calculateCompletenessScore(resume),     // max 5
  };

  const totalScore = Math.min(
    100,
    Math.max(
      0,
      breakdown.contact +
        breakdown.sections +
        breakdown.keywords +
        breakdown.skills +
        breakdown.experience +
        breakdown.formatting +
        breakdown.completeness
    )
  );

  const suggestions = generateSuggestions(resume, keywordResult, breakdown.contact);

  return {
    score: totalScore,
    breakdown,
    jobKeywords,
    matchedKeywords: keywordResult.matched,
    missingKeywords: keywordResult.missing,
    keywordMatchPercentage: keywordResult.matchPercentage,
    suggestions,
    targetRole: effectiveTargetRole,
  };
};
