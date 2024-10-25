import React, { useState } from 'react';
import Comment from '../Comment/Comment';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentDots, faShare, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'; // Import icon bookmark

function Post({ post }) {
  const [showAllImages, setShowAllImages] = useState(false);

  const handleImageClick = () => {
    setShowAllImages(!showAllImages); // Toggle việc hiển thị toàn bộ ảnh
  };
  const renderImages = () => {
    const imageCount = post.images.length;

    if (imageCount === 1) {
      return <img src={post.images[0].url} alt="Post" className="img-post img-fluid rounded mb-4" />;
    }

    if (imageCount === 2) {
      return (
        <div className="image-row">
          {post.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Post ${index}`} className="img-fluid rounded" style={{ width: '48%', marginRight: index === 0 ? '4%' : '0' }} />
          ))}
        </div>
      );
    }

    if (imageCount > 2) {
      return (
        <div className="image-row">
          <img src={post.images[0].url} alt="Post 1" className="img-fluid rounded" style={{ width: '48%', marginRight: '4%' }} />
          <div className="img-overlay-container" onClick={handleImageClick} style={{ width: '48%', position: 'relative' }}>
            <img src={post.images[1].url} alt="Post 2" className="img-fluid rounded" />
            {imageCount > 2 && (
              <div className="img-overlay">
                <span>+{imageCount - 2}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="post p-3 mb-4 rounded shadow-sm text-white">
      <div className="d-flex align-items-center mb-2">
        <img src={post.avatar || 'https://firebasestorage.googleapis.com/v0/b/multi-aura.appspot.com/o/Hihon%2F393107bb-4c20-44d9-9022-9c900b6b3b71.jpg?alt=media&token=5e41e599-4b72-432b-beb9-6363b2e7b0ce'} alt="Avatar" className="avatar rounded-circle" />
        <div className="ml-3">
          <h5 className="text-fullname">{post.createdBy.fullname}</h5>
          <p className="text-time">{new Date(post.createdAt).toLocaleString()}</p> 
        </div>
      </div>
      <p className='content-post'>{post.description}</p>
      {renderImages()} {/* Hiển thị các ảnh theo logic phía trên */}

      {showAllImages && (
        <div className="image-grid">
          {post.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Post ${index}`} className="img-fluid rounded mb-4" />
          ))}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <button className="btn btn-link text-white mr-3">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className="btn btn-link text-white mr-3">
            <FontAwesomeIcon icon={faCommentDots} /> 
          </button>
          <button className="btn btn-link text-white mr-3">
            <FontAwesomeIcon icon={faShare} /> 
          </button>
        </div>
        <button className="btn btn-link text-white">
          <FontAwesomeIcon icon={faBookmark} /> 
        </button>
      </div>
      <div className="comments mt-3">
      {(post.comments || []).map((comment, index) => ( 
          <Comment key={index} comment={comment} />
        ))}
      </div>
      <div className="d-flex mt-3">
        <input type="text" className="form-control comment-text" placeholder="Add a comment..." />
        <button className="btn btn-primary ml-2">Post</button>
      </div>
    </div>
  );
}

export default Post;
