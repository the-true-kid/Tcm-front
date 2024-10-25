import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/diagnosis/user/reports`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Response data:', response.data); // Debugging log
        setSessions(response.data);
      } catch (error) {
        setError('Failed to fetch sessions. Please try again.');
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const handleSessionClick = (sessionId) => {
    navigate('/session-details', { state: { sessionId } }); // Corrected this line
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-300">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Your Diagnosis Sessions
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="max-h-[70vh] overflow-y-auto space-y-4">
          {sessions.length === 0 ? (
            <p className="text-gray-700">No sessions found.</p>
          ) : (
            <ul className="space-y-4">
              {sessions.map((session, index) => (
                <li
                  key={session.id}
                  className="p-4 border rounded-md bg-gray-50 shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSessionClick(session.id)} // Pass session ID
                >
                  <h3 className="font-semibold">
                    Session #{index + 1} - {new Date(session.created_at).toLocaleString()}
                  </h3>
                  <p className="text-sm text-gray-600">Click to view details</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionList;
