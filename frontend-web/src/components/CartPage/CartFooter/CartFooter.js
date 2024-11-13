import React, { useState } from 'react';
import VoucherList from '../VoucherList/VoucherList';
import { Link } from 'react-router-dom';
import './CartFooter.css'
const CartFooter = ({ cartItems }) => {
  const [subtotal, setSubtotal] = useState(
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [additionalComments, setAdditionalComments] = useState('');
  const [showVoucherList, setShowVoucherList] = useState(false);

  const handleApplyVoucher = (code, discountValue) => {
    setVoucherCode(code);
    setDiscount(discountValue);
    alert(`Mã giảm giá "${code}" đã được áp dụng!`);
    setShowVoucherList(false);
  };

  const total = subtotal - subtotal * discount;
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  return (
    <div className="cart-footer-container p-4">
      <div className="cart-footer-summary mb-3">
        <span className="cart-footer-summary-title">Tạm tính:</span>
        <span>{formatPrice(subtotal)} </span>
      </div>

      {discount > 0 && (
        <div className="cart-footer-summary mb-3">
          <span className="cart-footer-discount-title">Giảm giá:</span>
          <span className="cart-footer-discount-value">- {formatPrice(subtotal * discount)} </span>
        </div>
      )}

      <div className="cart-footer-summary mb-3">
        <span className="cart-footer-total-title">Tổng cộng:</span>
        <span>{formatPrice(total)} </span>
      </div>

      <button
        className="cart-footer-voucher-btn btn btn-dark w-100 mb-3"
        onClick={() => setShowVoucherList(!showVoucherList)}
      >
        {showVoucherList ? "Ẩn danh sách mã giảm giá ▲" : "Sử dụng mã giảm giá ▼"}
      </button>

      {showVoucherList && <VoucherList onApplyVoucher={handleApplyVoucher} />}

      <div className="cart-footer-voucher-input-group mb-3 d-flex">
        <input
          type="text"
          className="cart-footer-voucher-input form-control"
          placeholder="Mã giảm giá"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button
          className="cart-footer-apply-btn btn btn-dark"
          onClick={() => handleApplyVoucher(voucherCode, discount)}
        >
          Áp dụng mã
        </button>
      </div>
      
      <div className="cart-footer-comments mb-3">
        <label className="cart-footer-comments-label">Ghi chú bổ sung <span className="badge bg-light text-muted">Lưu ý</span></label>
        <textarea
          className="cart-footer-comments-textarea form-control"
          placeholder="Nhập ghi chú của bạn"
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
          rows="3"
        />
      </div>

      <Link to={`/product/Payment`}>
        <button className="cart-footer-checkout-btn btn btn-dark w-100 mt-3">Thanh toán ngay</button>
      </Link>
    </div>
  );
};

export default CartFooter;
