import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, allowedRole, userRole, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}

export default ProtectedRoute;
