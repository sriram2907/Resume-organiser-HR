# 📄 Resume Organizer - HR Management System

A modern, full-stack MERN application designed specifically for HR professionals to organize, manage, and efficiently search through candidate resumes. Features intelligent text extraction, powerful search capabilities, and a beautiful dark theme with glass morphism design.

![Resume Organizer](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Express.js](https://img.shields.io/badge/Express.js-4.18.2-black?style=for-the-badge&logo=express)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🎯 Project Overview

Resume Organizer is a comprehensive HR management solution that streamlines the process of handling candidate resumes. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides an intuitive interface for uploading, organizing, and searching through resumes with advanced filtering capabilities.

### 🌟 Key Features

- **📤 Smart File Upload** - Drag & drop PDF/DOCX resume uploads with automatic text extraction
- **🔍 Advanced Search** - Find candidates instantly by name, email, skills, or custom tags
- **🏷️ Tag-Based Organization** - Categorize resumes with custom tags (e.g., "Frontend", "Senior", "React")
- **👁️ Resume Preview** - View resumes directly in the browser without downloading
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern Dark UI** - Beautiful glass morphism design with smooth animations
- **⚡ Real-time Updates** - Instant feedback and state management
- **🔒 Secure File Storage** - Local file system with proper validation and security

## 🛠️ Technology Stack

### Backend Architecture
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Multer** - File upload middleware
- **pdf-parse** - PDF text extraction library
- **mammoth** - DOCX text extraction library
- **CORS** - Cross-origin resource sharing

### Frontend Architecture
- **React 18** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful icon library
- **Glass Morphism** - Modern UI design pattern

### Development Tools
- **Concurrently** - Run multiple commands simultaneously
- **Nodemon** - Auto-restart server during development
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for version control)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sriram2907/Resume-organiser-HR.git
   cd Resume-organiser-HR
   ```

2. **Install Dependencies**
   ```bash
   # Install all dependencies (root, backend, and frontend)
   npm run install-all
   
   # Or install manually:
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp backend/config.env.example backend/config.env
   
   # Edit the configuration file with your settings
   # Update MONGODB_URI with your database connection string
   ```

4. **Database Setup**
   ```bash
   # For MongoDB Atlas:
   # 1. Create a free account at https://mongodb.com/atlas
   # 2. Create a new cluster
   # 3. Get your connection string
   # 4. Update MONGODB_URI in backend/config.env
   
   # For local MongoDB:
   # 1. Install MongoDB Community Edition
   # 2. Start MongoDB service
   # 3. Use: MONGODB_URI=mongodb://localhost:27017/resume-organizer
   ```

5. **Start the Application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run server  # Backend only (port 5000)
   npm run client  # Frontend only (port 3000)
   ```

6. **Access the Application**
   - 🌐 **Frontend**: http://localhost:3000
   - 🔧 **Backend API**: http://localhost:5000
   - 📚 **API Documentation**: http://localhost:5000/api/resumes

## 📚 API Documentation

### Resume Management Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/upload` | Upload a new resume | `FormData` (file + metadata) |
| `GET` | `/api/resumes` | Get all resumes | Query params: `search`, `tag` |
| `GET` | `/api/resumes/:id` | Get specific resume | - |
| `DELETE` | `/api/resumes/:id` | Delete a resume | - |

### Tag Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tags` | Get all unique tags |

### Request Examples

**Upload Resume:**
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@resume.pdf" \
  -F "tags=Frontend,React,Senior" \
  -F "name=John Doe" \
  -F "email=john@example.com"
```

**Search Resumes:**
```bash
curl "http://localhost:5000/api/resumes?search=react&tag=Frontend"
```

**Get All Tags:**
```bash
curl http://localhost:5000/api/tags
```

## 🎯 User Guide

### 1. Uploading Resumes

1. **Navigate to Upload Page**
   - Click "Upload" in the navigation bar
   - Or visit: http://localhost:3000/upload

2. **Select Resume File**
   - Supported formats: PDF, DOCX
   - Maximum file size: 10MB
   - Drag & drop or click to browse

3. **Add Metadata**
   - **Tags**: Add relevant tags (e.g., "Frontend", "React", "Senior")
   - **Name**: Candidate's full name
   - **Email**: Candidate's email address
   - **Phone**: Candidate's phone number (optional)

4. **Submit**
   - Click "Upload Resume"
   - System automatically extracts text and basic information
   - File is stored securely in the uploads directory

### 2. Organizing with Tags

- **Create Meaningful Tags**: Use descriptive tags like "Frontend", "Backend", "Senior", "Junior", "React", "Node.js"
- **Multiple Tags**: Separate tags with commas
- **Consistent Naming**: Use consistent tag names for better organization
- **Tag Categories**: Consider using prefixes like "skill:", "level:", "location:"

### 3. Searching and Filtering

- **Search Bar**: Type any text to search across names, emails, and tags
- **Tag Filter**: Use the dropdown to filter by specific tags
- **Clear Filters**: Click "Clear Filters" to reset search
- **Real-time Results**: Results update as you type

### 4. Managing Resumes

- **Preview**: Click the eye icon to view resume content
- **Download**: Click the download icon to get the original file
- **Delete**: Click the trash icon to remove from the system
- **Edit Tags**: Update tags directly from the list view

## 🎨 Design Features

### Visual Design
- **Dark Theme**: Easy on the eyes with beautiful gradient backgrounds
- **Glass Morphism**: Modern translucent glass effects with backdrop blur
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Layout**: Adapts perfectly to all screen sizes
- **Custom Icons**: Beautiful Lucide React icons throughout the interface

### User Experience
- **Intuitive Navigation**: Clear navigation with active state indicators
- **Loading States**: Visual feedback during file uploads and searches
- **Error Handling**: User-friendly error messages and validation
- **Accessibility**: Keyboard navigation and screen reader support

## 📁 Project Structure

```
Resume-organiser-HR/
├── backend/                    # Backend server code
│   ├── models/                 # MongoDB schemas
│   │   └── Resume.js          # Resume document model
│   ├── routes/                 # API route handlers
│   │   └── resumeRoutes.js    # Resume CRUD operations
│   ├── utils/                  # Utility functions
│   │   └── textExtractor.js   # PDF/DOCX text extraction
│   ├── uploads/                # File storage directory
│   ├── config.env             # Environment variables
│   ├── config.env.example     # Environment template
│   ├── package.json           # Backend dependencies
│   └── server.js              # Express server setup
├── frontend/                   # React frontend application
│   ├── public/                 # Static assets
│   │   ├── favicon.svg        # Custom application icon
│   │   ├── index.html         # HTML template
│   │   └── manifest.json      # PWA manifest
│   ├── src/                    # Source code
│   │   ├── components/         # Reusable components
│   │   │   └── Navbar.js      # Navigation component
│   │   ├── pages/              # Page components
│   │   │   ├── Home.js        # Landing page
│   │   │   ├── Upload.js      # File upload page
│   │   │   └── List.js        # Resume list page
│   │   ├── App.js             # Main application component
│   │   ├── index.js           # Application entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── postcss.config.js      # PostCSS configuration
├── .gitignore                 # Git ignore rules
├── package.json               # Root package.json with scripts
├── README.md                  # Project documentation
└── setup.js                   # Automated setup script
```

## 🔧 Configuration

### Environment Variables

Create `backend/config.env` with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-organizer

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_PATH=./uploads

# Security Configuration
CORS_ORIGIN=http://localhost:3000
```

### File Upload Settings

- **Supported Formats**: PDF, DOCX
- **Maximum Size**: 10MB per file
- **Storage Location**: `backend/uploads/`
- **File Naming**: Timestamp-based unique names
- **Security**: File type validation and size limits

### Database Schema

```javascript
// Resume Document Schema
{
  name: String,           // Candidate name
  email: String,          // Candidate email
  phone: String,          // Candidate phone (optional)
  tags: [String],         // Array of tags
  filePath: String,       // File storage path
  originalName: String,   // Original filename
  fileType: String,       // File extension
  fileSize: Number,       // File size in bytes
  uploadedAt: Date,       // Upload timestamp
  extractedText: String   // Extracted text content
}
```

## 🚀 Deployment

### Backend Deployment (Node.js)

#### Option 1: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-resume-organizer

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### Option 2: Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

#### Option 3: DigitalOcean App Platform
1. Create new app from GitHub repository
2. Configure environment variables
3. Set build command: `npm run build`
4. Set run command: `npm start`

### Frontend Deployment (React)

#### Option 1: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option 2: Netlify
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

#### Option 3: GitHub Pages
```bash
# Add homepage to package.json
"homepage": "https://yourusername.github.io/resume-organizer"

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script
"deploy": "gh-pages -d build"

# Build and deploy
npm run build
npm run deploy
```

### Environment Variables for Production

```env
# Production Configuration
NODE_ENV=production
PORT=process.env.PORT
MONGODB_URI=your_production_mongodb_uri
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] File upload (PDF and DOCX)
- [ ] Text extraction accuracy
- [ ] Search functionality
- [ ] Tag filtering
- [ ] Resume preview
- [ ] File download
- [ ] Resume deletion
- [ ] Responsive design
- [ ] Error handling

### Automated Testing (Future Enhancement)

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🔒 Security Considerations

### File Upload Security
- File type validation (MIME type checking)
- File size limits
- Secure file naming (timestamp-based)
- Virus scanning (recommended for production)

### API Security
- Input validation and sanitization
- CORS configuration
- Rate limiting (recommended)
- Authentication (for production use)

### Database Security
- MongoDB Atlas security features
- Connection string encryption
- Regular backups
- Access control

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/Resume-organiser-HR.git
   cd Resume-organiser-HR
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   - Test locally before submitting
   - Ensure all features work correctly
   - Check for any console errors

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Provide a clear description of changes
   - Include screenshots if UI changes
   - Reference any related issues

MIT License

Copyright (c) 2024 Resume Organizer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🌟 Star This Repository

If you found this project helpful, please give it a ⭐ star on GitHub!

**Repository**: https://github.com/sriram2907/Resume-organiser-HR

---

**Made with ❤️ for better HR management**

*Built by SRIRAM - Empowering HR professionals with modern tools*
