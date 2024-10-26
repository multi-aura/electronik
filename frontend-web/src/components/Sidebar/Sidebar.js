import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faThLarge, faCommentDots, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/Home');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    document.querySelector('.main-content').style.marginLeft = isCollapsed ? '250px' : '100px';
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faThLarge} />
      </div>
      <h2 className="text-center ">Multi Aura</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a
            className={`tab-link ${activeTab === '/Home' ? 'active' : ''}`}
            href="/Home"
            onClick={() => handleTabClick('/Home')}
          >
            <FontAwesomeIcon icon={faHome} className="icon" />
            {!isCollapsed && <span>Home</span>}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`tab-link ${activeTab === '/explore' ? 'active' : ''}`}
            href="/explore"
            onClick={() => handleTabClick('/explore')}
          >
            <FontAwesomeIcon icon={faThLarge} className="icon" />
            {!isCollapsed && <span>Explore</span>}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`tab-link ${activeTab === '/chat' ? 'active' : ''}`}
            href="/chat"
            onClick={() => handleTabClick('/chat')}
          >
            <FontAwesomeIcon icon={faCommentDots} className="icon" />
            {!isCollapsed && <span>Messages</span>}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`tab-link ${activeTab === '/notifications' ? 'active' : ''}`}
            href="#notifications"
            onClick={() => handleTabClick('/notifications')}
          >
            <FontAwesomeIcon icon={faBell} className="icon" />
            {!isCollapsed && <span>Notifications</span>}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`tab-link ${activeTab === '/profile' ? 'active' : ''}`}
            href="/profile"
            onClick={() => handleTabClick('/profile')}
          >
            <FontAwesomeIcon icon={faUser} className="icon" />
            {!isCollapsed && <span>Profile</span>}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
