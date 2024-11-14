import React from 'react';
import './SimilarProducts.css'; 
import { Link } from 'react-router-dom';

const SimilarProducts = ({ similarProducts }) => {
    if (!Array.isArray(similarProducts) || similarProducts.length === 0) {
        return <p>Không có sản phẩm tương tự.</p>;
    }
    return (
        <div className="similar-products">
            <h2 className="similar-product-title">Sản phẩm tương tự</h2>
            {similarProducts.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id} className="similar-product-item-link">
                    <div className="similar-product-item">
                        <img
                            src={product.image || product.default_image}
                            alt={product.nameVi || product.nameEn}
                            className="similar-product-image"
                        />
                        <div className="similar-product-info">
                            <h3 className="similar-product-name">{product.nameVi || product.nameEn}</h3>
                            <div className="similar-product-specifications">
                                {product.specifications && product.specifications.length > 0 ? (
                                    product.specifications.slice(0, 3).map((spec) => (
                                        <span key={spec._id} className="similar-spec-badge">{spec.value}</span>
                                    ))
                                ) : (
                                    <span className="similar-spec-badge">Không có thông số kỹ thuật</span>
                                )}
                            </div>
                            <div className="similar-product-pricing">
                                {product.price && (
                                    <span className="similar-original-price">{product.price.toLocaleString()}đ</span>
                                )}
                                {product.sale && product.sale.discountPercentage > 0 && (
                                    <>
                                        <span className="similar-discounted-price">
                                            {(product.price * (1 - product.sale.discountPercentage / 100)).toLocaleString()}đ
                                        </span>
                                        <span className="similar-discount-percent">-{product.sale.discountPercentage}%</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
export default SimilarProducts;
