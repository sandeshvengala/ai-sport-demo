import React from 'react';
import './RoleSelection.css';

const roles = [
  { name: 'Athlete', color: '#27ae60', icon: '🏃' },
  { name: 'Coach', color: '#2980b9', icon: '🎓' },
  { name: 'Admin', color: '#e67e22', icon: '🛡️' },
];

function RoleSelection({ onSelect }) {
  return (
    <div className="role-bg">
      <div className="role-gradient" />
      <div className="role-container">
        <h2 className="role-title">Select Your Role</h2>
        <div className="role-list">
          {roles.map(role => (
            <button
              key={role.name}
              className="role-btn"
              style={{ background: role.color }}
              onClick={() => onSelect && onSelect(role.name)}
            >
              <span className="role-icon">{role.icon}</span>
              {role.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
