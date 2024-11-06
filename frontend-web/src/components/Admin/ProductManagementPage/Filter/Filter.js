// Filter.js
import React, { useState } from 'react';
import ItemsPerPageSelector from './ItemsPerPageSelector/ItemsPerPageSelector';
import CategorySelector from './CategorySelector/CategorySelector';
import SearchBox from './SearchBox/SearchBox';
import './Filter.css';

const Filter = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="filter-container">
            <div className="filter-controls">
                <ItemsPerPageSelector itemsPerPage={itemsPerPage} onItemsPerPageChange={setItemsPerPage} />
                <CategorySelector selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
            </div>
            <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
    );
};

export default Filter;
