import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="main-content">
        <Header />
        <div className="content-area">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
