import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );
  
      console.log('Login response:', response.data); // Log the response
  
      const { token } = response.data;
  
      if (token) {
        localStorage.setItem('token', token); // Save token to localStorage
        console.log('Token saved:', localStorage.getItem('token')); // Verify token storage
        navigate('/landing'); // Redirect on success
      } else {
        setError('No token received. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid email or password. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
