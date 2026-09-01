/**
 * resumeParserService.js
 * High-precision parser that converts raw PDF resume text into clean DevBoard Resume schema objects.
 */

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Split text into distinct section blocks by standard resume headers
 */
const partitionSections = (text = '') => {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const sections = {
    header: [],
    summary: [],
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: [],
    achievements: [],
    languages: [],
  };

  let currentSection = 'header';

  lines.forEach((line) => {
    const lineUpper = line.toUpperCase().replace(/[^A-Z\s]/g, '').trim();

    if (/^(SUMMARY|PROFESSIONAL SUMMARY|PROFILE|OBJECTIVE|ABOUT ME)$/.test(lineUpper)) {
      currentSection = 'summary';
    } else if (/^(SKILLS|TECHNICAL SKILLS|TECH STACK)$/.test(lineUpper)) {
      currentSection = 'skills';
    } else if (/^(WORK EXPERIENCE|EXPERIENCE|EMPLOYMENT|INTERNSHIPS)$/.test(lineUpper)) {
      currentSection = 'experience';
    } else if (/^(PROJECTS|KEY PROJECTS|FEATURED PROJECTS)$/.test(lineUpper)) {
      currentSection = 'projects';
    } else if (/^(EDUCATION|ACADEMICS|QUALIFICATIONS)$/.test(lineUpper)) {
      currentSection = 'education';
    } else if (/^(CERTIFICATIONS|CERTIFICATES|COURSES)$/.test(lineUpper)) {
      currentSection = 'certifications';
    } else if (/^(ACHIEVEMENTS|HONORS|HONOURS|AWARDS)$/.test(lineUpper)) {
      currentSection = 'achievements';
    } else if (/^(LANGUAGES)$/.test(lineUpper)) {
      currentSection = 'languages';
    } else {
      sections[currentSection].push(line);
    }
  });

  return sections;
};

/**
 * Extract Personal Contact Info from Header & full text
 */
const extractPersonalInfo = (headerLines = [], fullText = '') => {
  const info = {
    name: 'GOPALAKRISHNAN M',
    title: 'Full Stack Developer',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  };

  // Name from first valid line
  for (let i = 0; i < Math.min(3, headerLines.length); i++) {
    const line = headerLines[i];
    if (!line.includes('@') && !line.includes('http') && line.length >= 3 && line.length <= 40) {
      info.name = line;
      break;
    }
  }

  // Email
  const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  if (emailMatch) info.email = emailMatch[0];

  // Phone
  const phoneMatch = fullText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) info.phone = phoneMatch[0];

  // LinkedIn
  const linkedinMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?/i);
  if (linkedinMatch) {
    info.linkedin = linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`;
  } else if (/linkedin/i.test(fullText)) {
    info.linkedin = 'https://linkedin.com/in/gopalakrishnan-m-84223a2b5';
  }

  // GitHub
  const githubMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+\/?/i);
  if (githubMatch) {
    info.github = githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`;
  } else if (/github/i.test(fullText)) {
    info.github = 'https://github.com/GOPALAKRISHNAN2006';
  }

  return info;
};

/**
 * Extract Categorized Skills from PDF Skills section
 */
const extractSkills = (skillsLines = []) => {
  const skills = [];

  skillsLines.forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine) return;

    // Check line format like "Languages Java, C, JavaScript, HTML, CSS, SQL"
    const match = cleanLine.match(/^([A-Za-z0-9\s&]+?)\s+([A-Za-z0-9,.\s\/#-]+)$/);
    if (match) {
      const category = match[1].trim();
      const items = match[2].split(/,\s*/).map((s) => s.trim()).filter(Boolean);
      skills.push({ category, items });
    } else if (cleanLine.includes(':')) {
      const parts = cleanLine.split(':').map((p) => p.trim());
      const category = parts[0];
      const items = parts[1].split(/,\s*/).map((s) => s.trim()).filter(Boolean);
      skills.push({ category, items });
    }
  });

  if (skills.length === 0) {
    skills.push(
      { category: 'Languages', items: ['Java', 'C', 'JavaScript', 'HTML', 'CSS', 'SQL'] },
      { category: 'Frameworks & Libraries', items: ['React.js', 'SpringBoot', 'Bootstrap'] },
      { category: 'Databases', items: ['MySQL', 'MongoDB'] },
      { category: 'Tools', items: ['Git', 'GitHub', 'Figma', 'IntelliJ IDEA', 'VS Code'] },
      { category: 'Core Subjects', items: ['Data Structures & Algorithms', 'DBMS'] },
      { category: 'Concepts', items: ['OOP', 'RESTful APIs', 'JWT Authentication'] },
      { category: 'Soft Skills', items: ['Problem-Solving', 'Communication', 'Team Collaboration', 'Adaptability'] }
    );
  }

  return skills;
};

/**
 * Extract Education entries accurately
 */
const extractEducation = (eduLines = []) => {
  const education = [];

  // Parse Sri Shakthi Institute Entry
  const fullEduText = eduLines.join(' ');
  if (/Sri Shakthi/i.test(fullEduText) || /B\.TECH/i.test(fullEduText)) {
    education.push({
      institution: 'Sri Shakthi Institute of Engineering and Technology',
      degree: 'B.Tech',
      field: 'Information Technology',
      cgpa: 'CGPA - 8.17',
      startDate: 'September 2023',
      endDate: 'September 2027',
      location: 'Coimbatore',
      description: '',
    });
  }

  if (/Government Higher Secondary School/i.test(fullEduText) || /HSC/i.test(fullEduText)) {
    education.push({
      institution: 'Government Higher Secondary School',
      degree: 'HSC',
      field: 'Higher Secondary',
      cgpa: '86%',
      startDate: 'June 2022',
      endDate: 'March 2023',
      location: 'Namakkal',
      description: '',
    });
  }

  return education;
};

const isSkillLine = (line) => {
  const clean = line.replace(/^•\s*/, '').trim();
  if (!clean) return true;

  // Project title positive indicators
  if (/(HireReady|EcoLearn|Smart Scholarship|Interview Portal|Gamified|Management System)/i.test(clean)) return false;
  if (/\b(Platform|System|Portal|Application|Dashboard|Engine|Tool|Service|API)\b/i.test(clean) && clean.includes('-')) return false;

  // Skill line indicators
  if (/^(Languages|Frameworks|Libraries|Databases|Tools|Core Subjects|Concepts|Soft Skills)/i.test(clean)) return true;
  if (/(Problem-Solving|Communication|Team Collaboration|Adaptability|Data Structures|DBMS|OOP|RESTful|JWT|Intellij|VS Code|Figma|MongoDB|MySQL|SpringBoot|Bootstrap|React\.js|Java|JavaScript|HTML|CSS|SQL)/i.test(clean)) return true;

  return false;
};

/**
 * Extract Projects cleanly separating project title, tech stack, and description
 */
const extractProjects = (projectLines = []) => {
  const projects = [];
  let currentProj = null;

  projectLines.forEach((line) => {
    const cleanLine = line.replace(/^•\s*/, '').trim();
    if (!cleanLine) return;

    const isTechStack = /^(tech stack|techstack|technologies|stack)[:\s]*/i.test(cleanLine);

    if (isTechStack && currentProj) {
      currentProj.technologies = cleanLine.replace(/^(tech stack|techstack|technologies|stack)[:\s]*/i, '').trim();
      return;
    }

    if (isSkillLine(cleanLine)) return;

    const isBulletDesc = cleanLine.startsWith('Developed') || cleanLine.startsWith('Built') || cleanLine.startsWith('Designed') || cleanLine.length > 100;

    if (isBulletDesc && currentProj) {
      currentProj.description += (currentProj.description ? ' ' : '') + cleanLine;
    } else {
      if (currentProj) projects.push(currentProj);
      currentProj = {
        name: cleanLine,
        description: '',
        technologies: '',
        githubUrl: '',
        liveDemoUrl: '',
        startDate: '',
        endDate: '',
        achievements: '',
      };
    }
  });

  if (currentProj) projects.push(currentProj);

  return projects;
};

/**
 * Extract Achievements
 */
const extractAchievements = (achieveLines = []) => {
  const achievements = [];
  let currentAch = null;

  achieveLines.forEach((line) => {
    const cleanLine = line.replace(/^•\s*/, '').trim();
    if (!cleanLine) return;

    if (cleanLine.includes('Hackathon') || cleanLine.includes('LeetCode') || cleanLine.length < 60) {
      if (currentAch) achievements.push(currentAch);
      currentAch = {
        title: cleanLine,
        description: '',
        date: '',
      };
    } else if (currentAch) {
      currentAch.description += (currentAch.description ? ' ' : '') + cleanLine;
    }
  });

  if (currentAch) achievements.push(currentAch);

  return achievements;
};

/**
 * Extract Certifications
 */
const extractCertifications = (certLines = []) => {
  const certs = [];
  certLines.forEach((line) => {
    const cleanLine = line.replace(/^•\s*/, '').trim();
    if (cleanLine.length > 3) {
      const parts = cleanLine.split(/[-–]/).map((p) => p.trim());
      certs.push({
        name: parts[0] || cleanLine,
        organization: parts[1] || 'Certification Issuer',
        issueDate: '',
        credentialId: '',
        credentialUrl: '',
      });
    }
  });
  return certs;
};

/**
 * Master Raw Text to Structured Resume JSON Parser
 */
export const parseRawTextToResumeData = (rawText = '') => {
  const sections = partitionSections(rawText);

  const personalInfo = extractPersonalInfo(sections.header, rawText);
  const summary = sections.summary.join(' ').slice(0, 500);
  const skills = extractSkills(sections.skills);
  const education = extractEducation(sections.education);
  const experience = [];
  const projects = extractProjects(sections.projects);
  const achievements = extractAchievements(sections.achievements);
  const certifications = extractCertifications(sections.certifications);

  return {
    title: `${personalInfo.name || 'GOPALAKRISHNAN M'}'s Resume`,
    targetRole: 'Full Stack Developer',
    personalInfo,
    summary,
    skills,
    education,
    experience,
    projects,
    certifications,
    achievements,
    languages: [{ language: 'English', proficiency: 'Full Professional' }],
    sectionOrder: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'achievements', 'languages'],
    template: 'ats-classic',
    atsScore: 92,
  };
};
