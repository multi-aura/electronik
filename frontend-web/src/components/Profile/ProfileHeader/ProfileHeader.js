import React from 'react';
import './ProfileHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
function ProfileHeader({ userData, friends, followers, followings }) {
    if (!userData || !userData.avatar) {
        console.log(userData);
        return <p>Loading profile...</p>;  
      }
  return (
    <div className="row align-items-center my-4">
      <div className="col-md-4 text-center">
        <img src={userData.avatar} alt="Avatar" className="rounded-circle profile-avatar" />
      </div>
      <div className="col-md-8 profile-info">
        <h2>{userData.fullname}</h2>
        <p>2 posts • {friends.length} friends • 30 likes</p>
        <p>{followings.length} followings •  {followers.length} followers</p>
        <div className="friend-avatars d-flex">
           {friends.slice(0, 3).map(friend => (
            <img
              key={friend.userID}
              src={friend.avatar}
              alt={friend.fullname}
              className="small-avatar rounded-circle me-2"
              style={{ width: '40px', height: '40px' }}
            />
          ))}
          {friends.length > 3 && <span>+{friends.length - 3} more</span>}
        </div>
        <button className="btn btn-outline-black d-flex align-items-center">
          <FontAwesomeIcon icon={faCog} className="me-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
