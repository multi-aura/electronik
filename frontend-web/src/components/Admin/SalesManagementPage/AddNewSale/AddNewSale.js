import React, { useState } from 'react';
import './AddNewSale.css';

const AddNewSale = ({ isOpen, onClose, onSave }) => {
    const [sale, setSale] = useState({
        name: '', // Tên khuyến mãi
        discount: '',
        startDate: '',
        endDate: '',
        type: '', // Loại khuyến mãi
    });
    const [errors, setErrors] = useState({}); // Thêm trạng thái lưu lỗi

    const radioOptions = [
        { value: 'product', label: 'Giảm giá sản phẩm' },
        { value: 'invoice', label: 'Giảm giá hóa đơn' },
    ];

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale({ ...sale, [name]: value });
    };

    const handleRadioChange = (value) => {
        setSale({ ...sale, type: value });
    };

    const validateFields = () => {
        const newErrors = {};

        if (!sale.name) {
            newErrors.name = 'Vui lòng nhập tên khuyến mãi.';
        }

        if (!sale.discount || isNaN(sale.discount) || sale.discount <= 0) {
            newErrors.discount = 'Vui lòng nhập một giá trị giảm giá hợp lệ (lớn hơn 0).';
        }

        if (!sale.startDate) {
            newErrors.startDate = 'Vui lòng chọn ngày bắt đầu.';
        }

        if (!sale.endDate) {
            newErrors.endDate = 'Vui lòng chọn ngày kết thúc.';
        } else if (new Date(sale.startDate) > new Date(sale.endDate)) {
            newErrors.endDate = 'Ngày bắt đầu không thể lớn hơn ngày kết thúc.';
        }

        if (!sale.type) {
            newErrors.type = 'Vui lòng chọn loại khuyến mãi.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            // Lưu thông tin nếu hợp lệ
            onSave(sale);
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
                    <label>Tên Khuyến Mãi</label>
                    <input
                        type="text"
                        name="name"
                        value={sale.name}
                        onChange={handleChange}
                        placeholder="Sale mùa lễ hội"
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}

                    <label>Giảm Giá (%)</label>
                    <input
                        type="text"
                        name="discount"
                        value={sale.discount}
                        onChange={handleChange}
                        placeholder="50"
                    />
                    {errors.discount && <p className="error-text">{errors.discount}</p>}

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

                    {/* Radio options */}
                    <div className="radio-group">
                        <label>Loại Khuyến Mãi</label>
                        {radioOptions.map((option, index) => (
                            <label key={index} className="radio-label">
                                <input
                                    type="radio"
                                    name="type"
                                    value={option.value}
                                    checked={sale.type === option.value}
                                    onChange={() => handleRadioChange(option.value)}
                                    className="radio-input"
                                />
                                <span className="radio-custom"></span>
                                {option.label}
                            </label>
                        ))}
                        {errors.type && <p className="error-text">{errors.type}</p>}
                    </div>

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
