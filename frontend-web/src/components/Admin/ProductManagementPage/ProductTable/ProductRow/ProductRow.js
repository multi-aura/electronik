// ProductRow.js
import React from 'react';
import ProductStatus from './ProductStatus/ProductStatus';
import ActionButtons from './ActionButtons/ActionButtons';
import './ProductRow.css';

const ProductRow = ({ product }) => {
    const {
        _id,
        nameVi,
        default_image,
        price,
        variants,
        category,
        status
    } = product;

    // Get stock quantity from the first variant as an example
    const quantity = variants && variants.length > 0 ? variants[0].stock : 'N/A';

    return (
        <tr className="product-row">
            <td><input type="checkbox" className="product-checkbox" /></td>
            <td className="product-code">{_id}</td> {/* Using _id as product code */}
            <td className="product-name">{nameVi}</td>
            <td className="product-image">
                <img src={default_image} alt={nameVi} className="product-thumbnail" />
            </td>
            <td className="product-quantity">{quantity}</td>
            <td className="product-status">
                <ProductStatus status={status} />
            </td>
            <td className="product-price">{price.toLocaleString()} đ</td>
            <td className="product-category">{category ? category.nameVi : 'N/A'}</td> {/* Ensure you access a specific property */}
            <td className="product-actions">
                <ActionButtons productId={_id} />
            </td>
        </tr>
    );
};

export default ProductRow;
