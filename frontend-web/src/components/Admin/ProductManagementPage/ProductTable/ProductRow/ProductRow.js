// ProductRow.js
import React from 'react';
import ProductStatus from './ProductStatus/ProductStatus';
import ActionButtons from './ActionButtons/ActionButtons';
import './ProductRow.css';

const ProductRow = ({ product }) => {
    return (
        <tr className="product-row">
            <td><input type="checkbox" className="product-checkbox" /></td>
            <td className="product-code">{product.productCode}</td>
            <td className="product-name">{product.productName}</td>
            <td className="product-image">
                <img src={product.imageUrl} alt={product.productName} className="product-thumbnail" />
            </td>
            <td className="product-quantity">{product.quantity}</td>
            <td className="product-status">
                <ProductStatus status={product.status} />
            </td>
            <td className="product-price">{product.price}</td>
            <td className="product-category">{product.category}</td>
            <td className="product-actions">
                <ActionButtons />
            </td>
        </tr>
    );
};

export default ProductRow;
