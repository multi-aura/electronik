// ProductStatus.js
import React from 'react';
import PropTypes from 'prop-types';
import './ProductStatus.css';

const ProductStatus = ({ status = 'Unknown' }) => {
    const statusClasses = {
        'Còn hàng': 'badge badge-success',
        'Hết hàng': 'badge badge-danger',
        'Sắp có hàng': 'badge badge-warning',
        'Unknown': 'badge badge-secondary',
    };

    return <span className={`status-badge ${statusClasses[status] || statusClasses['Unknown']}`}>{status}</span>;
};

ProductStatus.propTypes = {
    status: PropTypes.string,
};

export default ProductStatus;
