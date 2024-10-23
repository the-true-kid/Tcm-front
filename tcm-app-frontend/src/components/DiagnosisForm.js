import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiagnosisForm = () => {
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      console.log('Diagnosis submitted successfully:', response.data);

      // Redirect to the report page with the report data
      navigate('/report', { state: { report: response.data.diagnosis_report } });
    } catch (error) {
      setError('Failed to submit diagnosis. Please try again.');
      console.error('Error submitting diagnosis:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-100 via-red-200 to-orange-300">
      <div className="w-full max-w-md h-[80vh] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          TCM Diagnosis Form
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form Fields */}
          <div>
            <label className="block text-gray-700">How do you feel overall?</label>
            <textarea
              name="overallFeeling"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiagnosisForm;
