import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import './ProductCard.css';
import { Link } from "react-router-dom";

const ProductCard = ({ product, defaultImage }) => {
  console.log(product);
  return (
    <Link to={`/product/${product._id}`} className="product-link">
      <div className="card product-card h-100 border-0 shadow-sm">
        <div className="gift-badge">
          <span className="badge bg-primary">
            <FontAwesomeIcon icon={faGift} /> {product.gift}
          </span>
        </div>
        <img
          src={product.default_image}
          alt={product.nameVi}
          className="product-image-listpage"
        />
        {product.sale && product.sale.discountPercentage && (
          <div className="discount-badge">
            -{product.sale.discountPercentage}%
          </div>
        )}
        <div className="product-specs">
          {product.specifications.map((spec, index) => (
            <span key={index} className="spec-item">
              {spec.value}
            </span>
          ))}
        </div>
        <div className="price-section">
          {product.sale && product.sale.discountPercentage ? (
            <>
              <p className="old-price">
                {product.price.toLocaleString()} VND
              </p>
              <p className="new-price">
                {(product.price * (1 - product.sale.discountPercentage / 100)).toLocaleString()} VND
              </p>
            </>
          ) : (
            <p className="new-price">{product.price.toLocaleString()} VND</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
