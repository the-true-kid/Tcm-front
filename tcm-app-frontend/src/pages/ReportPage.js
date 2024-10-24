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
        console.log('Fetching reports...');

        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage.');
          setError('Authorization token is missing. Please log in.');
          return;
        }

        console.log('Using token:', token);

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/diagnosis/user/reports`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log('Response:', response.data);

        // Sort reports chronologically (oldest first)
        const sortedReports = response.data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        setReports(sortedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
        if (error.response) {
          if (error.response.status === 401) {
            setError('Unauthorized access. Please log in again.');
            localStorage.removeItem('token');
            navigate('/login');
          } else if (error.response.status === 404) {
            setError('No reports found for your account.');
          } else {
            setError('Failed to load reports. Please try again later.');
          }
        } else {
          setError('Network error. Check your internet connection.');
        }
      }
    };

    fetchReports(); // Fetch reports on component mount
  }, [navigate]);

  const handleReportClick = (report, index) => {
    const parsedReport = JSON.parse(report.diagnosis_report);

    console.log('Navigating with report:', parsedReport); // Debugging

    navigate('/report/details', {
      state: {
        report: parsedReport,
        reportNumber: index + 1, // Report numbering starts from 1
        date: formatDate(report.created_at),
      },
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleBackToLanding = () => {
    navigate('/landing');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-300">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Your Diagnosis Reports
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {reports.length === 0 && !error ? (
          <p className="text-gray-600">No reports available.</p>
        ) : (
          <ul className="space-y-4">
            {reports
              .slice() // Create a copy to avoid mutating state
              .reverse() // Display newest report first
              .map((report, index) => (
                <li
                  key={report.id}
                  className="p-4 border rounded-md bg-gray-50 shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleReportClick(report, reports.length - index - 1)}
                >
                  <h3 className="font-semibold">
                    {formatDate(report.created_at)} - Report #{reports.length - index}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Click to view full report
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
