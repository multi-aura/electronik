import React, { useState } from 'react';
import { Button, Badge, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaHeart, FaShareAlt, FaShippingFast } from 'react-icons/fa';

function ProductInfo({
  name = 'Laptop ASUS Gaming VivoBook K3605ZC-RP564W',
  price = 1850000,
  oldPrice = 2390000,
  stock = 10,
  description = 'Thiết kế nhỏ gọn, mạnh mẽ, hoàn hảo cho mọi nhu cầu công việc và giải trí.',
  colorOptions = [
    { label: 'Đen', img: 'link_to_black_image.jpg', description: 'Sang trọng và mạnh mẽ, phù hợp mọi hoàn cảnh.' },
    { label: 'Hồng', img: 'link_to_pink_image.jpg', description: 'Nữ tính và tinh tế, dành cho những ai yêu sự nổi bật.' },
    { label: 'Trắng', img: 'link_to_white_image.jpg', description: 'Thanh lịch và sạch sẽ, dễ dàng phối với mọi phong cách.' }
  ]
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, quantity + value));
  };

  return (
    <div className="product-info">
      <h2>{name}</h2>
      
      <Badge bg="warning" className="mb-2" style={{width:"30%"}}>4.8 ★ Đánh giá (123)</Badge>
      <p className="text-muted" style={{margin:"0px"}}>{description}</p>

      <div className="mt-3">
        {oldPrice && (
          <span className="old-price text-decoration-line-through me-2 text-muted">
            {oldPrice.toLocaleString()}đ
          </span>
        )}
        <span className="new-price text-danger fs-4">{price.toLocaleString()}đ</span>
        {oldPrice && (
          <Badge bg="danger" className="ms-2">-{Math.round(((oldPrice - price) / oldPrice) * 100)}%</Badge>
        )}
      </div>

      <OverlayTrigger
        overlay={<Tooltip>Giao hàng nhanh trong 24 giờ</Tooltip>}
      >
        <div className="mt-3 d-flex align-items-center">
          <FaShippingFast className="text-success me-2" />
          <span>Giao hàng toàn quốc, nhận hàng nhanh chóng</span>
        </div>
      </OverlayTrigger>

      <hr />

      {/* Lựa Chọn Màu Sắc */}
      <div className="color-section mt-2">
        <strong>Màu sắc:</strong> {selectedColor.label} - <em>{selectedColor.description}</em>
        <div className="d-flex gap-3 mt-3">
          {colorOptions.map((colorOption, index) => (
            <div
              key={index}
              onClick={() => setSelectedColor(colorOption)}
              style={{
                border: selectedColor.label === colorOption.label ? '2px solid red' : '1px solid #ddd',
                borderRadius: '5px',
                padding: '5px',
                textAlign: 'center',
                cursor: 'pointer',
                width: '70px',
                backgroundColor: '#f9f9f9',
                transition: 'border 0.3s ease'
              }}
            >
              <img
                src={colorOption.img}
                alt={colorOption.label}
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  marginBottom: '5px',
                }}
              />
              <div>{colorOption.label}</div>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* Số Lượng */}
      <div className="quantity-section mt-3">
        <strong>Số lượng:</strong>
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

      {/* Tổng Cộng */}
      <div className="subtotal-section mt-3">
        <strong>Tổng cộng:</strong> {`${(price * quantity).toLocaleString()}đ`}
      </div>

      {/* Nút Hành Động */}
      <div className="d-flex gap-2 mt-4">
        <Button variant="danger" className="flex-grow-1">MUA NGAY</Button>
        <Button variant="outline-secondary"><FaHeart /></Button>
        <Button variant="outline-secondary"><FaShareAlt /></Button>
      </div>

      {/* Bảo hành và Chế độ đổi trả */}
      <div className="additional-info mt-4">
        <p><strong>Bảo hành:</strong> 12 tháng</p>
        <p><strong>Chính sách đổi trả:</strong> Đổi trả trong 30 ngày nếu có lỗi kỹ thuật</p>
      </div>
    </div>
  );
}

export default ProductInfo;
