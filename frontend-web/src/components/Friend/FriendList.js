import React from 'react';
import FriendItem from './FriendItem';
import './FriendList.css'
const FriendList = ({ friends , isLoading }) => {
  if (isLoading) {
    return <p>Loading friends...</p>; 
  }
  if (!friends || friends.length === 0) {
    return <p>No friends found. Try searching or adding new friends!</p>;
  }
 
  return (
    <ul className="list-group friend-list-container">
      {friends.map((friend) => (
        <FriendItem key={friend.userID} friend={friend} />
      ))}
    </ul>
  );
};

export default FriendList;
