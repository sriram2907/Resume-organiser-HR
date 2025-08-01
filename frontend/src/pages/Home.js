import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Search } from 'lucide-react';

const Home = () => {

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Organize Your Resumes
          <span className="text-blue-400"> Smarter</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Upload, organize, and manage resumes with intelligent text extraction and powerful search capabilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/upload"
            className="glass-button inline-flex items-center justify-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Resume</span>
          </Link>
          <Link
            to="/list"
            className="glass-button inline-flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>View Resumes</span>
          </Link>
        </div>
      </div>

      {/* What This Website Does Section */}
      <div className="glass-card max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          What This Website Does
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl mb-4">📄</div>
            <div className="text-xl text-gray-300 font-semibold mb-3">Smart Text Extraction</div>
            <div className="text-gray-400">Automatically extracts names, emails, and phone numbers from your uploaded resumes</div>
          </div>
          <div>
            <div className="text-4xl mb-4">🏷️</div>
            <div className="text-xl text-gray-300 font-semibold mb-3">Organize with Tags</div>
            <div className="text-gray-400">Categorize resumes by skills, experience level, or any criteria you choose</div>
          </div>
          <div>
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-xl text-gray-300 font-semibold mb-3">Powerful Search</div>
            <div className="text-gray-400">Find resumes instantly by name, email, tags, or any search term</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 