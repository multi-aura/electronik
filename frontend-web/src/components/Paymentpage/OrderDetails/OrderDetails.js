import React, { useState, useEffect } from 'react';
import './OrderDetails.css';
import { calculateTotal, calculateTotal_current } from '../../../services/cartService';

const OrderDetails = ({ items, onHandleOrderChange }) => {
    const [shippingCost, setShippingCost] = useState(0);
    const [priceCurrent, setPriceCurrent] = useState(0);
    const [priceSale, setPriceSale] = useState(0);

    useEffect(() => {
        const updatePrices = () => {
            const currentPrice = calculateTotal_current();
            const salePrice = calculateTotal();

            setPriceCurrent(currentPrice);
            setPriceSale(salePrice);

            const calculatedShippingCost = salePrice > 15000000 ? 0 : 100000;
            setShippingCost(calculatedShippingCost);
            onHandleOrderChange(calculatedShippingCost);
        };

        window.addEventListener('cartUpdated', updatePrices);

        updatePrices();

        return () => {
            window.removeEventListener('cartUpdated', updatePrices);
        };
    }, []);

    if (!Array.isArray(items) || items.length === 0) {
        return <div className="order-details-container">Không có sản phẩm nào trong giỏ hàng.</div>;
    }

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const vatAmount = priceCurrent * 0.1; // Giả sử VAT là 10%

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
                        <span className="order-details-item-price">{formatPrice(item.priceold)}</span>
                    </div>
                    <span className="order-details-item-quantity">x {item.quantity}</span>
                </div>
            ))}

            <div className="order-details-summary">
                <div className="order-details-summary-row">
                    <span>Tổng tiền sản phẩm:</span>
                    <span>{formatPrice(priceCurrent)}</span>
                </div>
                <div className="order-details-summary-row">
                    <span>Tổng tiền sau giảm giá:</span>
                    <span>{formatPrice(priceSale)}</span>
                </div>
                <div className="order-details-summary-row">
                    <span>VAT:</span>
                    <span>{formatPrice(vatAmount)}</span>
                </div>
                <div className="order-details-summary-row">
                    <span>Phí vận chuyển:</span>
                    <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="order-details-summary-row order-details-total">
                    <span><strong>Tổng cộng:</strong></span>
                    <span><strong>{formatPrice(priceSale + vatAmount + shippingCost)}</strong></span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails
