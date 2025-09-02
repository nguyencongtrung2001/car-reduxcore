import React from 'react';
import '../css/loading.css';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;