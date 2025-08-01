import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Trash2, Eye, Tag, Mail, Phone, FileText } from 'lucide-react';
import axios from 'axios';

const List = () => {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [availableTags, setAvailableTags] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  useEffect(() => {
    fetchResumes();
    fetchTags();
  }, []);

  useEffect(() => {
    filterResumes();
  }, [resumes, searchTerm, selectedTag]);

  const fetchResumes = async () => {
    try {
      const response = await axios.get('/api/resumes');
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/tags');
      setAvailableTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const filterResumes = () => {
    let filtered = resumes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resume =>
        resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter(resume =>
        resume.tags.includes(selectedTag)
      );
    }

    setFilteredResumes(filtered);
  };

  const handleDelete = async (resumeId) => {
    try {
      await axios.delete(`/api/resumes/${resumeId}`);
      setResumes(resumes.filter(resume => resume._id !== resumeId));
      setShowDeleteModal(false);
      setResumeToDelete(null);
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  const openDeleteModal = (resume) => {
    setResumeToDelete(resume);
    setShowDeleteModal(true);
  };

  const downloadResume = (resume) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/uploads/${resume.filePath}`;
    link.download = resume.originalFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Resumes</h1>
        <p className="text-gray-300">
          {filteredResumes.length} of {resumes.length} resumes
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="glass-card mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, email, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="md:w-64">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="input-field"
            >
              <option value="">All Tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedTag) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('');
              }}
              className="glass-button"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Resumes Grid */}
      {filteredResumes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            {resumes.length === 0 ? 'No resumes uploaded yet' : 'No resumes found'}
          </h3>
          <p className="text-gray-400">
            {resumes.length === 0 
              ? 'Upload your first resume to get started' 
              : 'Try adjusting your search or filter criteria'
            }
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <div key={resume._id} className="glass-card">
              {/* File Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3 className="font-semibold text-white truncate">
                      {resume.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {resume.originalFileName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {resume.email && (
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{resume.email}</span>
                  </div>
                )}
                {resume.phone && (
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Phone className="h-4 w-4" />
                    <span>{resume.phone}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {resume.tags && resume.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {resume.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/30 text-blue-300 backdrop-blur-sm"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Date */}
              <div className="text-sm text-gray-500 mb-4">
                Uploaded {formatDate(resume.uploadedAt)}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
                <div className="flex space-x-2">
                  <button
                    onClick={() => downloadResume(resume)}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors backdrop-blur-sm"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => window.open(`http://localhost:5000/uploads/${resume.filePath}`, '_blank')}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors backdrop-blur-sm"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => openDeleteModal(resume)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors backdrop-blur-sm"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && resumeToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Resume
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{resumeToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setResumeToDelete(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(resumeToDelete._id)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List; 