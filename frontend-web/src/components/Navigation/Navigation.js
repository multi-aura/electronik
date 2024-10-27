import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { icon: faPhone, label: 'Hotline 1900.5301' },
    { icon: faMapMarkerAlt, label: 'Hệ thống Showroom' },
    { icon: faShoppingCart, label: 'Giỏ hàng' },
    { icon: faUser, label: 'Đăng nhập', link:'/Login' },
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
         {item.link ? (
           <a href={item.link} className="text-white text-decoration-none">
             <span>{item.label}</span>
           </a>
         ) : (
           <span>{item.label}</span>
         )}
       </div>
        ))}
    </div>
  );
};

export default Navigation;
