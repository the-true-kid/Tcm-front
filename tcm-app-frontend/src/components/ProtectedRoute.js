// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token

  return token ? children : <Navigate to="/login" />; // Redirect if not logged in
};

export default ProtectedRoute;
