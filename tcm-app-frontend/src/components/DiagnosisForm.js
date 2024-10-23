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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/diagnosis/new`,
        responses,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReport(response.data.diagnosis_report);
      setError(null);
    } catch (error) {
      setError('Failed to submit diagnosis. Please try again.');
      console.error('Error submitting diagnosis:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-blue-300">
      <div className="w-full max-w-2xl h-[80vh] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          TCM Diagnosis Form
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Health Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              General Health
            </h3>
            <textarea
              name="overallFeeling"
              placeholder="How do you feel overall?"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400"
            />
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Energy Level</label>
              <select
                name="energyLevel"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select</option>
                <option value="stable">Stable</option>
                <option value="fluctuates">Fluctuates</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Symptoms Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Symptoms & Sensations
            </h3>
            <div className="flex items-center mb-4">
              <label className="mr-4">Cold Hands or Feet?</label>
              <div>
                <label className="mr-2">
                  <input
                    type="radio"
                    name="coldHandsFeet"
                    value="often"
                    onChange={handleChange}
                  />{' '}
                  Often
                </label>
                <label className="mr-2">
                  <input
                    type="radio"
                    name="coldHandsFeet"
                    value="sometimes"
                    onChange={handleChange}
                  />{' '}
                  Sometimes
                </label>
                <label>
                  <input
                    type="radio"
                    name="coldHandsFeet"
                    value="never"
                    onChange={handleChange}
                  />{' '}
                  Never
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Describe any pain or discomfort
              </label>
              <textarea
                name="painDiscomfort"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>

        {report && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Your Diagnosis Report
            </h3>
            <p className="mt-2 text-gray-600">{report}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisForm;
