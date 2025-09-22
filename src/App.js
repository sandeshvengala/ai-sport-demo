import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import RoleSelection from './RoleSelection';
import AthleteDashboard from './AthleteDashboard';
import CoachDashboard from './CoachDashboard';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import NotificationBar from './NotificationBar';
// import { sendNotificationEmail } from './emailService';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Example notification triggers
  const triggerNotification = (message, type = 'info') => {
    setNotifications(prev => [...prev, { message, type }]);
  };
  const handleCloseNotification = idx => {
    setNotifications(prev => prev.filter((_, i) => i !== idx));
  };

  const mockAthlete = {
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    sport: 'Track & Field',
    achievements: 'State Level Winner',
  };

  const mockCoach = {
    name: 'Priya Singh',
    email: 'priya.sing@email.com',
    sport: 'Track & Field',
    experience: '10 years',
  };

  const mockAdmin = {
    name: 'Ravi Sharma',
    email: 'ravi.sharma@email.com',
    role: 'System Admin',
  };

  // Simulate login
  const handleLoginSignup = () => {
    setShowRoleSelection(true);
    setIsAuthenticated(true);
    triggerNotification('Welcome! Please select your role.', 'success');
  };

  // Example: feedback, event nomination, admin action
  const handleFeedback = () => {
    triggerNotification('Feedback submitted!', 'success');
    // Simulate sending video to AI for tracking
    setTimeout(() => {
      triggerNotification('Video sent to AI for tracking and analysis!', 'info');
    }, 1500);
  };
  const handleNominate = () => triggerNotification('Athlete nominated for event!', 'info');
  const handleAdminAction = () => triggerNotification('User suspended by admin.', 'error');

  return (
    <>
      <NotificationBar notifications={notifications} onClose={handleCloseNotification} />
      <Routes>
        <Route path="/" element={
          !showRoleSelection ? (
            <div className="App athletics-bg">
              <div className="gradient-overlay" />
              <header className="App-header">
                <img src={logo} className="App-logo animated" alt="logo" />
                <h1 className="app-title">AI Sports Talent Assessment</h1>
                <blockquote className="app-quote">"Unleashing potential, one athlete at a time."</blockquote>
                <div className="login-signup-box">
                  <button className="login-btn" onClick={handleLoginSignup}>Login</button>
                  <button className="signup-btn" onClick={handleLoginSignup}>Sign Up</button>
                </div>
              </header>
            </div>
          ) : (
            <RoleSelection onSelect={role => {
              setSelectedRole(role);
              if (role === 'Athlete') navigate('/athlete');
              else if (role === 'Coach') navigate('/coach');
              else if (role === 'Admin') navigate('/admin');
            }} />
          )
        } />
        <Route path="/athlete" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} allowedRole="Athlete" userRole={selectedRole}>
            <AthleteDashboard athlete={mockAthlete} />
            <button onClick={handleFeedback} style={{margin:'20px'}}>Submit Feedback</button>
          </ProtectedRoute>
        } />
        <Route path="/coach" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} allowedRole="Coach" userRole={selectedRole}>
            <CoachDashboard coach={mockCoach} />
            <button onClick={handleNominate} style={{margin:'20px'}}>Nominate Athlete</button>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} allowedRole="Admin" userRole={selectedRole}>
            <AdminDashboard admin={mockAdmin} />
            <button onClick={handleAdminAction} style={{margin:'20px'}}>Suspend User</button>
          </ProtectedRoute>
        } />
        <Route path="/unauthorized" element={<div style={{textAlign:'center',marginTop:'100px',color:'#fff'}}><h2>Unauthorized Access</h2></div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
