// src/pages/SingleReportPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SingleReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.report || 'No report found.';

  const handleBackToReports = () => {
    navigate('/report'); // Navigate back to the report list
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-300">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Report Details
        </h2>
        <p className="mt-2 text-gray-600 whitespace-pre-line">{report}</p>

        <button
          onClick={handleBackToReports}
          className="mt-8 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Back to Reports
        </button>
      </div>
    </div>
  );
};

export default SingleReportPage;
