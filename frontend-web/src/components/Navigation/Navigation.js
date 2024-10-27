import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faShoppingCart, faUser, faSignOutAlt,faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './Navigation.css'

const Navigation = () => {
  const navigate = useNavigate();

  const [dataUser, setdataUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setdataUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = async () => {
    await logout();
    setdataUser(null);
    navigate('/login');
  }
  const navItems = [
    { icon: faPhone, label: 'Hotline 1900.5301' },
    { icon: faMapMarkerAlt, label: 'Hệ thống Showroom' },
    { icon: faShoppingCart, label: 'Giỏ hàng' },
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
            <a href={item.link} className="text-white text-decoration-none" >
              <span>{item.label}</span>
            </a>

          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
      {dataUser ? (
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" className="text-white text-decoration-none d-flex align-items-center" id="dropdown-user">
            <img
              src={dataUser.data.avatar || 'path-to-default-avatar.png'}
              className="rounded-circle me-2 avatar_login"
       
            />
            {dataUser.data.username}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout} className="no-underline">
              <FontAwesomeIcon icon={faUserCircle} className="me-2" />
              Thông tin cá nhân
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} className="no-underline">
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Đăng xuất
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div className="d-flex align-items-center text-white me-4" style={{ fontSize: '14px' }}>
          <FontAwesomeIcon icon={faUser} className="me-2" />
          <a href="/login" className="text-white text-decoration-none">
            Đăng nhập
          </a>
        </div>

      )}


    </div>
  );
};

export default Navigation;
