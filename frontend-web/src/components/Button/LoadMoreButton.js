import React from 'react';
import './LoadMoreButton.css'; 

const LoadMoreButton = ({ onClick, hasMore, loading }) => {
  if (!hasMore) {
    return <p className="no-more-results">No more results</p>;
  }

  return (
    <div className="load-more-container">
      {loading ? <p>Loading...</p> : <button onClick={onClick} className="load-more-btn">Load more</button>}
    </div>
  );
};

export default LoadMoreButton;
