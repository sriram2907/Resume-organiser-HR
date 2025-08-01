const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  filePath: {
    type: String,
    required: true
  },
  originalFileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
resumeSchema.index({ name: 'text', email: 'text', tags: 'text' });

module.exports = mongoose.model('Resume', resumeSchema); 