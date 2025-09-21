import React from 'react';
import './AthleteDashboard.css';
import VideoAnalysis from './VideoAnalysis';

function AthleteDashboard({ athlete }) {
  return (
    <div className="athlete-bg">
      <div className="athlete-gradient" />
      <div className="athlete-container">
        <h2 className="athlete-title">Welcome, {athlete?.name || 'Athlete'}!</h2>
        <div className="athlete-info">
          <p><strong>Email:</strong> {athlete?.email || 'athlete@email.com'}</p>
          <p><strong>Sport:</strong> {athlete?.sport || 'Track & Field'}</p>
          <p><strong>Achievements:</strong> {athlete?.achievements || 'State Level Winner'}</p>
        </div>
        <div className="athlete-actions">
          <button className="assessment-btn">Talent Assessment</button>
          <button className="analytics-btn">View Analytics</button>
        </div>
        <VideoAnalysis />
      </div>
    </div>
  );
}

export default AthleteDashboard;
