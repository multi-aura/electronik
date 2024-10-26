import React, { useEffect, useState } from 'react';
import { getPosts } from '../../../services/searchService'; 
import Post from '../../Post/Post'; 

const ForYou = () => {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(); 
        setPosts(response.data); 
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu For You:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      {Posts.map((post) => (
        <Post key={post._id} post={post} /> 
      ))}
    </div>
  );
};

export default ForYou;
