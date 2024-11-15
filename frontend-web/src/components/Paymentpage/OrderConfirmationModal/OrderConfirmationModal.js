import React from 'react';
import './OrderConfirmationModal.css';

const OrderConfirmationModal = ({ isOpen, onViewOrder, onGoHome }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="icon-circle">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>Đơn hàng của bạn đã được xác nhận</h2>
        <p>Cảm ơn bạn đã mua sắm! Đơn hàng của bạn chưa được giao, nhưng chúng tôi sẽ gửi email khi hoàn tất.</p>
        <button className="view-order-btn" onClick={onViewOrder}>Xem Đơn Hàng</button>
        <button className="back-home-btn" onClick={onGoHome}>Quay Lại Trang Chủ</button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
