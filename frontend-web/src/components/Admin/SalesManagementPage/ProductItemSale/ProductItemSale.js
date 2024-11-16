import React, { useState } from 'react';
import './ProductItemSale.css';

const ProductItemSale = ({ product, isSelected, onSelect, onQuantityChange }) => {
    const [quantityError, setQuantityError] = useState('');

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value < 1 || isNaN(value)) {
            setQuantityError('Số lượng phải lớn hơn 0');
        } else {
            setQuantityError('');
            onQuantityChange(product.id, value);
        }
    };

    return (
        <div className="sale-product-item">
            <div className="sale-product-info">
                <img src={product.image} alt={product.name} className="sale-product-image" />
                <div className="sale-product-details">
                    <p className="sale-product-name">{product.name}</p>
                    <p className="sale-product-color">{product.color}</p>
                </div>
            </div>
            <div className="sale-product-stats">
                <span>{product.quantity}</span>
                <span>${product.price}</span>
                <input
                    type="number"
                    className="sale-product-quantity-input"
                    min="1"
                    placeholder="Nhập số lượng"
                    onChange={handleQuantityChange}
                />
                {quantityError && <p className="error-text">{quantityError}</p>}
                <input
                    type="checkbox"
                    className="sale-product-checkbox"
                    checked={isSelected}
                    onChange={onSelect}
                />
            </div>
        </div>
    );
};

export default ProductItemSale;
