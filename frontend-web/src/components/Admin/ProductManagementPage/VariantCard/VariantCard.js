import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './VariantCard.css';

const VariantCard = ({ variant, onShowDetails, onDelete }) => {
    return (
        <div className="card mb-5 shadow-sm variant-card" onClick={() => onShowDetails(variant)} style={{ cursor: 'pointer' }}>
            <div className="card-header">
                <p className="card-tittle"><strong></strong> {variant._id}</p> 
                <img
                    src={variant.images[0]?.url || 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png'}
                    alt={variant.color}
                    className="img-fluid variant-image"
                />
            </div>
       
            <div className="card-body">
                <p className="card-text"><strong>Serial:</strong> {variant.serial}</p> 
                <p className="card-text"><strong>Màu sắc:</strong> {variant.color}</p>
                <p className="card-text"><strong>SKU:</strong> {variant.sku}</p>
                <p className="card-text"><strong>Giá:</strong> {variant.price.toLocaleString()} đ</p>
            </div>
            <div className="card-footer d-flex justify-content-end">
                <button
                    className="btn btn-primary me-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        onShowDetails(variant);
                    }}
                >
                    <FaEdit /> Chỉnh sửa
                </button>
                <button
                    className="btn btn-danger"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(variant._id);
                    }}
                >
                    <FaTrash /> Xóa
                </button>
            </div>
        </div>
    );
};

export default VariantCard;
