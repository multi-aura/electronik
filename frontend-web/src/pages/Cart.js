import React, { useState, useEffect } from 'react';
import '../assets/css/Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../components/Cart/CartItem/CartItem';
import CartSummary from '../components/Cart/CartSummary/CartSummary';
import CartFooter from '../components/Cart/CartFooter/CartFooter';
import FreeShippingProgress from '../components/CartPage/FreeShippingProgress/FreeShippingProgress';
import { getCart, calculateTotal, removeFromCart, updateQuantity } from '../services/cartService';

const Cart = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [items, setItems] = useState(getCart());
    const [subtotal, setSubtotal] = useState(calculateTotal());

    useEffect(() => {
        setIsVisible(true); // Kích hoạt hiệu ứng trượt vào khi giỏ hàng mở
    }, []);

    const handleClose = () => {
        setIsVisible(false); // Kích hoạt hiệu ứng trượt ra
        setTimeout(onClose, 300); // Đợi 300ms để hiệu ứng hoàn tất, sau đó đóng giỏ hàng
    };

    useEffect(() => {
        const handleCartUpdate = () => {
            setItems(getCart());
            setSubtotal(calculateTotal());
        };
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const handleUpdateQuantity = (productId, newQuantity) => {
        updateQuantity(productId, newQuantity);
    };

    const handleRemoveItem = (serial) => {
        removeFromCart(serial);
    };

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
                <FreeShippingProgress subtotal={subtotal} freeShippingThreshold={5000000} />
                <div className="cart-item-list mb-4">
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                </div>
                <CartSummary subtotal={subtotal} />
                <CartFooter />
            </div>
        </>
    );
};

export default Cart;
