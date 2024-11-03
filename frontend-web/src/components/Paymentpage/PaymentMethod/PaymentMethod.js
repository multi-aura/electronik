import React, { useState } from 'react';
import './PaymentMethod.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'; 
import { faPaypal } from '@fortawesome/free-brands-svg-icons'; 

const PaymentMethod = ({ onSelect }) => {
    const [method, setMethod] = useState('');

    const handleMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setMethod(selectedMethod);
        onSelect(selectedMethod);
    };

    return (
        <div className="payment-method">
            <h4 className="payment-title">Chọn phương thức thanh toán</h4>
            <div className="payment-options">
                <div className="payment-option">
                    <label className="payment-label">
                        <input
                            type="radio"
                            name="payment"
                            value="credit-card"
                            checked={method === 'credit-card'}
                            onChange={handleMethodChange}
                        />
                        <FontAwesomeIcon icon={faCreditCard} className="payment-icon" />
                        Thanh toán tại nhà
                    </label>
                </div>
                <div className="payment-option">
                    <label className="payment-label">
                        <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            checked={method === 'paypal'}
                            onChange={handleMethodChange}
                        />
                        <FontAwesomeIcon icon={faPaypal} className="payment-icon" />
                        PayPal
                    </label>
                </div>
                <div className="payment-option">
                    <label className="payment-label">
                        <input
                            type="radio"
                            name="payment"
                            value="bank-transfer"
                            checked={method === 'bank-transfer'}
                            onChange={handleMethodChange}
                        />
                        <FontAwesomeIcon icon={faMoneyBillWave} className="payment-icon" />
                        Chuyển khoản ngân hàng
                    </label>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
