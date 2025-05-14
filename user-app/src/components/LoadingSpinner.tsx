import React from 'react';
import '../assets/css/spinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container p-5">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;