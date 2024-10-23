// src/pages/ReportPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/diagnosis/user/reports`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReports(response.data); // Set fetched reports
      } catch (error) {
        console.error('Error fetching reports:', error.message);
        setError('Failed to load reports. Please try again.');
      }
    };

    fetchReports(); // Fetch reports on component mount
  }, []);

  const handleBackToLanding = () => {
    navigate('/landing'); // Navigate back to landing page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-300">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Your Diagnosis Reports
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {reports.length === 0 ? (
          <p className="text-gray-600">No reports available.</p>
        ) : (
          <ul className="space-y-4">
            {reports.map((report, index) => (
              <li
                key={index}
                className="p-4 border rounded-md bg-gray-50 shadow-sm"
              >
                <h3 className="font-semibold">Report #{index + 1}</h3>
                <p className="mt-2 whitespace-pre-line">
                  {report.report}
                </p>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleBackToLanding}
          className="mt-8 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Back to Landing Page
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
