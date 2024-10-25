import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-300">
      <div className="w-full max-w-3xl h-[80vh] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Session Details</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Diagnosis Report</h3>
            <pre className="text-gray-700 whitespace-pre-wrap">{JSON.stringify(diagnosis, null, 2)}</pre>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">TCM Responses</h3>
            {chats.length ? (
              chats.map((chat, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-xl font-bold text-gray-700">Chat #{index + 1}</h4>
                  <pre className="text-gray-700 whitespace-pre-wrap">{chat.message_content}</pre>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No TCM responses available for this session.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
