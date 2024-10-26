import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const navItems = [
    { icon: faPhone, label: 'Hotline 1900.5301' },
    { icon: faMapMarkerAlt, label: 'Hệ thống Showroom' },
    { icon: faShoppingCart, label: 'Giỏ hàng' },
    { icon: faUser, label: 'Đăng nhập' },
  ];

  return (
    <div className="d-flex align-items-center">
        {navItems.map((item, index) => (
        <div
            key={index}
            className="d-flex align-items-center text-white me-4"
            style={{ fontSize: '14px' }}
        >
            <FontAwesomeIcon icon={item.icon} className="me-2" />
            <span>{item.label}</span>
        </div>
        ))}
    </div>
  );
};

export default Navigation;
