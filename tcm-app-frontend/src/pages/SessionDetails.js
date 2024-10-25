import React from 'react';
import { useLocation } from 'react-router-dom';

const SessionDetails = () => {
  const location = useLocation();
  const { session } = location.state || {};

  if (!session) {
    return <p>No session data available.</p>;
  }

  const { diagnosis_report, chat } = session;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-blue-300">
      <div className="w-full max-w-lg h-[80vh] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Session Details
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Diagnosis Report</h3>
          <p className="text-gray-700">{diagnosis_report}</p>
        </div>

        {chat ? (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">TCM Response</h3>
            <p className="text-gray-700">{chat.message_content}</p>
          </div>
        ) : (
          <p className="text-gray-700">No TCM response available for this session.</p>
        )}
      </div>
    </div>
  );
};

export default SessionDetails;
