import React, { useState } from 'react';
import './CartFooter.css';

const CartFooter = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="cart-footer">
      <label className="terms">
        <input type="checkbox" onChange={handleCheckboxChange} /> Tôi đồng ý với <a href="#">Điều khoản & Điều kiện</a>
      </label>
      <button className="checkout-btn" disabled={!isChecked}>THANH TOÁN</button>
      <button className="view-cart-btn" disabled={!isChecked}>XEM GIỎ HÀNG</button>
    </div>
  );
};

export default CartFooter;
