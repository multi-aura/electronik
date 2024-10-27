import React from 'react';
import { Carousel } from 'react-bootstrap';
import './BannerCarousel.css';
const BannerCarousel = ({ banners }) => {
  return (
    <div className="carousel-container">
      <Carousel className="mb-4" interval={3000} fade={false} controls={true}>
        {banners.map((banner, index) => (
          <Carousel.Item key={index}>
            <img
              src={banner.src}
              className="d-block w-100"
              alt={banner.alt}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
