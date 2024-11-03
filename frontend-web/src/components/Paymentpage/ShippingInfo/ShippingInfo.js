import React, { useState } from 'react';
import './ShippingInfo.css';
import { Link } from 'react-router-dom';
const ShippingInfo = ({ onShippingInfoChange }) => {
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        district: '',
        city: '',
        ward: '',
        telephone: '',
        email: '',
        note: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedInfo = { ...shippingInfo, [name]: value };
        setShippingInfo(updatedInfo);
        onShippingInfoChange(updatedInfo);

        // Reset lỗi khi có sự thay đổi
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        // Kiểm tra họ và tên
        if (!shippingInfo.firstName) {
            newErrors.firstName = "Họ không được để trống";
        } else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(shippingInfo.firstName)) {
            newErrors.firstName = "Họ chỉ chứa chữ cái";
        }

        if (!shippingInfo.lastName) {
            newErrors.lastName = "Tên không được để trống";
        } else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(shippingInfo.lastName)) {
            newErrors.lastName = "Tên chỉ chứa chữ cái";
        }

        // Kiểm tra địa chỉ
        if (!shippingInfo.address) {
            newErrors.address = "Địa chỉ không được để trống";
        } else if (/[^A-Za-z0-9\s,-]/.test(shippingInfo.address)) {
            newErrors.address = "Địa chỉ không hợp lệ";
        }

        // Kiểm tra quận/huyện, thành phố và xã/phường
        if (!shippingInfo.district) newErrors.district = "Quận/Huyện không được để trống";
        if (!shippingInfo.city) newErrors.city = "Thành phố không được để trống";
        if (!shippingInfo.ward) newErrors.ward = "Xã/Phường không được để trống";

        // Kiểm tra số điện thoại
        if (!shippingInfo.telephone) {
            newErrors.telephone = "Điện thoại không được để trống";
        } else if (!/^\d{10,15}$/.test(shippingInfo.telephone)) {
            newErrors.telephone = "Số điện thoại không hợp lệ";
        }

        // Kiểm tra email
        if (!shippingInfo.email) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Thông tin hợp lệ, tiếp tục đặt hàng...");
        } else {
            console.log("Thông tin không hợp lệ, vui lòng kiểm tra lại.");
        }
    };

    return (
        <div className="shipping-info">
            <h3 className='detail_cart'>Địa chỉ giao hàng</h3>

            <div className="form-row">
                <div className="form-group half-width">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Họ"
                        value={shippingInfo.firstName}
                        onChange={handleChange}
                        className={`form-control ${errors.firstName ? 'error' : ''}`}
                        required
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group half-width">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Tên"
                        value={shippingInfo.lastName}
                        onChange={handleChange}
                        className={`form-control ${errors.lastName ? 'error' : ''}`}
                        required
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
            </div>

            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={shippingInfo.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="telephone"
                    placeholder="Điện thoại"
                    value={shippingInfo.telephone}
                    onChange={handleChange}
                    className={`form-control ${errors.telephone ? 'error' : ''}`}
                    required
                />
                {errors.telephone && <span className="error-message">{errors.telephone}</span>}
            </div>

            <div className="form-row">
                <div className="form-group third-width">
                    <input
                        type="text"
                        name="ward"
                        placeholder="Xã/Phường"
                        value={shippingInfo.ward}
                        onChange={handleChange}
                        className={`form-control ${errors.ward ? 'error' : ''}`}
                        required
                    />
                    {errors.ward && <span className="error-message">{errors.ward}</span>}
                </div>
                <div className="form-group third-width">
                    <input
                        type="text"
                        name="district"
                        placeholder="Quận/Huyện"
                        value={shippingInfo.district}
                        onChange={handleChange}
                        className={`form-control ${errors.district ? 'error' : ''}`}
                        required
                    />
                    {errors.district && <span className="error-message">{errors.district}</span>}
                </div>
                <div className="form-group third-width">
                    <input
                        type="text"
                        name="city"
                        placeholder="Thành phố"
                        value={shippingInfo.city}
                        onChange={handleChange}
                        className={`form-control ${errors.city ? 'error' : ''}`}
                        required
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    className={`form-control ${errors.address ? 'error' : ''}`}
                    required
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
                <textarea
                    name="note"
                    placeholder="Ghi chú (Tùy chọn)"
                    value={shippingInfo.note}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="button-container">
                <Link to={`/product/Cart`}>
                    <button className="btn-back">Trở lại giỏ hàng</button>

                </Link>
                <button onClick={handleConfirm} className="btn-confirm">Đặt hàng</button>
            </div>
        </div>
    );
};

export default ShippingInfo;
