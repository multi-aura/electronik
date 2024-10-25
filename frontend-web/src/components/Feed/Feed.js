import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { getNewsPosts } from '../../services/searchService';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsPosts = async () => {
      try {
        const response = await getNewsPosts(); 
        setPosts(response.data); 
      } catch (error) {
        console.error('Lỗi khi lấy bài viết "News":', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchNewsPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="feed">
      {posts.map(post => (
        <Post key={post._id} post={post} /> 
      ))}
    </div>
  );
};

export default Feed;
