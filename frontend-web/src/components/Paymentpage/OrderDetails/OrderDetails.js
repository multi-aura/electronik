import React from 'react';
import './OrderDetails.css'; 

const OrderDetails = ({ items }) => {
    if (!Array.isArray(items) || items.length === 0) {
        return <div className="order-details">Không có sản phẩm nào trong giỏ hàng.</div>;
    }

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const vatAmount = subtotal * 0.2; // Giả sử VAT là 20%
    const discountAmount = 0; // Giảm giá
    const shippingCost = 0; // Phí vận chuyển
    const totalAmount = subtotal + vatAmount - discountAmount + shippingCost; // Tổng số tiền

    return (
        <div className="order-details">
            <h4 className="mb-4 ">Giỏ hàng của bạn</h4>
            {items.map((item) => (
                <div className="item-row" key={item.id}>
                    <div className="item-image">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                    <span className="item-quantity">x {item.quantity}</span>
                </div>
            ))}

            <div className="summary">
                <div className="summary-row">
                    <span>Tổng sản phẩm:</span>
                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="summary-row">
                    <span>Giảm giá:</span>
                    <span>{discountAmount.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="summary-row">
                    <span>VAT:</span>
                    <span>{vatAmount.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingCost.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="summary-row total">
                    <span><strong>Tổng cộng:</strong></span>
                    <span><strong>{totalAmount.toLocaleString('vi-VN')}đ</strong></span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
