import React from 'react';
import './SimilarProducts.css'; // Đảm bảo bạn có file CSS để áp dụng phong cách

// Danh sách sản phẩm mẫu
const products = [
    {
        id: 1,
        image: 'https://product.hstatic.net/200000722513/product/asus_gaming_vivobook_k3605zf-rp634w_d59d42a7451f48d48cce32645f03f90c_grande.jpg',
        name: 'Chuột không dây MonsGeek D1 Black',
        originalPrice: 200000,
        discountedPrice: 150000,
        discountPercent: 50,
        rating: 0,
        reviews: 0,
    },
    {
        id: 2,
        image: 'https://product.hstatic.net/200000722513/product/asus_gaming_vivobook_k3605zf-rp634w_d59d42a7451f48d48cce32645f03f90c_grande.jpg',

        name: 'Chuột AKKO Smart 1 Sailor Moon',
        originalPrice: 369000,
        discountedPrice: 290000,
        discountPercent: 21,
        rating: 0,
        reviews: 0,
    },
    {
        id: 3,
        image: 'https://product.hstatic.net/200000722513/product/asus_gaming_vivobook_k3605zf-rp634w_d59d42a7451f48d48cce32645f03f90c_grande.jpg',

        name: 'Chuột không dây Rapoo M20',
        originalPrice: 0,
        discountedPrice: 150000,
        discountPercent: 0,
        rating: 0,
        reviews: 0,
    },
];

const SimilarProducts = () => {
    return (
        <div className="similar-products">
            <h2>Sản phẩm tương tự</h2>
            {products.map((product) => (
                <div className="product-item" key={product.id}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-pricing">
                            {product.originalPrice > 0 && (
                                <span className="original-price">{product.originalPrice.toLocaleString()}đ</span>
                            )}
                            <span className="discounted-price">{product.discountedPrice.toLocaleString()}đ</span>
                            {product.discountPercent > 0 && (
                                <span className="discount-percent">-{product.discountPercent}%</span>
                            )}
                        </div>
                        <div className="product-rating">
                            <span>{product.rating.toFixed(1)}</span>
                            <i className="fa fa-star rating-icon" aria-hidden="true"></i>
                            <span>({product.reviews} đánh giá)</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SimilarProducts;
