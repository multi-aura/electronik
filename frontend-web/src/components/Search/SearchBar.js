import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faUser } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 search-bars">
      <div className="input-group search-input-container">
        <div className="input-group-text search-icon-bg border-end-0" style={{ backgroundColor: '#333333',border:1}}>
            <FontAwesomeIcon icon={faSearch} className="text" style={{color:'white'}} />
        </div>
        <input
          type="text"
          className="form-control search-input-field border-start-0"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
    </div>
  );
};

export default SearchBar;
