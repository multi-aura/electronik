import React from "react";
import "./Suggestedproduct.css";
import { Link } from "react-router-dom";

const ProductCardSugges = ({ product }) => {
  return (
    <div className="product-card-Sugges">
      <Link to={`/product/${product._id}`} className="product-card__link">
        <div className="product-card__image-container">
          <img
            src={product.default_image}
            alt={product.nameVi}
            className="product-card__image"
          />
          {product.sale && product.sale.discountPercentage && (
            <div className="product-card__discount-badge">
              -{product.sale.discountPercentage}%
            </div>
          )}
        </div>

        <h3 className="product-card__name">{product.nameVi}</h3>

        <div className="product-card__specs">
          {product.specifications.map((spec, index) => (
            <span key={index} className="product-card__spec-item">
              {spec.value}
            </span>
          ))}
        </div>

        <div className="product-card__price-section">
          {product.sale && product.sale.discountPercentage ? (
            <>
              <p className="product-card__price--old">
                {product.price.toLocaleString()} VND
              </p>
              <p className="product-card__price--new">
                {(product.price * (1 - product.sale.discountPercentage / 100)).toLocaleString()} VND
              </p>
            </>
          ) : (
            <p className="product-card__price--new">{product.price.toLocaleString()} VND</p>
          )}
        </div>

       
        <div className="product-card__rating-favorite">
          <div className="product-card__stars">
            {'★'.repeat(5)}{'☆'.repeat(0)} {/* Giả định sản phẩm nào cũng có 5 sao */}
          </div>
          <span className="product-card__favorite">
            Yêu thích <span className="product-card__heart">❤</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardSugges;
