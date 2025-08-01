import React, { useState } from 'react';
import { Upload as UploadIcon, FileText, X, Check } from 'lucide-react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage({ type: 'error', text: 'Please select a PDF or DOCX file' });
        return;
      }

      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 10MB' });
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setMessage({ type: '', text: '' });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file to upload' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('resume', file);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('tags', formData.tags);

      const response = await axios.post('/api/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ type: 'success', text: 'Resume uploaded successfully!' });
      setFile(null);
      setPreview(null);
      setFormData({ name: '', email: '', phone: '', tags: '' });
      
      // Clear file input
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Error uploading resume' 
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload Resume</h1>
        <p className="text-gray-300">Upload a PDF or DOCX file and add additional information</p>
      </div>

      {/* Message Display */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* File Upload Section */}
        <div className="glass-card">
          <h2 className="text-xl font-semibold text-white mb-4">Upload File</h2>
          
                      {!file ? (
              <div className="border-2 border-dashed border-gray-500/50 rounded-lg p-8 text-center hover:border-blue-400/50 transition-colors backdrop-blur-sm bg-black/20">
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-white mb-2">
                    Choose a file or drag it here
                  </p>
                  <p className="text-gray-400">
                    PDF or DOCX files up to 10MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="border border-gray-600/50 rounded-lg p-4 backdrop-blur-sm bg-black/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">{file.name}</p>
                      <p className="text-sm text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
        </div>

        {/* Form Fields Section */}
        <div className="glass-card">
          <h2 className="text-xl font-semibold text-white mb-4">Additional Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter email"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter phone number"
              />
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., Frontend, React, Senior"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !file}
            className={`glass-button ${
              loading || !file ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload; 