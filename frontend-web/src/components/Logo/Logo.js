// src/components/Logo/Logo.js
import React from 'react';
import logo from '../../assets/img/Logo_black.png';

const Logo = () => {    
  return (
    <div className="logo">
      <img src={logo} alt="Logo" style={{ height: '70px' }} />
    </div>
  );
};

export default Logo;
