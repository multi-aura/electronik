// src/components/Admin/ProductManagementPage/Filter/SearchBox/SearchBox.js
import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import './SearchBox.css';

const SearchBox = ({ searchTerm, onSearchChange }) => {
    const [localSearch, setLocalSearch] = useState(searchTerm);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearchChange(localSearch);
        }, 3000); 

        return () => clearTimeout(delayDebounceFn);
    }, [localSearch, onSearchChange]);

    const handleInputChange = (e) => {
        setLocalSearch(e.target.value);
    };


    const handleSearch = () => {
        onSearchChange(localSearch);
    };
    return (
        <InputGroup className="search-box">
            <Form.Control
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                aria-label="Tìm kiếm"
                value={localSearch}
                onChange={handleInputChange}
                className="search-input"
            />
            <InputGroup.Text className="search-icon"  onClick={handleSearch}>
                <i className="fas fa-search"></i>
            </InputGroup.Text>
        </InputGroup>
    );
};

export default SearchBox;
