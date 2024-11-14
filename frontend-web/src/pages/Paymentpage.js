import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ShippingInfo from '../components/Paymentpage/ShippingInfo/ShippingInfo';
import OrderDetails from '../components/Paymentpage/OrderDetails/OrderDetails';
import PaymentMethod from '../components/Paymentpage/PaymentMethod/PaymentMethod';
import Layout from '../layouts/Layout';
import '../assets/css/PaymentPage.css';
import { calculateTotal, clearCart, getCart, removeFromCart } from '../services/cartService';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fetchCreateOrder } from '../services/paymentService';

const PaymentPage = () => {
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        telephone: '',
        note: ''
    });

    const [errors, setErrors] = useState({});
    const [shippingCost, setShippingCost] = useState(0);
    const [orderItems, setOrderItems] = useState(getCart());

    const handleShippingCostChange = (cost) => {
        setShippingCost(cost);
    };

    const handleShippingInfoChange = (info) => {
        setShippingInfo(info);
        setErrors({}); // Reset lỗi khi thay đổi thông tin giao hàng
    };

    useEffect(() => {
        const handleCartUpdate = () => {
            setOrderItems(getCart()); // Cập nhật lại giỏ hàng từ sessionStorage
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const validateShippingInfo = () => {
        const newErrors = {};

        if (!shippingInfo.firstName) newErrors.firstName = "Họ không được để trống";
        else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(shippingInfo.firstName)) newErrors.firstName = "Họ chỉ chứa chữ cái";

        if (!shippingInfo.lastName) newErrors.lastName = "Tên không được để trống";
        else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(shippingInfo.lastName)) newErrors.lastName = "Tên chỉ chứa chữ cái";

        if (!shippingInfo.address) newErrors.address = "Địa chỉ không được để trống";
        if (!shippingInfo.district) newErrors.district = "Quận/Huyện không được để trống";

        if (!shippingInfo.province) newErrors.province = "Thành phố không được để trống";

        if (!shippingInfo.ward) newErrors.ward = "Xã/Phường không được để trống";

        if (!shippingInfo.telephone) newErrors.telephone = "Điện thoại không được để trống";
        else if (!/^\d{10,15}$/.test(shippingInfo.telephone)) newErrors.telephone = "Số điện thoại không hợp lệ";

        if (!shippingInfo.email) newErrors.email = "Email không được để trống";
        else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = "Email không hợp lệ";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleCreateOrder = async () => {
        if (!validateShippingInfo()) {
            console.log("Thông tin không hợp lệ, vui lòng kiểm tra lại.");
            return;
        }

        const orderData = {
            ward: shippingInfo.wardName,
            district: shippingInfo.districtName,
            province: shippingInfo.provinceName,
            status: "Pending",
            addressLine: shippingInfo.address,
            contactPhone: shippingInfo.telephone,
            deliveryFee: shippingCost,
            orderDate: new Date().toISOString(),
            paymentMethod: "Cash on Delivery",
            paymentStatus: "Not yet paid",
            recipientName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            total: calculateTotal(),
            details: orderItems.map((item) => ({
                productID: item.id,
                serial: parseInt(item.serial, 10),
                nameVi: item.name,
                variantID: item.variantID,
                color: item.color,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity,
                sale: {
                    _id: item.sale.saleID,
                    saleNameVi: item.sale.saleName,
                    discountPercentage: item.sale.discountPercentage,
                },
            }))
        };
        try {
            const response = await fetchCreateOrder(orderData);
            alert('Đơn hàng đã được tạo thành công!');
            clearCart();
            // window.location.href = '/order-confirmation';
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Tạo đơn hàng không thành công. Vui lòng kiểm tra lại thông tin và thử lại.');
        }
        
    };
    // console.log(orderItems);
    return (
        <Layout>
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
                            <ShippingInfo
                                onShippingInfoChange={handleShippingInfoChange}
                                errors={errors}
                            />
                            <div className="button-container">
                                <Link to={`/product/Cart`}>
                                    <button className="btn-back">Trở lại giỏ hàng</button>
                                </Link>
                                <button onClick={handleCreateOrder} className="btn-confirm">Đặt hàng</button>

                            </div>
                        </div>

                    </div>

                    <div className="col-md-5">
                        <div className="section">
                            <OrderDetails items={orderItems} onHandleOrderChange={handleShippingCostChange} />
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
