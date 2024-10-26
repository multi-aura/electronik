import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import './Layout.css';

function Layout({ children, userData }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header userData={userData} />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
