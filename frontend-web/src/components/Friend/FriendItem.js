import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUserFriends, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { unfollowUser } from '../../services/RelationshipService';
import { useNavigate } from 'react-router-dom'; 
import './FriendItem.css';

const FriendItem = ({ friend }) => {
  const [isFriend, setIsFriend] = useState(true); 
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggleModal = () => {
    setShowModal(!showModal); 
  };

  const handleUnfriend = async () => {
    setIsLoading(true);
    try {
      await unfollowUser(friend.userID); 
      setIsFriend(false); 
    } catch (error) {
      console.error('Failed to unfriend:', error);
      alert('Có lỗi xảy ra khi hủy kết bạn!');
    } finally {
      setIsLoading(false);
      setShowModal(false); 
    }
  };
  const handleNavigateToProfile = () => {
    navigate(`/profile/${friend.username}`);
  };
  return (
    <>
      {isFriend ? ( 
        <li className="list-group-item friend-item d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center" onClick={handleNavigateToProfile} style={{cursor: 'pointer'}}>
            <img
              src={friend.avatar || 'https://via.placeholder.com/50'}
              alt={friend.fullname}
              className="rounded-circle me-3"
              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
            <div>
              <h5 className="mb-0">{friend.fullname}</h5>
              <small className="text-black">{friend.username}</small>
            </div>  
          </div>
          <button className="btn btn-dark d-flex align-items-center" onClick={handleToggleModal}>
            Unfriend
            <FontAwesomeIcon 
              icon={faUserMinus}
              className="fa-user-minus ms-2"
            />
          </button>
        </li>
      ) : ( 
        <li className="list-group-item friend-item d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <img
              src={friend.avatar || 'https://via.placeholder.com/50'}
              alt={friend.fullname}
              className="rounded-circle me-3"
              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
            <div>
              <h5 className="mb-0">{friend.fullname}</h5>
              <small className="text-muted">Đã hủy kết bạn</small>
            </div>  
          </div>
        </li>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Bạn có chắc muốn hủy kết bạn với {friend.fullname} không?</p>
            <button 
              className="btn btn-danger me-2" 
              onClick={handleUnfriend}
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
            </button>
            <button className="btn btn-secondary" onClick={handleToggleModal}>Hủy</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendItem;
