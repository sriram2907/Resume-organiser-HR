const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Resume = require('../models/Resume');
const { extractTextFromPDF, extractTextFromDOCX, extractBasicInfo } = require('../utils/textExtractor');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.docx'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// POST /api/upload - Upload a resume
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();
    let extractedText = '';

    // Extract text based on file type
    if (fileType === '.pdf') {
      extractedText = await extractTextFromPDF(filePath);
    } else if (fileType === '.docx') {
      extractedText = await extractTextFromDOCX(filePath);
    }

    // Extract basic information
    const basicInfo = extractBasicInfo(extractedText);

    // Create resume document
    const resume = new Resume({
      name: basicInfo.name || req.body.name || 'Unknown',
      email: basicInfo.email || req.body.email || '',
      phone: basicInfo.phone || req.body.phone || '',
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
      filePath: req.file.filename,
      originalFileName: req.file.originalname,
      fileType: fileType
    });

    await resume.save();

    res.status(201).json({
      message: 'Resume uploaded successfully',
      resume: resume
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading resume' });
  }
});

// GET /api/resumes - Get all resumes
router.get('/resumes', async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const resumes = await Resume.find(query).sort({ uploadedAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Error fetching resumes' });
  }
});

// GET /api/resumes/:id - Get specific resume
router.get('/resumes/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Error fetching resume' });
  }
});

// DELETE /api/resumes/:id - Delete a resume
router.delete('/resumes/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(uploadsDir, resume.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Resume.findByIdAndDelete(req.params.id);

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Error deleting resume' });
  }
});

// GET /api/tags - Get all unique tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await Resume.distinct('tags');
    res.json(tags.filter(tag => tag && tag.trim() !== ''));
  } catch (error) {
    console.error('Tags fetch error:', error);
    res.status(500).json({ error: 'Error fetching tags' });
  }
});

module.exports = router; 