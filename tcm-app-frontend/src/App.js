import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DiagnosisForm from './components/DiagnosisForm';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import ReportForm from './components/ReportForm'; 
import SessionList from './pages/SessionList'; // Import new pages
import SessionDetails from './pages/SessionDetails'; // Import new pages
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="content">
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
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sessions"
              element={
                <ProtectedRoute>
                  <SessionList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/session-details"
              element={
                <ProtectedRoute>
                  <SessionDetails />
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
        </div>
      </div>
    </Router>
  );
}

export default App;
