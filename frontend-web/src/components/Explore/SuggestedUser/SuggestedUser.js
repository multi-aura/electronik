import React, { useState } from 'react';
import { followUser } from '../../../services/RelationshipService'; 
import { Link } from 'react-router-dom';
import './SuggestedUser.css';

const SuggestedUser = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollowClick = async () => {
    try {
      await followUser(user.userID); 
      setIsFollowing(true);  
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };
  return (
    <li key={user.id} className="list-group-item suggested-user d-flex justify-content-between align-items-center">
      <Link to={`/profile/${user.username}`}>
      <div className="d-flex align-items-center">
        <img src={user.avatar || 'https://firebasestorage.googleapis.com/v0/b/multi-aura.appspot.com/o/Hihon%2F1728534046_9ea1c9841cadbef3e7bc.jpg?alt=media&token=3d221a08-d064-4ece-881a-32e2c5d273e1'} alt={user.username} className="rounded-circle me-3 user-avatar" />
        <div className="usersuggest-info">
          <p className="mb-0 full-name">{user.fullname}</p>
        </div>
      </div>
      </Link>
      <button 
        className="follow-btn" 
        onClick={handleFollowClick} 
        disabled={isFollowing}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </li>
  );
};

export default SuggestedUser;
