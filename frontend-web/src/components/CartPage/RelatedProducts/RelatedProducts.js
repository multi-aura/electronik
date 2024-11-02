import React, { useState } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './RelatedProducts.css';

const RelatedProducts = ({ relatedProducts }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Cấu hình cho Slider để hiển thị 5 sản phẩm mỗi lần
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4, // Hiển thị 4 sản phẩm trên màn hình vừa
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2, // Hiển thị 2 sản phẩm trên màn hình nhỏ
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1, // Hiển thị 1 sản phẩm trên màn hình rất nhỏ
                },
            },
        ],
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="related-products p-3">
            <div className="d-flex justify-content-between align-items-center mb-3 related_buy_more">
                <h6 className="text-muted">Mua kèm tiết kiệm hơn</h6>
                <button
                    onClick={toggleVisibility}
                    className="btn btn-outline-primary"
                    aria-label="Toggle related products"
                >
                    <FontAwesomeIcon icon={isVisible ? faChevronUp : faChevronDown} />
                </button>
            </div>

            {isVisible && (
                <Slider {...settings}>
                    {relatedProducts.map((product) => (
                        <div key={product.id} className="related-product-card text-center p-3">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="main-image img-fluid mb-2"
                            />
                            <p className="product-name mb-1">{product.name}</p>
                            <p className="discounted-price text-danger mb-1">{product.discountedPrice.toLocaleString('vi-VN')}đ</p>
                            {/* Hàng ảnh phụ nhỏ bên dưới */}
                            <div className="additional-images d-flex justify-content-center mb-2">
                                {product.additionalImages && product.additionalImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Additional ${index}`}
                                        className="additional-image rounded-circle"
                                    />
                                ))}
                            </div>
                            <button className="btn btn-outline-primary">Quick add</button>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default RelatedProducts;
