import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTags, faShoppingCart, faUser, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import Cart from '../../pages/Cart';  
import { Link } from 'react-router-dom';
const Navigation = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setDataUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setDataUser(null);
    navigate('/login');
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="navigation-container d-flex align-items-center">
      <div className="d-flex align-items-center text-white me-4" style={{ fontSize: '14px' }}>
        <FontAwesomeIcon icon={faPhone} className="me-2" />
        <span>Hotline 1900.5301</span>
      </div>
      <div className="d-flex align-items-center text-white me-4" style={{ fontSize: '14px' }}>
        <FontAwesomeIcon icon={faTags} className="me-2" />
        <Link to={`/product`} className='text-white text-decoration-none'>
          <span>Sản phẩm</span>

        </Link>
      </div>
      <div className="d-flex align-items-center text-white me-4" style={{ fontSize: '14px' }}>
        <FontAwesomeIcon icon={faShoppingCart} className="me-2" onClick={toggleCart} style={{ cursor: 'pointer' }} />
        <span onClick={toggleCart} style={{ cursor: 'pointer' }}>Giỏ hàng</span>
      </div>

      {isCartOpen && <Cart onClose={toggleCart} />}

      {dataUser ? (
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" className="text-white text-decoration-none d-flex align-items-center" id="dropdown-user">
            <span>{dataUser.data.username}</span>
            <img src={dataUser.data.avatar || 'path-to-default-avatar.png'} alt="Avatar" className="rounded-circle me-2 avatar_login" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="no-underline">
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
          <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Đăng nhập</span>
        </div>
      )}
    </div>
  );
};

export default Navigation;