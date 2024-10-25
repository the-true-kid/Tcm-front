import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import questions from '../data/tcmQuestions.json'; // Import your questions JSON

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

      const diagnosisResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/diagnosis/new`,
        responses,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const diagnosis = diagnosisResponse.data;

      // Navigate to Report component with the diagnosis ID
      navigate('/report', {
        state: {
          diagnosisId: diagnosis.id, // Pass the diagnosis ID
        },
      });
    } catch (error) {
      setError('Failed to submit diagnosis. Please try again.');
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-orange-300">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          TCM Diagnosis Form
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((section) => (
            <div key={section.section}>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {section.section}
              </h3>
              {section.questions.map((question) => (
                <div key={question.name} className="mb-4">
                  <label className="block text-gray-700 mb-1">
                    {question.label}
                  </label>
                  <input
                    type={question.type}
                    name={question.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiagnosisForm;
