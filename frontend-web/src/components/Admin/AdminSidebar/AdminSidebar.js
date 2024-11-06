// components/Admin/AdminSidebar/AdminSidebar.js
import React from 'react';
import Logo from '../../Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCube, faFileAlt, faShoppingCart, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './AdminSidebar.css';

const AdminSidebar = ({ toggleSidebar, isOpen }) => {
    return (
        <div className={`admin-sidebar ${isOpen ? 'open' : 'collapsed'} d-flex flex-column`}>
            {isOpen && (
                  <div className="sidebar-header p-3">
                  <Logo /> 
              </div>
            )}
            <nav className="nav flex-column flex-grow-1">
                <a className="nav-link d-flex align-items-center text-white" href="/admin">
                    <div className="icon"><FontAwesomeIcon icon={faHome} /></div>
                    <span>dashboard</span>
                </a>
                <a className="nav-link d-flex align-items-center text-white" href="/admin/Emhun">
                    <div className="icon"><FontAwesomeIcon icon={faFileAlt} /></div>
                    <span>EMHUN</span>
                </a>
                <a className="nav-link d-flex align-items-center text-white" href="/admin/ProductManagement">
                    <div className="icon"><FontAwesomeIcon icon={faCube} /></div>
                    <span>Products</span>
                </a>
                <a className="nav-link d-flex align-items-center text-white" href="/orders">
                    <div className="icon"><FontAwesomeIcon icon={faFileAlt} /></div>
                    <span>Orders</span>
                </a>
                <a className="nav-link d-flex align-items-center text-white" href="/sales">
                    <div className="icon"><FontAwesomeIcon icon={faFileAlt} /></div>
                    <span>Sale</span>
                </a>
                <a className="nav-link d-flex align-items-center text-white" href="/settings">
                    <div className="icon"><FontAwesomeIcon icon={faFileAlt} /></div>
                    <span>Setting</span>
                </a>
            </nav>
            {isOpen && (
                <div className="sidebar-footer p-3">
                    <button className="btn btn-link text-white" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faChevronLeft} /> 
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminSidebar;
