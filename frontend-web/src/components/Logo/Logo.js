// src/components/Logo/Logo.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/Logo_black.png';

const Logo = () => {    
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Logo" style={{ height: '70px' }} />
      </Link>
  </div>
  );
};

export default Logo;
