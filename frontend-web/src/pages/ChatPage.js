import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Messages/MessSidebar/SidebarChat';
import ChatContent from '../components/Messages/ChatContent/ChatContent';
import Layout from '../layouts/Layout';
import '../assets/css/ChatPage.css';
import { getUserConversation } from "../services/chatservice";
function ChatPage() {
  const [userData, setUserData] = useState(null);

  const [messages, setMessages] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchUserConversation = async () => {
      try {
        if (userData) {
          const userConversations = await getUserConversation(userData.userID);
          setMessages(userConversations);
        }
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };
    if (userData) {
      fetchUserConversation();
    }
  }, [userData]);

  const handleSelectChat = (message) => {
    const selectedUserChat = {
      user: { name: message.name_conversation, avatar: message.users[0].avatar, status: 'Active recently' },
      message: message.chat
    };
    setCurrentChat(selectedUserChat);
  }
  return (
    <Layout userData={userData}>
      <div className="container-fluid chat-page">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 sidebar-wrapper">
            <Sidebar messages={messages} onSelectChat={handleSelectChat} />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 chat-content-wrapper">
            {currentChat ? (
              <ChatContent chat={currentChat} /> // Hiển thị cuộc trò chuyện hiện tại
            ) : (
              <div>Please select a chat to view</div> // Hiển thị khi chưa chọn cuộc trò chuyện
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ChatPage;
