import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './FlashSale.css';

const FlashSale = () => {
  const flashSaleItems = [
    { name: 'Laptop gaming ASUS Vivobook 16X', price: '29.990.000₫', discount: '-1%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'Laptop ASUS Vivobook 14 OLED', price: '16.990.000₫', discount: '-19%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'ASUS Gaming Vivobook', price: '18.990.000₫', discount: '-3%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'Laptop gaming Acer Nitro', price: '19.990.000₫', discount: '-5%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'HP Gaming Pavilion', price: '24.990.000₫', discount: '-2%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'Lenovo Legion 5', price: '21.990.000₫', discount: '-4%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'Dell Gaming G5', price: '25.490.000₫', discount: '-3%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'MSI GF63 Thin', price: '22.990.000₫', discount: '-6%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'Razer Blade Stealth', price: '29.490.000₫', discount: '-1%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
    { name: 'MacBook Pro 16"', price: '35.990.000₫', discount: '-7%', imgSrc: 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png' },
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(flashSaleItems.length / itemsPerPage);
  const currentItems = flashSaleItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > totalPages) {
      setCurrentPage(1); 
    } else if (newPage < 1) {
      setCurrentPage(totalPages); 
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flash-sale-container p-4 rounded position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary fw-bold">
          <span role="img" aria-label="flash">⚡</span> DEAL SỐC - GIÁ HỜI
        </h4>
        <button className="btn btn-dark rounded-pill px-4">Flash Sale</button>
      </div>
      <div className="row position-relative">
        {currentItems.map((item, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-2 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <img src={item.imgSrc} className="card-img-top" alt={item.name} style={{ height: '150px', objectFit: 'cover' }} />
              <div className="card-body text-center">
                <h6 className="card-title text-truncate">{item.name}</h6>
                <p className="card-text text-danger fw-bold">{item.price}</p>
                <span className="badge bg-danger text-white">{item.discount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary btn-prev"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        className="btn btn-primary btn-next"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div className="text-center mt-3">
        <button className="btn btn-info text-white fw-bold px-4 rounded-pill">Xem thêm khuyến mãi</button>
      </div>
    </div>
  );
};

export default FlashSale;
