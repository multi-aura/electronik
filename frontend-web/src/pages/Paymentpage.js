import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ShippingInfo from '../components/Paymentpage/ShippingInfo/ShippingInfo';
import OrderDetails from '../components/Paymentpage/OrderDetails/OrderDetails';
import PaymentMethod from '../components/Paymentpage/PaymentMethod/PaymentMethod';
import Layout from '../layouts/Layout';
import '../assets/css/PaymentPage.css';

const userData = { name: 'Alex Korobov' };

const PaymentPage = () => {
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apartment: '',
        city: '',
        country: 'Lithuania',
        zip: '',
        telephone: '',
    });

    const orderItems = [
        { id: 1, name: 'Chrono Gunmetal', quantity: 1, price: 10821, image: 'https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png' },
        { id: 2, name: 'Chrono Silver', quantity: 2, price: 9500, image: 'https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png' },
        { id: 3, name: 'Chrono Gold', quantity: 1, price: 12000, image: 'https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png' }
    ];

    const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const vatAmount = totalAmount * 0.2;
    const shippingCost = 0;
    const discountAmount = 0;
    const grandTotal = totalAmount + vatAmount - discountAmount + shippingCost;

    const handleShippingInfoChange = (info) => {
        setShippingInfo(info);
    };

    return (
        <Layout userData={userData}>
            <div className="payment-page container">
                <div className="payment-header">
                    <div className="icon-container">
                        <i className="fas fa-credit-card"></i>
                        <span className="payment-title">Thanh toán</span>

                    </div>
                    <p className="payment-subtitle">
                        Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.
                    </p>
                </div>

                <div className="row">
                    <div className="col-md-7">
                        <div className="section">
                            <ShippingInfo onShippingInfoChange={handleShippingInfoChange} />
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="section">
                            <OrderDetails items={orderItems} />
                        </div>
                        <div className="section">
                            <PaymentMethod />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PaymentPage;
