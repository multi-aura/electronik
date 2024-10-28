// src/components/productDetail/productImage/ProductImage.js
import React from 'react';

const ProductImage = ({ imageUrl, altText }) => (
  <div className="product-image">
    <img src={imageUrl} alt={altText} className="img-fluid" style={{ maxHeight: '500px' }} />
  </div>
);

export default ProductImage;
pp