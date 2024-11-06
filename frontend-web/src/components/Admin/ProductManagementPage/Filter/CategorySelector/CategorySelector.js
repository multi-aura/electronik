// CategorySelector.js
import React from 'react';
import { Form } from 'react-bootstrap';
import './CategorySelector.css';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="category-selector d-flex align-items-center gap-2">
            <label className="category-label mb-0">Danh mục</label>
            <Form.Select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="form-select category-select"
            >
                <option value="">Tất cả</option>
                <option value="Bàn ăn">Bàn ăn</option>
                <option value="Ghế">Ghế</option>
                {/* Thêm các danh mục khác nếu cần */}
            </Form.Select>
        </div>
    );
};

export default CategorySelector;
