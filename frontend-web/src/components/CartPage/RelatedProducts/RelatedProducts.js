import React, { useState } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './RelatedProducts.css';

// Nút điều hướng trái
const PrevArrow = ({ onClick }) => (
    <button className="slider-arrow prev-arrow" onClick={onClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
    </button>
);

// Nút điều hướng phải
const NextArrow = ({ onClick }) => (
    <button className="slider-arrow next-arrow" onClick={onClick}>
        <FontAwesomeIcon icon={faChevronRight} />
    </button>
);

const RelatedProducts = ({ relatedProducts }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedVariants, setSelectedVariants] = useState({});

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />, // Nút trượt sang trái
        nextArrow: <NextArrow />, // Nút trượt sang phải
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleVariantChange = (productId, variant) => {
        setSelectedVariants((prevSelected) => ({
            ...prevSelected,
            [productId]: variant,
        }));
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
                    {relatedProducts.map((product) => {
                        const selectedVariant = selectedVariants[product.id] || product;

                        return (
                            <div key={product.id} className="related-product-card text-center p-3">
                                <div className="product-image-container mb-2">
                                    <img
                                        src={selectedVariant.image}
                                        alt={selectedVariant.name}
                                        className="main-image img-fluid"
                                    />
                                </div>
                                <p className="product-name mb-1 text-truncate">{selectedVariant.name}</p>
                                <p className="discounted-price text-danger mb-1">
                                    {selectedVariant.discountedPrice.toLocaleString('vi-VN')}đ
                                </p>
                                <div className="additional-images d-flex justify-content-center mb-2">
                                    {product.variants && product.variants.map((variant) => (
                                        <img
                                            key={variant.id}
                                            src={variant.image}
                                            alt={variant.name}
                                            className="additional-image rounded-circle"
                                            onClick={() => handleVariantChange(product.id, variant)}
                                        />
                                    ))}
                                </div>
                                <button className="btn btn-outline-primary">Quick add</button>
                            </div>
                        );
                    })}
                </Slider>
            )}
        </div>
    );
};

export default RelatedProducts;
