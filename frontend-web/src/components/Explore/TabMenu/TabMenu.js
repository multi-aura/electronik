import React from 'react';
import './TabMenu.css';
const TabMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-menu">
      <span className={activeTab === 'For you' ? 'active' : ''} onClick={() => setActiveTab('For you')}>For you</span>
      <span className={activeTab === 'Trending' ? 'active' : ''} onClick={() => setActiveTab('Trending')}>Trending</span>
      <span className={activeTab === 'News' ? 'active' : ''} onClick={() => setActiveTab('News')}>News</span>
      <span className={activeTab === 'People' ? 'active' : ''} onClick={() => setActiveTab('People')}>People</span>
      <span className={activeTab === 'Posts' ? 'active' : ''} onClick={() => setActiveTab('Posts')}>Posts</span>
    </div>
  );
};

export default TabMenu;
