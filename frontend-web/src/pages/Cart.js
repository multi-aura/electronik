import React, { useState, useEffect } from 'react';
import '../assets/css/Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../components/Cart/CartItem/CartItem';
import CartSummary from '../components/Cart/CartSummary/CartSummary';
import CartFooter from '../components/Cart/CartFooter/CartFooter';
import FreeShippingProgress from '../components/CartPage/FreeShippingProgress/FreeShippingProgress';
import SuggestedProducts from '../components/Cart/SuggestedProducts/SuggestedProducts';
const Cart = ({ cartItems = [], onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState(cartItems.length > 0 ? cartItems : [
    {
      id: 1,
      sku: "SM-HD100",
      name: "High Quality Headphones",
      price: 120,
      quantity: 1,
      image: "https://product.hstatic.net/200000722513/product/thin-new_53b6dda3063c4b1fb550042f10500adc.png",
      description: "Premium headphones with high-definition sound quality.",
    },
    {
      id: 2,
      sku: "TW-SW200",
      name: "Smart Watch",
      price: 89.99,
      quantity: 2,
      image: "https://product.hstatic.net/200000722513/product/thin-new_53b6dda3063c4b1fb550042f10500adc.png",
      description: "Water-resistant smartwatch with various health tracking features.",
    },
  ]);

  useEffect(() => {
    setIsVisible(true); // Kích hoạt hiệu ứng trượt vào khi giỏ hàng mở
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Kích hoạt hiệu ứng trượt ra
    setTimeout(onClose, 300); // Đợi 300ms để hiệu ứng hoàn tất, sau đó đóng giỏ hàng
  };

  // Hàm cập nhật số lượng sản phẩm
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Tính subtotal
  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal(items);

  return (
    <>
      <div className={`cart-overlay-background ${isVisible ? 'show' : ''}`} onClick={handleClose}></div>
      <div className={`cart-container ${isVisible ? 'show' : 'hide'}`}>
        <div className="cart-header">
          <h2>
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" style={{ color: "green" }} />
            Giỏ Hàng

          </h2>

        </div>
        <p>{items.length} mặt hàng</p>
        <FreeShippingProgress subtotal={subtotal} freeShippingThreshold={800} />
        <div className="cart-item-list">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <SuggestedProducts />

        <CartSummary subtotal={subtotal} />
        <CartFooter />
      </div>
    </>
  );
};

export default Cart;
