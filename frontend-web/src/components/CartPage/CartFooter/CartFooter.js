import React, { useState } from 'react';
import VoucherList from '../VoucherList/VoucherList';
import { Link } from 'react-router-dom';
const CartFooter = ({ cartItems }) => {
  const [subtotal, setSubtotal] = useState(
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [additionalComments, setAdditionalComments] = useState('');
  const [showVoucherList, setShowVoucherList] = useState(false); // Khai báo state showVoucherList

  const handleApplyVoucher = (code, discountValue) => {
    setVoucherCode(code);
    setDiscount(discountValue);
    alert(`Mã giảm giá "${code}" đã được áp dụng!`);
    setShowVoucherList(false); // Ẩn danh sách voucher sau khi áp dụng
  };

  const total = subtotal - subtotal * discount;

  return (
    <div className="cart-footer p-4" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <div className="d-flex justify-content-between mb-3">
        <span className="summary-title">Tạm tính:</span>
        <span>{subtotal.toFixed(2)} đ</span>
      </div>

      {discount > 0 && (
        <div className="d-flex justify-content-between mb-3">
          <span className="summary-title text-success">Giảm giá:</span>
          <span className="text-success">- {(subtotal * discount).toFixed(2)} đ</span>
        </div>
      )}

      <div className="d-flex justify-content-between mb-3">
        <span className="summary-title">Tổng cộng:</span>
        <span>{total.toFixed(2)} đ</span>
      </div>

      {/* Nút để hiển thị danh sách voucher */}
      <button
        className="btn btn-dark w-100 mb-3"
        style={{ borderRadius: '8px' }}
        onClick={() => setShowVoucherList(!showVoucherList)}
      >
        {showVoucherList ? "Ẩn danh sách mã giảm giá ▲" : "Sử dụng mã giảm giá ▼"}
      </button>

      {/* Hiển thị VoucherList khi showVoucherList là true */}
      {showVoucherList && <VoucherList onApplyVoucher={handleApplyVoucher} />}



      <div className="voucher-input-group mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Mã giảm giá"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          style={{ borderRadius: '8px 0 0 8px', borderColor: '#ddd' }}
        />
        <button
          className="btn btn-dark"
          onClick={() => handleApplyVoucher(voucherCode, discount)}
          style={{ borderRadius: '0 8px 8px 0' }}
        >
          Áp dụng mã
        </button>
      </div>
      <div className="additional-comments mb-3">
        <label className="form-label fw-bold">Ghi chú bổ sung <span className="badge bg-light text-muted">Lưu ý</span></label>
        <textarea
          className="form-control"
          placeholder="Nhập ghi chú của bạn"
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
          rows="3"
          style={{ borderRadius: '8px', borderColor: '#ddd' }}
        />
      </div>

      <Link to={`/product/Payment`}>
        <button className="btn btn-dark w-100 mt-3" style={{ borderRadius: '8px' }}>Thanh toán ngay</button>
      </Link>
    </div>
  );
};

export default CartFooter;
