import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartFooter.css';

const CartFooter = ({ cartItems }) => {
  const [subtotal, setSubtotal] = useState(0); // Giá trị tạm tính
  const [discount, setDiscount] = useState(0); // Giảm giá (phần trăm)
  const [additionalComments, setAdditionalComments] = useState(''); // Ghi chú bổ sung

  // Cập nhật `subtotal` khi `cartItems` thay đổi
  useEffect(() => {
    const newSubtotal = cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ) || 0;
    setSubtotal(newSubtotal);
  }, [cartItems]);

  // Tính tổng cộng sau khi áp dụng giảm giá
  const total = subtotal - subtotal * discount;

  // Định dạng giá tiền theo đơn vị tiền tệ Việt Nam
  const formatPrice = (price) =>
    price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <div className="cart-footer-container p-4">
      {/* Tạm tính */}
      <div className="cart-footer-summary mb-3">
        <span className="cart-footer-summary-title">Tạm tính:</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      {/* Giảm giá */}
      {discount > 0 && (
        <div className="cart-footer-summary mb-3">
          <span className="cart-footer-discount-title">Giảm giá:</span>
          <span className="cart-footer-discount-value">
            - {formatPrice(subtotal * discount)}
          </span>
        </div>
      )}

      {/* Tổng cộng */}
      <div className="cart-footer-summary mb-3">
        <span className="cart-footer-total-title">Tổng cộng:</span>
        <span>{formatPrice(total)}</span>
      </div>

      {/* Ghi chú */}
      <div className="cart-footer-comments mb-3">
        <label className="cart-footer-comments-label">
          Ghi chú bổ sung{' '}
          <span className="badge bg-light text-muted">Lưu ý</span>
        </label>
        <textarea
          className="cart-footer-comments-textarea form-control"
          placeholder="Nhập ghi chú của bạn"
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
          rows="3"
        />
      </div>

      {/* Nút thanh toán */}
      <Link to={`/product/Payment`}>
        <button className="cart-footer-checkout-btn btn btn-dark w-100 mt-3">
          Thanh toán ngay
        </button>
      </Link>
    </div>
  );
};

export default CartFooter;
