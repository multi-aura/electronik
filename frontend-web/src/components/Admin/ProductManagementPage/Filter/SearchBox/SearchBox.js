// SearchBox.js
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import './SearchBox.css';

const SearchBox = ({ searchTerm, onSearchChange }) => {
    return (
        <InputGroup className="search-box">
            <Form.Control
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                aria-label="Tìm kiếm"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
            <InputGroup.Text className="search-icon">
                <i className="fas fa-search"></i>
            </InputGroup.Text>
        </InputGroup>
    );
};

export default SearchBox;
