import React, { useEffect, useState } from 'react';
import { getTrendingPosts } from '../../../services/searchService'; 
import Post from '../../Post/Post'; 

const ForYou = () => {
  const [trendingPosts, settrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await getTrendingPosts(); 
        settrendingPosts(response.data); 
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu Trending:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      {trendingPosts.map((post) => (
        <Post key={post._id} post={post} /> 
      ))}
    </div>
  );
};

export default ForYou;
