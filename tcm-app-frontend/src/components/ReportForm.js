import React from 'react';
import { useLocation } from 'react-router-dom';

const Report = () => {
  const location = useLocation();
  const { tcmResponse } = location.state || {}; // Only extract the TCM response

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-300">
      <div className="w-full max-w-lg h-[80vh] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          TCM Recommendations
        </h2>

        <div className="mb-6">
          <p className="text-gray-700">{tcmResponse}</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
