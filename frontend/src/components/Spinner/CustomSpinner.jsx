import React from 'react';
import './CustomSpinner.css';
import logo from '../../assets/logo.jpg';

const CustomSpinner = () => {
  return (
    <div className="custom-spinner-overlay">
      <div className="custom-spinner-wrapper">
        <img src={logo} alt="Logo" className="spinner-logo" />
        <div className="spinner-ring"></div>
      </div>
    </div>
  );
};

export default CustomSpinner;
