// src/components/DiagnosisForm.js
import React, { useState } from 'react';
import axios from 'axios';

const DiagnosisForm = () => {
  const [responses, setResponses] = useState({});
  const [report, setReport] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/diagnosis/new', responses, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReport(response.data.diagnosis_report);
      setError(null); // Clear any errors
    } catch (error) {
      setError('Failed to submit diagnosis. Please try again.');
      console.error('Error submitting diagnosis:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-200">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Diagnosis Form</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">How do you feel overall?</label>
            <input
              type="text"
              name="feeling"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-gray-700">How is your energy level?</label>
            <input
              type="text"
              name="energy"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-gray-700">Are you feeling hot or cold?</label>
            <input
              type="text"
              name="temperature"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Submit
          </button>
        </form>

        {report && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Your Diagnosis Report</h3>
            <p className="mt-2 text-gray-600">{report}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisForm;
