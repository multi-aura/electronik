import React, { useEffect, useState } from 'react';
import './UserInfo.css';
import { followUser, unfollowUser, checkRelationshipStatus, blockUser } from '../../../services/RelationshipService';

const UserInfo = ({ user }) => {
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  useEffect(() => {
    const fetchRelationshipStatus = async () => {
      try {
        const status = await checkRelationshipStatus(user.userID);
        setRelationshipStatus(status.status);
        setIsBlocked(status.isBlocked || false);
        console.log(status);
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái quan hệ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelationshipStatus();
  }, [user.userID]);

  const handleFollowClick = async () => {
    try {
      await followUser(user.userID);
      setRelationshipStatus('isFollowedBy');
    } catch (error) {
      console.error('Lỗi khi theo dõi:', error);
    }
  };

  const handleUnfollowClick = async () => {
    try {
      await unfollowUser(user.userID);
      setRelationshipStatus('');
    } catch (error) {
      console.error('Lỗi khi hủy theo dõi:', error);
    }
  };
  const handleBlockClick = async () => {
    try {
      await blockUser(user.userID); 
      setIsBlocked(true); 
    } catch (error) {
      console.error('Lỗi khi block người dùng:', error);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  const renderActionButton = () => {
    switch (relationshipStatus) {
      case 'Friend':
        return <button className="btn btn-success" disabled>Friend</button>;
      case 'Following':
        return <button className="btn btn-info" onClick={handleFollowClick}>FollowBack</button>;
      case 'Followed':
        return <button className="btn btn-danger" onClick={handleUnfollowClick}>Unfollow</button>; 
      default:
        return <button className="btn btn-secondary" onClick={handleFollowClick}>Follow</button>;
    }
  };

  return (
    <div className="user-info-container">
      <img src={user.avatar || 'https://firebasestorage.googleapis.com/v0/b/multi-aura.appspot.com/o/Hihon%2F1728534046_9ea1c9841cadbef3e7bc.jpg?alt=media&token=3d221a08-d064-4ece-881a-32e2c5d273e1'} alt={user.fullname} className="profile-avatar" />
      <h4>{user.fullname}</h4>
      <p>@{user.username}</p>
      <p>{user.posts} posts • {user.followers} followers • {user.following} following</p>
      <p>{user.bio}</p>
      {renderActionButton()}  
      <button className="btn btn-secondary">Message</button>
      <button className="btn btn-danger" onClick={handleBlockClick} disabled={isBlocked}>
        {isBlocked ? 'Blocked' : 'Block'}
      </button>
    </div>
  );
};

export default UserInfo;
