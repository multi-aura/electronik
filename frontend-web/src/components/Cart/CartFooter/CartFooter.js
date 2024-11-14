
import React, { useState } from 'react';
import './CartFooter.css';
import { Link } from 'react-router-dom';
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
      <Link to="/product/Cart">
        <button className="view-cart-btn" >XEM GIỎ HÀNG</button>
      </Link>
    </div>
  );
};

export default CartFooter;
