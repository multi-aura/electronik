import React, { useState } from 'react';
import './AddNewSale.css';

const AddNewSale = ({ isOpen, onClose, onSave }) => {
    const [sale, setSale] = useState({
        SaleNameVi: '', // Tên khuyến mãi
        discount_percentage: '',
        startDate: '',
        endDate: '',
        saletype: '', // Loại khuyến mãi
        status_sale: '1', // Mặc định trạng thái là "Đang hoạt động"
    });
    const initialSaleState = {
        SaleNameVi: '',
        discount_percentage: '',
        startDate: '',
        endDate: '',
        saletype: '',
        status_sale: '1', // Trạng thái mặc định
    };
    const [errors, setErrors] = useState({}); // Thêm trạng thái lưu lỗi

    const radioOptions = [
        { value: '1', label: 'Giảm giá sản phẩm' },
        { value: '2', label: 'Mã giảm giá' },
    ];

    if (!isOpen) return null;

    // Hàm xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale({ ...sale, [name]: value });
    };

    // Hàm xử lý thay đổi radio button
    const handleRadioChange = (value) => {
        setSale({ ...sale, saletype: value });
    };

    // Hàm xác thực dữ liệu
    const validateFields = () => {
        const newErrors = {};

        if (!sale.SaleNameVi) {
            newErrors.SaleNameVi = 'Vui lòng nhập tên khuyến mãi.';
        }

        if (!sale.discount_percentage || isNaN(sale.discount_percentage) || sale.discount_percentage <= 0) {
            newErrors.discount_percentage = 'Vui lòng nhập một giá trị giảm giá hợp lệ (lớn hơn 0).';
        }

        if (!sale.startDate) {
            newErrors.startDate = 'Vui lòng chọn ngày bắt đầu.';
        }

        if (!sale.endDate) {
            newErrors.endDate = 'Vui lòng chọn ngày kết thúc.';
        } else if (new Date(sale.startDate) > new Date(sale.endDate)) {
            newErrors.endDate = 'Ngày bắt đầu không thể lớn hơn ngày kết thúc.';
        }

        if (!sale.saletype) {
            newErrors.saletype = 'Vui lòng chọn loại khuyến mãi.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

   
    const handleSubmit = () => {
        if (validateFields()) {
            onSave(sale); 
            setSale(initialSaleState); 
            onClose(); 
        }
    };
    // Lấy ngày hôm nay để làm giá trị tối thiểu cho input date
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="add-sale-modal-overlay">
            <div className="add-sale-modal-content">
                <h2>Thêm Khuyến Mãi Mới</h2>
                <form>
                    {/* Tên Khuyến Mãi */}
                    <label>Tên Khuyến Mãi</label>
                    <input
                        type="text"
                        name="SaleNameVi"
                        value={sale.SaleNameVi}
                        onChange={handleChange}
                        placeholder="Sale mùa lễ hội"
                    />
                    {errors.SaleNameVi && <p className="error-text">{errors.SaleNameVi}</p>}

                    {/* Giảm Giá (%) */}
                    <label>Giảm Giá (%)</label>
                    <input
                        type="number"
                        name="discount_percentage"
                        value={sale.discount_percentage}
                        onChange={handleChange}
                        placeholder="50"
                    />
                    {errors.discount_percentage && <p className="error-text">{errors.discount_percentage}</p>}

                    {/* Ngày Bắt Đầu */}
                    <div className="add-sale-date-picker">
                        <label>Ngày Bắt Đầu</label>
                        <input
                            type="date"
                            name="startDate"
                            value={sale.startDate}
                            onChange={handleChange}
                            min={today} // Không cho phép chọn ngày quá khứ
                        />
                        {errors.startDate && <p className="error-text">{errors.startDate}</p>}
                    </div>

                    {/* Ngày Kết Thúc */}
                    <div className="add-sale-date-picker">
                        <label>Ngày Kết Thúc</label>
                        <input
                            type="date"
                            name="endDate"
                            value={sale.endDate}
                            onChange={handleChange}
                            min={sale.startDate || today} // Ngày kết thúc không nhỏ hơn ngày bắt đầu
                        />
                        {errors.endDate && <p className="error-text">{errors.endDate}</p>}
                    </div>

                    {/* Loại Khuyến Mãi */}
                    <div className="radio-group">
                        <label>Loại Khuyến Mãi</label>
                        {radioOptions.map((option, index) => (
                            <label key={index} className="radio-label">
                                <input
                                    type="radio"
                                    name="saletype"
                                    value={option.value}
                                    checked={sale.saletype === option.value}
                                    onChange={() => handleRadioChange(option.value)}
                                    className="radio-input"
                                />
                                <span className="radio-custom"></span>
                                {option.label}
                            </label>
                        ))}
                        {errors.saletype && <p className="error-text">{errors.saletype}</p>}
                    </div>

                    {/* Hành Động */}
                    <div className="add-sale-modal-actions">
                        <button type="button" onClick={handleSubmit} className="add-sale-apply-button">
                            Áp Dụng
                        </button>
                        <button type="button" onClick={onClose} className="add-sale-cancel-button">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewSale;
