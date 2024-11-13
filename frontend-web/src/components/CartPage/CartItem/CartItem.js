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
    <div className="cart-item-custom row align-items-center py-3 border-bottom">
      <div className="col-6 col-md-4 d-flex align-items-center">
        <img src={item.image} alt={item.name} className="img-fluid me-3 cart-item-custom-image" />
        <div>
          <p className="cart-item-custom-title mb-1">{item.name}</p>
          <small className="text-muted cart-item-custom-brand">{item.brand}</small>
        </div>
      </div>
      <div className="col-2 text-center cart-item-custom-price-section">{item.price.toLocaleString('vi-VN')} </div>
      <div className="col-3 text-center">
        <div className="cart-item-custom-quantity-controls">
          <button onClick={handleDecrease} className="btn btn-outline-secondary btn-sm ">-</button>
          <span className="cart-item-custom-quantity">{item.quantity}</span>
          <button onClick={handleIncrease} className="btn btn-outline-secondary btn-sm">+</button>
        </div>
      </div>
      <div className="col-2 text-center cart-item-custom-total-price">{(item.price * item.quantity).toLocaleString('vi-VN')} </div>
      <div className="col-1 text-center">
        <button className="btn cart-item-custom-remove-btn" onClick={() => onRemove(item.id)}>
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
