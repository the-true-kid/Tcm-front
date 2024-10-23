// src/components/DiagnosisForm.js
import React, { useState } from 'react';
import axios from 'axios';

const DiagnosisForm = () => {
  const [responses, setResponses] = useState({});
  const [report, setReport] = useState('');

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
    } catch (error) {
      console.error('Error submitting diagnosis:', error.message);
    }
  };

  return (
    <div>
      <h2>Diagnosis Form</h2>
      <form onSubmit={handleSubmit}>
        <label>How do you feel overall?</label>
        <input type="text" name="feeling" onChange={handleChange} />

        <label>How is your energy level?</label>
        <input type="text" name="energy" onChange={handleChange} />

        <label>Are you feeling hot or cold?</label>
        <input type="text" name="temperature" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>

      {report && (
        <div>
          <h3>Your Diagnosis Report</h3>
          <p>{report}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosisForm;
