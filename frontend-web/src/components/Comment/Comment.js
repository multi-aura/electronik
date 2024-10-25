import React from 'react';
import './Comment.css';

function Comment({ comment }) {
  return (
    <div className="comment d-flex mb-2">
      <img src={comment.avatar} alt="Avatar" className="avatar-comment rounded-circle" />
      <div className="ml-2">
        <p className="mb-1">
          <strong>{comment.username}</strong>
        </p>
        <p className="comment-content mb-0"> {comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
