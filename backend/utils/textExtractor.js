const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');

// Extract text from PDF
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
};

// Extract text from DOCX
const extractTextFromDOCX = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw error;
  }
};

// Extract basic information from text
const extractBasicInfo = (text) => {
  const info = {
    name: '',
    email: '',
    phone: ''
  };

  // Email regex
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = text.match(emailRegex);
  if (emails && emails.length > 0) {
    info.email = emails[0];
  }

  // Phone regex (various formats)
  const phoneRegex = /(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g;
  const phones = text.match(phoneRegex);
  if (phones && phones.length > 0) {
    info.phone = phones[0];
  }

  // Name extraction (basic approach - first line that looks like a name)
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  for (let line of lines) {
    line = line.trim();
    // Skip lines that are likely not names
    if (line.length > 2 && line.length < 50 && 
        !line.includes('@') && !line.includes('http') && 
        !line.includes('Phone') && !line.includes('Email') &&
        !line.includes('Resume') && !line.includes('CV')) {
      info.name = line;
      break;
    }
  }

  return info;
};

module.exports = {
  extractTextFromPDF,
  extractTextFromDOCX,
  extractBasicInfo
}; 