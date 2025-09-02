import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import '../css/notification.css';

const Notification = ({ message, type, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationTriangle />;
      default:
        return <FaCheckCircle />;
    }
  };

  return (
    <div className={`notification ${type} ${isVisible ? 'show' : 'hide'}`}>
      <div className="notification-content">
        <div className="notification-icon">
          {getIcon()}
        </div>
        <span className="notification-message">{message}</span>
        <button className="notification-close" onClick={() => setIsVisible(false)}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

// Hook để quản lý notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    const newNotification = { id, message, type };
    
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const NotificationContainer = () => (
    <div className="notification-container">
      {notifications.map(notif => (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type}
          onClose={() => removeNotification(notif.id)}
        />
      ))}
    </div>
  );

  return { addNotification, NotificationContainer };
};

export default Notification;