import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
import Resume from '../models/Resume.js';
import { parseRawTextToResumeData } from '../services/resumeParserService.js';
import { calculateFinalScore } from '../services/resumeAnalyzerService.js';

/**
 * Helper to parse text from PDF buffer using pdf-parse (v1 function or v2 PDFParse class)
 */
const parsePdfBuffer = async (buffer) => {
  if (!buffer) return '';

  const PDFParseClass = pdfModule.PDFParse || (typeof pdfModule === 'function' ? pdfModule : null);

  if (PDFParseClass && typeof PDFParseClass === 'function' && PDFParseClass.prototype?.getText) {
    const uint8 = new Uint8Array(buffer);
    const parser = new PDFParseClass(uint8);
    const result = await parser.getText();
    if (typeof result === 'string') return result;
    if (result && typeof result.text === 'string') return result.text;
    if (result && Array.isArray(result.pages)) {
      return result.pages.map((p) => p.text || '').join('\n');
    }
  }

  if (typeof pdfModule === 'function') {
    const data = await pdfModule(buffer);
    return data?.text || '';
  }

  throw new Error('PDF parsing library interface not recognized');
};

/**
 * Handle uploaded resume PDF file, extract text, parse into schema JSON, and create resume
 * POST /api/resume/upload
 */
export const uploadResumeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF resume file' });
    }

    let extractedText = '';

    // Handle buffer from multer memory storage
    if (req.file.buffer) {
      extractedText = await parsePdfBuffer(req.file.buffer);
    } else {
      return res.status(400).json({ message: 'Failed to read uploaded file buffer' });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ message: 'Could not extract readable text from PDF' });
    }

    // Parse raw text into structured resume schema
    const parsedData = parseRawTextToResumeData(extractedText);
    parsedData.user = req.user.id;

    // Evaluate initial ATS score
    const atsResult = calculateFinalScore(parsedData);
    parsedData.atsScore = atsResult.score;
    parsedData.atsBreakdown = atsResult.breakdown;

    // Create new resume document in MongoDB
    const resume = await Resume.create(parsedData);

    return res.status(201).json({
      message: 'Resume parsed and created successfully!',
      resume,
      extractedTextSnippet: extractedText.slice(0, 300),
    });
  } catch (error) {
    console.error('Error uploading/parsing resume PDF:', error);
    return res.status(500).json({
      message: error.message || 'Failed to parse uploaded resume file',
    });
  }
};
