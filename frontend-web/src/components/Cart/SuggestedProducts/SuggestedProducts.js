import React from 'react';
import Slider from 'react-slick';
import './SuggestedProducts.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icon điều hướng

const suggestedProducts = [
  {
    id: 1,
    name: "Product 23 - Clothing And Accessories",
    price: 489.0,
    image: "https://product.hstatic.net/200000722513/product/thin-new_53b6dda3063c4b1fb550042f10500adc.png",
    variants: [
      { id: 1, image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-titan-sa-mac.png" },
      { id: 2, image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/l/o/loa-bluetooth-jbl-go-4_1.png" },
      { id: 3, image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-jbl-tune-310c-1_1.png" },
    ],
  },
  {
    id: 2,
    name: "Product 24 - Another Accessory",
    price: 299.0,
    image: "https://product.hstatic.net/200000722513/product/thin-new_53b6dda3063c4b1fb550042f10500adc.png",
    variants: [
      { id: 1, image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-titan-sa-mac.png" },
      { id: 2, image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/l/o/loa-bluetooth-jbl-go-4_1.png" },
      { id: 3, image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-jbl-tune-310c-1_1.png" },
    ],
  },
];

// Nút điều hướng trái
const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev-arrow" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
};

// Nút điều hướng phải
const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next-arrow" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
};

const SuggestedProducts = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="suggested-products-slider">
      <h5 className="slider-title">Mua kèm tiết kiệm hơn</h5>
      <Slider {...settings}>
        {suggestedProducts.map((product) => (
          <div key={product.id} className="slider-item">
            <img src={product.image} alt={product.name} className="product-image-cart" />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
            <div className="product-variants d-flex justify-content-center">
              {product.variants.map((variant) => (
                <img key={variant.id} src={variant.image} alt="variant" className="variant-image" />
              ))}
            </div>
            <button className="quick-add">Quick add</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuggestedProducts;
