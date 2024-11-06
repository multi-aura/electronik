// ItemsPerPageSelector.js
import React from 'react';
import { Form } from 'react-bootstrap';
import './ItemsPerPageSelector.css';

const ItemsPerPageSelector = ({ itemsPerPage, onItemsPerPageChange }) => {
    return (
        <div className="items-per-page-selector d-flex align-items-center gap-2">
            <label className="items-label mb-0">Hiển thị</label>
            <Form.Select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="form-select items-select"
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </Form.Select>
            <span className="items-label-text">sản phẩm</span>
        </div>
    );
};

export default ItemsPerPageSelector;
