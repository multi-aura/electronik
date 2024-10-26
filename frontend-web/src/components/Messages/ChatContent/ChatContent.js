import React from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageBubble from '../MessageBubble/MessageBubble';
import ChatInput from '../ChatInput/ChatInput';
import './ChatContent.css';

const ChatContent = ({ chat, onSendMessage }) => {
  // Sắp xếp tin nhắn theo thời gian từ cũ đến mới
  const sortedMessages = [...chat.messages].sort((a, b) => new Date(a.time) - new Date(b.time));

  return (
    <div className="chat-content">
      <ChatHeader user={chat.user} />

      <div className="chat-messages">
        {sortedMessages.map((message, index) => (
          <MessageBubble 
            key={index} 
            message={message} 
            userAvatar={!message.isSentByUser ? chat.user.avatar : null}
          />
        ))}
      </div>

      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatContent;
