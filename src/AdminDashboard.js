import React from 'react';
import './AdminDashboard.css';

function AdminDashboard({ admin }) {
  return (
    <div className="admin-bg">
      <div className="admin-gradient" />
      <div className="admin-container">
        <h2 className="admin-title">Welcome, {admin?.name || 'Admin'}!</h2>
        <div className="admin-info">
          <p><strong>Email:</strong> {admin?.email || 'admin@email.com'}</p>
          <p><strong>Role:</strong> {admin?.role || 'System Admin'}</p>
        </div>
        <div className="admin-actions">
          <button className="stats-btn">Statistics Panel</button>
          <button className="users-btn">User Management</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
