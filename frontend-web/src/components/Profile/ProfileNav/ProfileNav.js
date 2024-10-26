import React from 'react';
import './ProfileNav.css';

function ProfileNav({ activeTab, onTabChange }) {
  return (
    <div className="profile-nav__container">
      <ul className="nav profile-nav__tabs justify-content-center" style={{paddingBottom:"5px"}} >
        <li style={{ padding: "10px 0px" }} className={`profile-nav__item ${activeTab === 'posts' ? 'profile-nav__link--active' : ''}`} onClick={() => onTabChange('posts')}>
          <a className="profile-nav__link ">Posts</a>
        </li>
        <li style={{ padding: "10px 0px" }} className={`profile-nav__item ${activeTab === 'introduce' ? 'profile-nav__link--active' : ''}`} onClick={() => onTabChange('introduce')}>
          <a className="profile-nav__link">Introduce</a>
        </li>
        <li style={{ padding: "10px 0px" }} className={`profile-nav__item ${activeTab === 'friends' ? 'profile-nav__link--active' : ''}`} onClick={() => onTabChange('friends')}>
          <a className="profile-nav__link">Friends</a>
        </li>
        <li style={{ padding: "10px 0px" }} className={`profile-nav__item ${activeTab === 'images' ? 'profile-nav__link--active' : ''}`} onClick={() => onTabChange('images')}>
          <a className="profile-nav__link">Images</a>
        </li>
        <li style={{ padding: "10px 0px" }} className={`profile-nav__item ${activeTab === 'more' ? 'profile-nav__link--active' : ''}`} onClick={() => onTabChange('more')}>
          <a className="profile-nav__link">More...</a>
        </li>
      </ul>
    </div>
  );
}

export default ProfileNav;
