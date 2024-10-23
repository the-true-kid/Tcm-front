// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DiagnosisForm from './components/DiagnosisForm';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/landing" 
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/diagnosis" 
          element={
            <ProtectedRoute>
              <DiagnosisForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
