import React from 'react';
import './ProductStatus.css';

const ProductStatus = ({ status }) => {
    let statusLabel = '';
    let statusClass = '';

    switch (status) {
        case 1:
            statusLabel = 'Còn hàng'; // In Stock
            statusClass = 'status-in-stock';
            break;
        case 2:
            statusLabel = 'Hết hàng'; // Out of Stock
            statusClass = 'status-out-of-stock';
            break;
        case 3:
            statusLabel = 'Đang chờ'; // Pending
            statusClass = 'status-pending';
            break;
        case -1:
            statusLabel = 'Ngừng bán'; // Discontinued
            statusClass = 'status-discontinued';
            break;
        default:
            statusLabel = 'Không xác định'; // Unknown
            statusClass = 'status-unknown';
    }

    return (
        <span className={`product-status-label ${statusClass}`}>
            {statusLabel}
        </span>
    );
};

export default ProductStatus;
