import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SessionDetails = () => {
  const location = useLocation();
  const { sessionId } = location.state || {}; // Get session ID passed through navigation
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/session/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessionData(response.data);
      } catch (error) {
        setError('Failed to fetch session details.');
        console.error('Error fetching session details:', error);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!sessionData) {
    return <p>Loading...</p>;
  }

  const { diagnosis, chats } = sessionData;

  // Parse the diagnosis report from JSON string
  const diagnosisReport = JSON.parse(diagnosis.diagnosis_report);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-300">
      <div className="w-full max-w-3xl h-[80vh] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Session Details</h2>

        <div className="space-y-8">
          {/* Diagnosis Report Section */}
          <div className="border p-4 rounded-lg mb-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Diagnosis Report</h3>
            {Object.entries(diagnosisReport).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b py-2">
                <span className="font-medium text-gray-600">{key.replace(/([A-Z])/g, ' $1')}: </span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>

          {/* TCM Responses Section */}
          {chats && chats.length ? (
            chats.map((chat, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4">
                <h4 className="text-xl font-bold text-gray-700">Chat #{index + 1}</h4>
                <div className="mt-2">
                  {Object.entries(JSON.parse(chat.message_content)).map(([key, value]) => (
                    <div key={key} className="mb-2">
                      <span className="font-semibold">{key.replace(/([A-Z])/g, ' $1')}: </span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No TCM responses available for this session.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
