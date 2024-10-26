import React, { useState } from 'react';

import MessageItem from '../MessageItem/MessageItem';
import './SidebarChat.css';


function SidebarChat({ messages = [], onSelectChat }) {  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // All, Group, Single
  const [isSearchVisible, setSearchVisible] = useState(false); // State để kiểm soát hiển thị input

  const filteredMessages = (messages || [])
    .filter(message => 
      message.name_conversation && 
      message.name_conversation.toLowerCase().includes(searchTerm.toLowerCase())) 
    .filter(message => {
      if (filterType === 'Group') {
        return message.conversation_type === 'Group'; 
      } else if (filterType === 'Single') {
        return message.conversation_type === 'Private'; 
      }
      return true; 
    });

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
      <h5 style={{ color: "white" }}>Messages</h5>



        {isSearchVisible && (
          <input 
            type="text" 
            className="form-control search-input"
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            onBlur={() => setSearchVisible(false)} // Ẩn lại khi mất focus
          />
        )}

        <select 
          className="form-select" 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Group">Group</option>
          <option value="Single">Single</option>
        </select>
      </div>

      <ul className="message-list">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message, index) => (
            <MessageItem 
              key={index} 
              message={message} 
              onClick={() => onSelectChat(message)} 
            />
          ))
        ) : (
          <li className="no-messages">No messages found</li>
        )}
      </ul>
    </div>
  );
}

export default SidebarChat;
