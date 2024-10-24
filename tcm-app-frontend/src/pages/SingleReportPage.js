import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SingleReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { report, reportNumber, date } = location.state || {}; // Destructure state

  useEffect(() => {
    console.log('Location State on SingleReportPage:', location.state); // Debugging
    if (!location.state) {
      console.warn('No report found, redirecting to reports.');
      navigate('/report'); // Redirect if state is missing
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-300">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {date} - Report #{reportNumber}
        </h2>
        <div className="mt-4 space-y-2">
          {report ? (
            Object.entries(report).map(([key, value], index) => (
              <div key={index} className="flex justify-between p-4 border-b">
                <span className="font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No details available.</p>
          )}
        </div>

        <button
          onClick={() => navigate('/report')}
          className="mt-8 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Back to Reports
        </button>
      </div>
    </div>
  );
};

export default SingleReportPage;
