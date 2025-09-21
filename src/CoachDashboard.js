import React from 'react';
import './CoachDashboard.css';

function CoachDashboard({ coach }) {
  return (
    <div className="coach-bg">
      <div className="coach-gradient" />
      <div className="coach-container">
        <h2 className="coach-title">Welcome, {coach?.name || 'Coach'}!</h2>
        <div className="coach-info">
          <p><strong>Email:</strong> {coach?.email || 'coach@email.com'}</p>
          <p><strong>Sport:</strong> {coach?.sport || 'Track & Field'}</p>
          <p><strong>Experience:</strong> {coach?.experience || '10 years'}</p>
        </div>
        <div className="coach-actions">
          <button className="search-btn">Search Athletes</button>
          <button className="analytics-btn">Analytics Panel</button>
        </div>
      </div>
    </div>
  );
}

export default CoachDashboard;
