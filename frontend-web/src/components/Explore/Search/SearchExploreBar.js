import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchExploreBar.css';
import SearchResults from './SearchResults';
import { searchPeople, getPeopleSuggestions } from '../../../services/searchService';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const result = await getPeopleSuggestions(); 
        setSuggestions(result.data);  // Access data from the API response
      } catch (error) {
        console.error('Lỗi khi lấy gợi ý:', error);
      }
    };

    fetchSuggestions();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        try {
          const results = await searchPeople(searchTerm);
          setSearchResults(results.data);  // Access data from the API response
        } catch (error) {
          console.error('Lỗi khi tìm kiếm:', error);
        }
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  return (
    <div className="search-bar-container">
        <div className="input-group search-input-container">
            <div className="input-group-text search-icon-bg border-end-0" style={{ backgroundColor: '#333333',border:1}}>
                <FontAwesomeIcon icon={faSearch} className="text" style={{color:'white'}} />
            </div>
            <input
                type="text"
                className="form-control search-input-field border-start-0"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
        
      
      {showResults && (
        <SearchResults recentSearches={searchResults} suggestions={suggestions} />
      )}
    </div>
  );
};

export default SearchBar;
