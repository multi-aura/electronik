import React, { useEffect, useState } from 'react';
import '../SimilarProducts/SimilarProducts.css';
import { fetchProductRecommend, fetchProductBySerial } from '../../../services/productService';
import { Link } from 'react-router-dom';

const SuggestedProducts = ({ serial }) => {
    const [recommendedSerials, setRecommendedSerials] = useState([]);
    const [productSerials, setProductSerials] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                if (serial) {
                    const recommendedSerials = await fetchProductRecommend(serial);
                    setRecommendedSerials(recommendedSerials || []);
                }
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm đề xuất:", error);
            }
        };
        fetchRecommendations();
    }, [serial]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (recommendedSerials && recommendedSerials.length > 0) {
                    const products = await fetchProductBySerial(recommendedSerials);
                    setProductSerials(products.data || []);
                }
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm từ serial:", error);
            }
        };
        fetchProducts();
    }, [recommendedSerials]);

    // Hide the component if there are no suggested products
    if (productSerials.length === 0) {
        return null;
    }

    return (
        <div className="similar-products">
            <h2 className="similar-product-title">Sản phẩm đề xuất</h2>
            {productSerials.map((product) => {
                const price = product.price || 0;
                const discount = product.sale?.discountPercentage || 0;
                const discountPrice = price * (1 - discount / 100);

                return (
                    <Link to={`/product/${product._id}`} key={product._id} className="similar-product-item-link">
                        <div className="similar-product-item">
                            <img
                                src={product.default_image}
                                alt={product.nameVi || product.nameEn}
                                className="similar-product-image"
                            />

                            <div className="similar-product-info">
                                <h3 className="similar-product-name">{product.nameVi || product.nameEn}</h3>

                                <div className="similar-product-specifications">
                                    {product.specifications.slice(0, 3).map((spec, index) => (
                                        <span key={index} className="similar-spec-badge">{spec.value}</span>
                                    ))}
                                </div>

                                <div className="similar-product-pricing">
                                    {discount > 0 && (
                                        <span className="similar-original-price">
                                            {price.toLocaleString()}đ
                                        </span>
                                    )}
                                    <span className="similar-discounted-price">
                                        {discountPrice.toLocaleString()}đ
                                    </span>
                                    {discount > 0 && (
                                        <span className="similar-discount-percent">
                                            -{discount}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SuggestedProducts;
