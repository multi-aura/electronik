import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const ProductImageCarousel = ({ images = [
    { url: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop_msi_2__2_2.png' },
    { url: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/l/a/laptop_msi_6__1_2.png' },
    { url: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop_msi_2__2_2.png' },
    { url: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop_msi_1__2_2.png' },
    { url: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop_msi_1__2_2.png' },

], onSelectImage }) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: true,
        afterChange: (current) => onSelectImage(images[current].url)
    };

    return (
        <div className="product-image-gallery">
            {/* Hiển thị các ảnh thumbnail trượt ngang */}
            <Slider {...settings} className="thumbnail-carousel" style={{ maxWidth: '400px', margin: '0 auto', marginTop: '10px' }}>
                {images.map((image, index) => (
                    <div key={index} className="thumbnail-item" style={{ padding: '5px' }}>
                        <img
                            src={image.url}
                            alt={`Product variant ${index + 1}`}
                            onClick={() => {
                                onSelectImage(image.url);
                            }}
                            className="img-thumbnail"
                            style={{
                                cursor: 'pointer',
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductImageCarousel;
