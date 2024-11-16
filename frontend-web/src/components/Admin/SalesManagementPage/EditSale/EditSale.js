import React, { useState } from 'react';
import './EditSale.css';

const EditSale = ({ saleData, onSave, onCancel }) => {
    const [sale, setSale] = useState({ ...saleData });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale({ ...sale, [name]: value });
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateFields()) {
            onSave(sale);
        }
    };

    return (
        <div className="edit-sale-modal-overlay">
            <div className="edit-sale-modal-content">
                <h2 className="edit-sale-modal-title">Chỉnh Sửa Khuyến Mãi</h2>
                <form className="edit-sale-modal-form">
                    <div className="edit-sale-form-group">
                        <label>Tên Khuyến Mãi</label>
                        <input
                            type="text"
                            name="name"
                            value={sale.name}
                            onChange={handleChange}
                            placeholder="Tên khuyến mãi"
                        />
                        {errors.name && <p className="edit-sale-error-text">{errors.name}</p>}
                    </div>
                    <div className="edit-sale-form-group">
                        <label>Giảm Giá (%)</label>
                        <input
                            type="number"
                            name="discount"
                            value={sale.discount}
                            onChange={handleChange}
                            placeholder="Nhập phần trăm giảm giá"
                        />
                        {errors.discount && <p className="edit-sale-error-text">{errors.discount}</p>}
                    </div>
                    <div className="edit-sale-form-group">
                        <label>Ngày Bắt Đầu</label>
                        <input
                            type="date"
                            name="startDate"
                            value={sale.startDate}
                            onChange={handleChange}
                        />
                        {errors.startDate && <p className="edit-sale-error-text">{errors.startDate}</p>}
                    </div>
                    <div className="edit-sale-form-group">
                        <label>Ngày Kết Thúc</label>
                        <input
                            type="date"
                            name="endDate"
                            value={sale.endDate}
                            onChange={handleChange}
                        />
                        {errors.endDate && <p className="edit-sale-error-text">{errors.endDate}</p>}
                    </div>
                    <div className="edit-sale-form-group edit-sale-radio-group">
                        <label>Loại Khuyến Mãi</label>
                        <div className="edit-sale-radio-option">
                            <input
                                type="radio"
                                id="product-type"
                                name="type"
                                value="product"
                                checked={sale.type === 2}
                                onChange={handleChange}
                            />
                            <label htmlFor="product-type">Giảm giá sản phẩm</label>
                        </div>
                        <div className="edit-sale-radio-option">
                            <input
                                type="radio"
                                id="invoice-type"
                                name="type"
                                value="invoice"
                                checked={sale.type === 1}
                                onChange={handleChange}
                            />
                            <label htmlFor="invoice-type">Giảm giá hóa đơn</label>
                        </div>
                    </div>


                    <div className="edit-sale-modal-actions">
                        <button type="button" onClick={handleSave} className="edit-sale-apply-button">
                            Lưu
                        </button>
                        <button type="button" onClick={onCancel} className="edit-sale-cancel-button">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSale;
