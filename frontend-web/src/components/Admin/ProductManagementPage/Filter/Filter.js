// Filter.js
import React, { useMemo,useEffect } from 'react';
import ItemsPerPageSelector from './ItemsPerPageSelector/ItemsPerPageSelector';
import CategorySelector from './CategorySelector/CategorySelector';
import SearchBox from './SearchBox/SearchBox';
import debounce from 'lodash/debounce';
import './Filter.css';

const Filter = ({
    searchTerm,
    onSearchChange}) => {
    return (
        <div className="filter-container">
        
            <SearchBox searchTerm={searchTerm} onSearchChange={onSearchChange}  />
        </div>
    );
};

export default Filter;
