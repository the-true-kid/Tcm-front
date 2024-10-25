import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Report = () => {
  const location = useLocation();
  const { diagnosisId } = location.state || {};
  const [tcmResponse, setTcmResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTcmResponse = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/chats/tcm-diagnosis`,
          { diagnosisId }, // Send the diagnosis ID to fetch TCM recommendations
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTcmResponse(response.data.chat); // Set the TCM response from the server
      } catch (error) {
        setError('Failed to fetch TCM recommendations. Please try again.');
        console.error('Error fetching TCM recommendations:', error.message);
      }
    };

    fetchTcmResponse();
  }, [diagnosisId]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!tcmResponse) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading TCM recommendations...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-300">
      <div className="w-full max-w-lg h-[80vh] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          TCM Diagnosis Report
        </h2>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
          <p className="text-gray-700">{tcmResponse.summary}</p>

          <h3 className="text-xl font-semibold text-gray-800">Conceptual Information</h3>
          <p className="text-gray-700">{tcmResponse.conceptualInfo}</p>

          <h3 className="text-xl font-semibold text-gray-800">Dietary Recommendations</h3>
          <p className="text-gray-700">{tcmResponse.dietaryRecommendations}</p>

          <h3 className="text-xl font-semibold text-gray-800">Herbal Recommendations</h3>
          <p className="text-gray-700">{tcmResponse.herbalRecommendations}</p>

          <h3 className="text-xl font-semibold text-gray-800">Lifestyle Recommendations</h3>
          <p className="text-gray-700">{tcmResponse.lifestyleRecommendations}</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
