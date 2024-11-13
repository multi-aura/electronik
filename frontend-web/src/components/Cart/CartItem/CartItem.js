import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  return (
    <div className="cart-item-page row py-3 border-bottom align-items-center">
      <div className="col-md-3 d-flex align-items-center">
        <img src={item.image} alt={item.name} className="img-fluid rounded cart-item-image" />
      </div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-12">
            <p className="cart-item-title mb-1">{item.name}</p>
            <p className="text-muted mb-1">Mã sản phẩm: {item.sku}</p>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6 d-flex align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="quantity">{item.quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm ms-2"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-end">
            <div className="price-section-cart  me-3">
             
              <span className="current-price text-danger fw-bold">{formatPrice(item.price)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-1 d-flex align-items-center justify-content-end">
        <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(item.serial)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
