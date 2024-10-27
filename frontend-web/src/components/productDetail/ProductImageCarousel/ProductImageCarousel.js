// src/components/productDetail/ProductImageCarousel/ProductImageCarousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const ProductImageCarousel = ({ images, onSelectImage }) => {
  return (
    <Carousel indicators={false} interval={null} controls={images.length > 1}>
      {images.map((image, index) => (
        <Carousel.Item key={index} onClick={() => onSelectImage(image.url)}>
          <img
            className="d-block"
            src={image.url}
            alt={`Slide ${index}`}
            style={{ width: '80px', height: '80px', cursor: 'pointer' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductImageCarousel;
