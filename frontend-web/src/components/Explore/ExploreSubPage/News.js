import React, { useEffect, useState } from 'react';
import { getNewsPosts } from '../../../services/searchService'; 
import Post from '../../Post/Post'; 

const ForYou = () => {
  const [newPosts, setnewPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchnewPosts = async () => {
      try {
        const response = await getNewsPosts(); 
        setnewPosts(response.data); 
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu For You:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchnewPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      {newPosts.map((post) => (
        <Post key={post._id} post={post} /> 
      ))}
    </div>
  );
};

export default ForYou;
