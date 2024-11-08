import React from 'react';
import { Button } from 'react-bootstrap';
import './ProductHeader.css'; // Import file CSS tùy chỉnh

const ProductHeader = () => {
    return (
        
        <div className="product-header mb-3 d-flex gap-2">
            
            <Button variant="outline-success" className="custom-button">
                <i className="fas fa-plus"></i> Thêm nhà cung cấp
            </Button>
            <Button variant="outline-success" className="custom-button">
                <i className="fas fa-plus"></i> Thêm danh mục
            </Button>
            <Button variant="outline-success" className="custom-button">
                <i className="fas fa-plus"></i> Thêm tình trạng
            </Button>
        </div>
    );
};

export default ProductHeader;
