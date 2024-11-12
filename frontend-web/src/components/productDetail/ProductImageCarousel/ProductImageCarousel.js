import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './ProductImageCarousel.css';

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button className="slick-prev" onClick={onClick}>
            <FaArrowLeft size={20} color="#333" />
        </button>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <button className="slick-next" onClick={onClick}>
            <FaArrowRight size={20} color="#333" />
        </button>
    );
};

const ProductImageCarousel = ({ images, onSelectImage }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(images.length, 5),
        slidesToScroll: 1,
        arrows: true,
        variableWidth: true,
        centerMode: false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    const handleImageClick = (index) => {
        setSelectedIndex(index);
        onSelectImage(images[index].url);
    };

    return (
        <div className="custom-product-image-gallery">
            <Slider {...settings} className="custom-thumbnail-carousel">
                {images.map((image, index) => (
                    <div
                        key={image._id || index}
                        className={`custom-thumbnail-item ${selectedIndex === index ? 'selected' : ''}`}
                        onClick={() => handleImageClick(index)}
                    >
                        <img
                            src={image.url}
                            alt={`Product variant ${index + 1}`}
                            className="custom-img-thumbnail"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductImageCarousel;
