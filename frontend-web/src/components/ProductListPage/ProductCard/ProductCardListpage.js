import React from "react";
import "./ProductCardListpage.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
 
  return (
    <div className="product-card-listpage">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="image-container-listpage">
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
        </div>

        <h3 className="product-name-listpage">{product.nameVi}</h3>

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

        {/* Hiển thị thông tin trả góp nếu cần */}
        <div className="installment-info">
          Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng
        </div>

        {/* Hiển thị đánh giá sao và nút yêu thích */}
        <div className="rating-favorite">
          <div className="stars">
            {'★'.repeat(5)}{'☆'.repeat(0)} {/* Giả định rằng sản phẩm nào cũng có 5 sao */}
          </div>
          <span className="favorite">
            Yêu thích <span className="heart">❤</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
