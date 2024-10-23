// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">TCM Health App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover the power of Traditional Chinese Medicine.<br />
          Log in to track your health or sign up to get started!
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
