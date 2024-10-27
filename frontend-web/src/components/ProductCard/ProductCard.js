import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import './ProductCard.css';

const ProductCard = ({ product, defaultImage }) => {
  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      <div className="gift-badge">
        <span className="badge bg-primary">
          <FontAwesomeIcon icon={faGift} /> {product.gift}
        </span>
      </div>
      <img
        src={product.imgSrc || defaultImage} 
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h6 className="card-title text-truncate">{product.name}</h6>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-danger">{product.price}</span>
          <span className="badge bg-danger text-white">{product.discount}</span>
        </div>
        <div className="mt-2">
          {product.specs.map((spec, i) => (
            <span key={i} className="badge bg-light text-dark me-1">{spec}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
