// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    navigate('/'); // Redirect to Home Page
  };

  const goToDiagnosis = () => {
    navigate('/diagnosis'); // Navigate to Diagnosis Form
  };

  const goToSessions = () => {
    navigate('/sessions'); // Navigate to Report Page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-100 to-orange-300">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
        <p className="text-lg mb-6">Ready to start your diagnosis journey or review your report?</p>
        <div className="space-x-4">
          <button
            onClick={goToDiagnosis}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Start Diagnosis
          </button>
          <button
            onClick={goToSessions}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            View Sessions
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
