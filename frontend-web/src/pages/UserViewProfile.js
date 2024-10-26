import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../services/usersService';
import FriendList from '../components/Friend/FriendList';
import UserInfo from '../components/UserProfile/UserInfo/UserInfo';
import Layout from '../layouts/Layout';
import Cookies from 'js-cookie';
import '../assets/css/UserViewProfile.css';

const UserViewProfile = () => {
  const {username } = useParams();
  const [user, setUser] = useState(null);
  const [mutualFriends, setMutualFriends] = useState([]); 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDataFromService = await getUserProfile(username);
        setUser(userDataFromService.user);
        setMutualFriends(userDataFromService.mutualFriends || []);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserDetails();

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      const authToken = Cookies.get('authToken');
      if (authToken) {
      }
    }
  }, [username]);

  if (!user || !userData) {
    return (
      <div className="loading-container">
        <img src="https://firebasestorage.googleapis.com/v0/b/multi-aura.appspot.com/o/Hihon%2FLogo.png?alt=media&token=2e816278-cbfd-4c03-abb7-de203e364fab" className="loading-icon" alt="loading icon" />
      </div>
    );
  }

  return (
    <Layout userData={userData}>
      <div className="user-profile-page container">
        <div className="row">
          <div className="col-md-8">
            <FriendList friends={mutualFriends}/>
          </div>
          <div className="col-md-4">
            <UserInfo user={user} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserViewProfile;
