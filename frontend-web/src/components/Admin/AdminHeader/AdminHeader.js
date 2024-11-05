// components/Admin/AdminHeader/AdminHeader.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './AdminHeader.css';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <header className="header d-flex align-items-center justify-content-between p-3 bg-light border-bottom">
            <div className="d-flex align-items-center">
                {!isSidebarOpen && (
                    <button className="btn toggle-sidebar-btn" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                )}
            </div>
            
            <div className="admin-info d-flex align-items-center ml-auto">
                <img
                    src="https://via.placeholder.com/40"  
                    alt="Admin Avatar"
                    className="admin-avatar rounded-circle"
                />
                <span className="admin-name ml-2">John Doe</span> 
            </div>
        </header>
    );
};

export default Header;
