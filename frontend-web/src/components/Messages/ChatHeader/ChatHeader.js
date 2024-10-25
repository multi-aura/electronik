import React from 'react';
import './ChatHeader.css';

const ChatHeader = ({ user }) => {
  return (
    <div className="chat-header d-flex align-items-center">
      <img src={user.avatar} alt="avatar" className="avatar me-2" />
      <div className='headerchat-info'>
        <h5 className="chat-name">{user.name}</h5>
        <p className="chat-status">{user.status}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
