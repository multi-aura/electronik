import React from 'react';

const ProductImage = ({ imageUrl }) => {
    return (
        <div className="product-images" style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
            <img 
                src={imageUrl} 
                alt="Product Main" 
                className="img-fluid" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
        </div>
    );
};


export default ProductImage;
