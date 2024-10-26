import React, { useEffect, useState } from 'react';
import { getForYouPosts } from '../../../services/searchService'; 
import Post from '../../Post/Post'; 

const ForYou = () => {
  const [forYouPosts, setForYouPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForYouPosts = async () => {
      try {
        const response = await getForYouPosts(); 
        setForYouPosts(response.data); 
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu For You:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchForYouPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      {forYouPosts.map((post) => (
        <Post key={post._id} post={post} /> 
      ))}
    </div>
  );
};

export default ForYou;
