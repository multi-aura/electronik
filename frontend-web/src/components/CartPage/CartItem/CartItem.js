// CartItem.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './CartItem.css';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
const CartItem = ({ item, onUpdateQuantity, onRemove, relatedProducts }) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="cart-item row align-items-center py-3 border-bottom">
      <div className="col-6 col-md-4 d-flex align-items-center">
        <img src={item.image} alt={item.name} className="img-fluid me-3" />
        <div>
          <p className="cart-item-title mb-1">{item.name}</p>
          <small className="text-muted">{item.brand}</small>
        </div>
      </div>
      <div className="col-2 text-center price-section">{item.price.toLocaleString('vi-VN')} VND</div>
      <div className="col-2 text-center">
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span className="quantity">{item.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>
      <div className="col-2 text-center total-price">{(item.price * item.quantity).toLocaleString('vi-VN')} VND</div>
      <div className="col-1 text-center">
        <button className="btn remove-btn" onClick={() => onRemove(item.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {/* Hiển thị sản phẩm mua kèm */}
      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts relatedProducts={relatedProducts} />
      )}
    </div>
  );
};

export default CartItem;
