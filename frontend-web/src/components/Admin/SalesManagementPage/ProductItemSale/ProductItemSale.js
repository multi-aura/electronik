import React, { useState, useCallback } from 'react';
import './ProductItemSale.css';

const ProductItemSale = ({ product, isSelected, onSelect, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState('');

    const handleQuantityChange = useCallback((e) => {
        const value = Number(e.target.value);
        const stock = product.variants[0]?.stock || 0;

        if (value < 1 || isNaN(value)) {
            setQuantityError('Số lượng phải lớn hơn 0');
        } else if (value > stock) {
            setQuantityError(`Số lượng không được lớn hơn số lượng tồn kho (${stock})`);
        } else {
            setQuantityError('');
            setQuantity(value); // Cập nhật state `quantity`
            if (onQuantityChange) {
                onQuantityChange(product._id, value); // Gọi hàm `onQuantityChange` để cập nhật số lượng từ ngoài
            }
        }
    }, [product, onQuantityChange]);

    return (
        <div className="sale-product-item">
            <div className="sale-product-info">
                <img src={product.default_image} alt={product.nameVi} className="sale-product-image" />
                <div className="sale-product-details">
                    <p className="sale-product-name">{product.nameVi}</p>
                    <p className="sale-product-color">{product.variants[0]?.sku || 'N/A'}</p>
                </div>
            </div>
            <div className="sale-product-stats">
                <span>{product.variants[0]?.stock || 'Out of stock'}</span>
                <span>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <input
                    type="number"
                    className="sale-product-quantity-input"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange} // Gọi trực tiếp hàm xử lý
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
