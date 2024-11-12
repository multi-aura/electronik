import React from 'react';

const ProductDescription = ({ description }) => {
    return (
        <div>
            <h2>{description.nameVi || 'Product Title'}</h2>
            {description.descriptionVi ? (
                <div dangerouslySetInnerHTML={{ __html: description.descriptionVi }}></div>
            ) : (
                <p>Không có mô tả chi tiết.</p>
            )}
        </div>
    );
};

export default ProductDescription;
