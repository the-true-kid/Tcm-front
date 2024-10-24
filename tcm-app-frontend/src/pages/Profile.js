import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token
        console.log('Retrieved token:', token); // Debugging

        if (!token) {
          setError('You must be logged in to view this page.');
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Send token
          }
        );

        console.log('User data:', response.data); // Debug response
        setUser(response.data); // Store user data
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError('Failed to load user data. Please try again.');
      }
    };

    fetchUserData(); // Fetch user data on component mount
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-4">Loading user data...</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-300">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome, {user.email}
        </h1>
        <div className="text-lg text-gray-700 space-y-4">
          <p><span className="font-semibold">User ID:</span> {user.id}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
