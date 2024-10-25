import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/landing" className="hover:text-gray-300 transition">
            Home
          </Link>
        </div>

        <div className="space-x-4">
          {token ? (
            <>
              <Link
                to="/diagnosis"
                className="text-white hover:text-gray-300 transition"
              >
                New Diagnosis
              </Link>
              <Link
                to="/sessions"
                className="text-white hover:text-gray-300 transition"
              >
                Sessions
              </Link>
              <Link
                to="/profile"
                className="text-white hover:text-gray-300 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-gray-300 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
