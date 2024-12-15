import React, { useState, useEffect } from 'react';
import './ShippingInfo.css';
import { Link } from 'react-router-dom';
import { fetchAdressDistrict, fetchAdressProvince, fetchAdressWard } from '../../../services/paymentService';

const ShippingInfo = ({ onShippingInfoChange, onPlaceOrder, validateShippingInfo, errors }) => {
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        province: '',
        district: '',
        city: '',
        ward: '',
        telephone: '',
        email: '',
        note: ''
    });
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const loadProvinces = async () => {
            try {
                const dataProvince = await fetchAdressProvince();
                setProvinces(dataProvince.results);
            } catch (error) {
                console.error('Error fetching address province', error);
            }
        };
        loadProvinces();
    }, []);

    useEffect(() => {
        if (shippingInfo.province) {
            const loadDistricts = async () => {
                try {
                    const dataDistrict = await fetchAdressDistrict(shippingInfo.province);
                    setDistricts(dataDistrict.results);
                    setWards([]); // Reset wards when city changes
                } catch (error) {
                    console.error('Error fetching address district', error);
                }
            };
            loadDistricts();
        } else {
            setDistricts([]); // Reset districts if no city selected
        }
    }, [shippingInfo.province]);

    useEffect(() => {
        if (shippingInfo.district) {
            const loadWards = async () => {
                try {
                    const dataWard = await fetchAdressWard(shippingInfo.district);
                    setWards(dataWard.results);
                } catch (error) {
                    console.error('Error fetching address ward', error);
                }
            };
            loadWards();
        } else {
            setWards([]); // Reset wards if no district selected
        }
    }, [shippingInfo.district]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedInfo = { ...shippingInfo, [name]: value };
    
        if (name === 'province') {
            const selectedProvince = provinces.find(province => province.province_id === value);
            updatedInfo.provinceName = selectedProvince ? selectedProvince.province_name : '';
        } else if (name === 'district') {
            const selectedDistrict = districts.find(district => district.district_id === value);
            updatedInfo.districtName = selectedDistrict ? selectedDistrict.district_name : '';
        } else if (name === 'ward') {
            const selectedWard = wards.find(ward => ward.ward_id === value);
            updatedInfo.wardName = selectedWard ? selectedWard.ward_name : '';
        }
    
        setShippingInfo(updatedInfo);
        onShippingInfoChange(updatedInfo);
    };
    

    const handleConfirm = (e) => {
        e.preventDefault();
        if (validateShippingInfo()) {
            onPlaceOrder(); // Gọi hàm đặt hàng từ PaymentPage nếu thông tin hợp lệ
        } else {
            console.log("Thông tin không hợp lệ, vui lòng kiểm tra lại.");
        }
    };

    return (
        <div className="shipping-info">
            <h3 className="detail_cart">Địa chỉ giao hàng</h3>

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
                    <select
                        name="province"
                        value={shippingInfo.province}
                        onChange={handleChange}
                        className={`form-control ${errors.province ? 'error' : ''}`}
                        required
                    >
                        <option value="">Chọn thành phố</option>
                        {provinces.map((province) => (
                            <option key={province.province_id} value={province.province_id}>
                                {province.province_name}
                            </option>
                        ))}
                    </select>
                    {errors.province && <span className="error-message">{errors.province}</span>}
                </div>

                <div className="form-group third-width">
                    <select
                        name="district"
                        value={shippingInfo.district}
                        onChange={handleChange}
                        className={`form-control ${errors.district ? 'error' : ''}`}
                        required
                    >
                        <option value="">Chọn quận huyện</option>
                        {districts.map((district) => (
                            <option key={district.district_id} value={district.district_id}>
                                {district.district_name}
                            </option>
                        ))}
                    </select>
                    {errors.district && <span className="error-message">{errors.district}</span>}
                </div>

                <div className="form-group third-width">
                    <select
                        name="ward"
                        value={shippingInfo.ward}
                        onChange={handleChange}
                        className={`form-control ${errors.ward ? 'error' : ''}`}
                        required
                    >
                        <option value="">Chọn xã phường</option>
                        {wards.map((ward) => (
                            <option key={ward.ward_id} value={ward.ward_id}>
                                {ward.ward_name}
                            </option>
                        ))}
                    </select>
                    {errors.ward && <span className="error-message">{errors.ward}</span>}
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

          
        </div>
    );
};

export default ShippingInfo;
