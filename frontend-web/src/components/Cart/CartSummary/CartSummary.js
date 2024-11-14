import React from 'react';
import './CartSummary.css';

const CartSummary = ({ subtotal }) => {

  return (
    <div className="cart-summary">
      <div className="summary-row">
        <span className="label">Tạm tính</span>
        <span className="amount">{subtotal.toLocaleString() } VND</span>
      </div>
      <div className="summary-row total-row">
        <span className="label">Tổng cộng</span>
        <span className="amount">{subtotal.toLocaleString ()} VND</span>
      </div>
    </div>
  );
};

export default CartSummary;
