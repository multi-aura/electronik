// src/components/productDetail/productInfo/ProductInfo.js
import React, { useState } from 'react';
import { Button, Badge, Row, Col, Form } from 'react-bootstrap';
import { FaHeart, FaShareAlt } from 'react-icons/fa';

function ProductInfo({ name, price, oldPrice, stock, description }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, quantity + value));
  };

  return (
    <div className="product-info">
      <h2>{name}</h2>
      <Badge bg="danger" className="mb-2">6 sold in last 18 hours</Badge>
      <p className="text-muted">{description}</p>

      <div className="product-meta mt-3">
        <p><strong>Vendor:</strong> Ella - Halothemes</p>
        <p><strong>SKU:</strong> KJSU-58436</p>
        <p><strong>Availability:</strong> {stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
      </div>

      <div className="price-section mt-3">
        {oldPrice && (
          <span className="old-price text-decoration-line-through me-2">${oldPrice}</span>
        )}
        <span className="new-price text-danger fs-4">${price}</span>
      </div>

      {stock > 0 && (
        <div className="stock-info text-danger mt-2">
          <small>Please hurry! Only {stock} left in stock</small>
        </div>
      )}

      <hr />

 

      {/* Color Selection */}
      <div className="color-section mt-3">
        <strong>Color:</strong> Black
        <div className="d-flex gap-2 mt-2">
          {['#000000', '#f5f5f5', '#b2b2b2', '#ffa500', '#ff0000'].map((color, index) => (
            <Button
              key={index}
              style={{ backgroundColor: color, width: '30px', height: '30px', borderRadius: '50%' }}
              variant="outline-secondary"
            />
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="quantity-section mt-3">
        <strong>Quantity:</strong>
        <div className="d-flex align-items-center gap-2 mt-2">
          <Button variant="outline-secondary" onClick={() => handleQuantityChange(-1)}>-</Button>
          <Form.Control
            type="text"
            value={quantity}
            readOnly
            className="text-center"
            style={{ width: '60px' }}
          />
          <Button variant="outline-secondary" onClick={() => handleQuantityChange(1)}>+</Button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="subtotal-section mt-3">
        <strong>Subtotal:</strong> ${price * quantity}
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-4">
        <Button variant="dark" className="flex-grow-1">Add to Cart</Button>
        <Button variant="outline-secondary"><FaHeart /></Button>
        <Button variant="outline-secondary"><FaShareAlt /></Button>
      </div>
    </div>
  );
}

export default ProductInfo;
