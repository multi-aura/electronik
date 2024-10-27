// src/components/SearchBar/SearchBar.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  return (
    <div className="search-bar-container">
      <div className="input-group">
        <input
          type="text"
          className="form-control search-input-field"
          placeholder="Bạn cần tìm gì?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <div className="input-group-text ssearch-icon-bg">
            <FontAwesomeIcon icon={faSearch} />
          </div>

      </div>
    </div>
  );
};

export default SearchBar;
