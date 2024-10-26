import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';

function Header({ userData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('authToken'); 
    localStorage.removeItem('user');
    navigate('/'); 
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("Dropdown toggled:", !isDropdownOpen);
  };
  return (
    <div className="header p-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0 text-white">Feed</h4>
        {userData ? (  
          <div className="d-flex align-items-center position-relative">
            <span className="text-white me-3">{userData.fullname}</span>
            <img
              src={userData.avatar || 'https://firebasestorage.googleapis.com/v0/b/multi-aura.appspot.com/o/Hihon%2F393107bb-4c20-44d9-9022-9c900b6b3b71.jpg?alt=media&token=5e41e599-4b72-432b-beb9-6363b2e7b0ce'}
              alt="User Avatar"
              className="rounded-circle avatar"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            
            <div className={`dropdown-menu p-2 shadow position-absolute end-0 mt-4 rounded ${isDropdownOpen ? 'show' : ''}`}>
              <button className="btn btn-danger w-100 text-black" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <span className="text-white">Guest</span>  
        )}
      </div>
    </div>
  );
}
export default Header;
