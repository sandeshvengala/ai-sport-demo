import React from 'react';
import './NotificationBar.css';

function NotificationBar({ notifications, onClose }) {
  return (
    <div className="notification-bar">
      {notifications.map((note, idx) => (
        <div key={idx} className={`notification ${note.type || 'info'}`}>
          <span>{note.message}</span>
          <button className="close-btn" onClick={() => onClose(idx)}>×</button>
        </div>
      ))}
    </div>
  );
}

export default NotificationBar;
