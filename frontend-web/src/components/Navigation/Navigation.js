import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTags, faShoppingCart, faUser, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import Cart from '../../pages/Cart';
import { Link } from 'react-router-dom';
import { getTotalQuantity } from '../../services/cartService';
const Navigation = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity());
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
  useEffect(() => {
    const updateTotalQuantity = () => setTotalQuantity(getTotalQuantity());
    window.addEventListener('cartUpdated', updateTotalQuantity);

    return () => {
      window.removeEventListener('cartUpdated', updateTotalQuantity);
    };
  }, []);
  return (
    <div className="navigation-container d-flex align-items-center">
      <div className="d-flex align-items-center text-white me-4" style={{ fontSize: '14px' }}>
        <FontAwesomeIcon icon={faPhone} className="me-2" />
        <span>Hotline 1900.5301</span>
      </div>
    
      <div className="cart-icon-wrapper d-flex align-items-center position-relative text-white me-4" style={{ fontSize: '14px' }}>
        <div className="d-flex align-items-center" onClick={toggleCart} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
          <span>Giỏ hàng</span>
        </div>
        {totalQuantity > 0 && (
          <span
            className="badge-count position-absolute rounded-circle"
          >
            {totalQuantity}
          </span>
        )}
      </div>


      {isCartOpen && <Cart onClose={toggleCart} />}
      {dataUser ? (
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" className="text-white text-decoration-none d-flex align-items-center" id="dropdown-user">
            <span>{dataUser?.data?.username}</span>
            <img src={dataUser?.data?.avatar || 'path-to-default-avatar.png'} alt="Avatar" className="rounded-circle me-2 avatar_login" />
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