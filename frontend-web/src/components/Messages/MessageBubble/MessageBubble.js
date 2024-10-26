import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ message, userAvatar }) => {
  return (
    <div className={`messchat-item ${message.isSentByUser ? 'sent' : 'received'}`}>
      {!message.isSentByUser && (
        <img src={userAvatar} alt="sender-avatar" className="avatar" />
      )}
      <div className="message-content">
        <p className="message-text">{message.text}</p>
        <span className="message-time">{message.time}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
