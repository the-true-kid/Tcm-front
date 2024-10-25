// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');  // State for the user's name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Error handling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        name,      // Send name in the request
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
