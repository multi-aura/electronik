import React from 'react';

const ProductSpecifications = ({ specifications }) => (
  <div className="product-specifications">
    <ul>
      <li>CPU: {specifications.cpu}</li>
      <li>RAM: {specifications.ram}</li>
      <li>Storage: {specifications.storage}</li>
      <li>Graphics: {specifications.graphics}</li>
    </ul>
  </div>
);

export default ProductSpecifications;
