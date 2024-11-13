import React from 'react';
import './OrderDetails.css';

const OrderDetails = ({ items }) => {
    if (!Array.isArray(items) || items.length === 0) {
        return <div className="order-details-container">Không có sản phẩm nào trong giỏ hàng.</div>;
    }

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const vatAmount = subtotal * 0.2; // Giả sử VAT là 20%
    const discountAmount = 0; // Giảm giá
    const shippingCost = 0; // Phí vận chuyển
    const totalAmount = subtotal + vatAmount - discountAmount + shippingCost; // Tổng số tiền

    return (
        <div className="order-details-container">
            <h4 className="order-details-title mb-4">Giỏ hàng của bạn</h4>
            {items.map((item) => (
                <div className="order-details-item-row" key={item.id}>
                    <div className="order-details-item-image">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className="order-details-item-info">
                        <span className="order-details-item-name">{item.name}</span>
                        <span className="order-details-item-price">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                    <span className="order-details-item-quantity">x {item.quantity}</span>
                </div>
            ))}

            <div className="order-details-summary">
                <div className="order-details-summary-row">
                    <span>Tổng sản phẩm:</span>
                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="order-details-summary-row">
                    <span>Giảm giá:</span>
                    <span>{discountAmount.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="order-details-summary-row">
                    <span>VAT:</span>
                    <span>{vatAmount.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="order-details-summary-row">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingCost.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="order-details-summary-row order-details-total">
                    <span><strong>Tổng cộng:</strong></span>
                    <span><strong>{totalAmount.toLocaleString('vi-VN')}đ</strong></span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
