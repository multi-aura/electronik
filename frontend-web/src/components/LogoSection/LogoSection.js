import React from 'react';
import '../../assets/css/LogoSection.css';

function LogoSection({ logoImage, altText }) {
    return (
      <div className="text-center">
        <img src={logoImage} alt={altText} className="logo-image mb-4" />
        <h1 className="logo-title">Multi Aura</h1>
        <p className="logo-subtitle">Nơi Mọi Kết Nối Đều Có Ý Nghĩa.</p>
      </div>
    );
  }

export default LogoSection;
