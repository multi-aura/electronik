// ProductCard.js
import React from "react";
import "./ProductCardListpage.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.discount && (
          <div className="discount-badge">-{product.discount}%</div>
        )}
      </div>

      <h3 className="product-name">{product.name}</h3>

      <div className="product-specs">
        {product.specs.map((spec, index) => (
          <span key={index} className="spec-item">{spec}</span>
        ))}
      </div>

      <div className="price-section">
        {product.oldPrice && (
          <p className="old-price">{product.oldPrice} VND</p>
        )}
        <p className="new-price">{product.newPrice} VND</p>
      </div>

      {/* Thêm thông tin trả góp */}
      <div className="installment-info">
        Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng
      </div>

      {/* Hiển thị đánh giá sao và nút yêu thích */}
      <div className="rating-favorite">
        <div className="stars">
          {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
        </div>
        <span className="favorite">
          Yêu thích <span className="heart">❤</span>
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
