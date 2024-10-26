import React, { useEffect, useState } from 'react';
import { getFriends } from '../../../services/RelationshipService';
import FriendList from '../../Friend/FriendList';
import SearchBar from '../../Search/SearchBar';
function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsList = await getFriends(); 
        setFriends(friendsList); 
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bạn bè:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, []);
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const filteredFriends = friends && friends.length > 0
  ? friends.filter((friend) =>
      friend.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  return (
    <div>
      
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
    
      <FriendList friends={filteredFriends} isLoading={isLoading}/>
    </div>
  );
}

export default FriendsList;
