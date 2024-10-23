// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/diagnosis/user/1', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiagnoses(response.data);
    };

    fetchDiagnoses();
  }, []);

  return (
    <div>
      <h2>Your Diagnoses</h2>
      <ul>
        {diagnoses.map((d) => (
          <li key={d.id}>{d.diagnosis_report}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
