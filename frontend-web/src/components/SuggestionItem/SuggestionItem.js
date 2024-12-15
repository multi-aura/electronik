import React from "react";
import "./SuggestionItem.css";
import { Link } from "react-router-dom";

const SuggestionItem = ({ product, onSelect }) => {
    return (
        <Link to={`/product/${product._id}`} className="product-link">

            <div className="suggestion-product-card" onClick={() => onSelect(product)}>
                <div className="suggestion-product-image-container">
                    <img
                        src={product.default_image}
                        alt={product.nameVi || "Sản phẩm"}
                        className="suggestion-product-image"
                    />
                    {product.discount && (
                        <div className="suggestion-discount-badge">{product.discount || "SALE"}</div>
                    )}
                </div>
                <div className="suggestion-product-info">
                    <div className="suggestion-product-name">
                        {product.nameVi || "Tên sản phẩm"}
                    </div>
                    <div className="suggestion-product-price">
                        {product.price
                            ? product.price.toLocaleString("vi-VN") + "₫"
                            : "Liên hệ"}
                    </div>
                    <div className="suggestion-product-tags">
                        {product.tags?.map((tag, index) => (
                            <span key={index} className="suggestion-product-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

            </div >
        </Link>
    );
};

export default SuggestionItem;
