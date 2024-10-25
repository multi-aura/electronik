import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ recentSearches, suggestions }) => {
  const navigate = useNavigate();

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="search-results-container">
      <div className="recent-searches">
        <h5>Recent</h5>
        <ul>
          {Array.isArray(recentSearches) && recentSearches.map((item, index) => (
            <li 
              key={index} 
              className="d-flex justify-content-between align-items-center"
              onClick={() => handleProfileClick(item.username)} 
              style={{ cursor: 'pointer' }} 
            >
              <span className="search-item">{item.fullname} ({item.username})</span>
              <button className="btn-remove">X</button>
            </li>
          ))}
        </ul>
        <div className="see-more">See more</div>
      </div>

      <hr />

      <div className="suggestions-for-you">
        <h5>Suggestions for you</h5>
        <ul>
          {Array.isArray(suggestions) && suggestions.map((item, index) => (
            <li 
              key={index} 
              className="d-flex justify-content-between align-items-center"
              onClick={() => handleProfileClick(item.username)} 
              style={{ cursor: 'pointer' }} 
            >
              <span className="search-item">{item.fullname} ({item.username})</span>
              <button className="btn-remove">X</button>
            </li>
          ))}
        </ul>
        <div className="see-more">See more</div>
      </div>
    </div>
  );
};

export default SearchResults;
