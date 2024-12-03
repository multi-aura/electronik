import React, { useState } from 'react';
import './EditSale.css';

const EditSale = ({ saleData, onSave, onCancel }) => {
    const [sale, setSale] = useState({ ...saleData }); // Sao chép dữ liệu ban đầu
    const [errors, setErrors] = useState({}); // Trạng thái lưu lỗi

    // Hàm xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale({ ...sale, [name]: value });
    };
    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm số 0 nếu cần
        const day = String(date.getDate()).padStart(2, '0'); // Thêm số 0 nếu cần
        return `${year}-${month}-${day}`;
    };

    // Hàm xác thực dữ liệu
    const validateFields = () => {
        const newErrors = {};

        if (!sale.saleNameVi) {
            newErrors.saleNameVi = 'Vui lòng nhập tên khuyến mãi.';
        }

        if (!sale.discountPercentage || isNaN(sale.discountPercentage) || sale.discountPercentage <= 0) {
            newErrors.discountPercentage = 'Vui lòng nhập một giá trị giảm giá hợp lệ (lớn hơn 0).';
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

    // Hàm xử lý khi lưu
    const handleSave = () => {
        if (validateFields()) {
          
            onSave(sale); // Gửi dữ liệu đã chỉnh sửa về component cha
        }
    };
    

    return (
        <div className="edit-sale-modal-overlay">
            <div className="edit-sale-modal-content">
                <h2 className="edit-sale-modal-title">Chỉnh Sửa Khuyến Mãi</h2>
                <form className="edit-sale-modal-form">
                    {/* Tên Khuyến Mãi */}
                    <div className="edit-sale-form-group">
                        <label>Tên Khuyến Mãi</label>
                        <input
                            type="text"
                            name="saleNameVi"
                            value={sale.saleNameVi}
                            onChange={handleChange}
                            placeholder="Tên khuyến mãi"
                        />
                        {errors.saleNameVi && <p className="edit-sale-error-text">{errors.saleNameVi}</p>}
                    </div>

                    {/* Giảm Giá (%) */}
                    <div className="edit-sale-form-group">
                        <label>Giảm Giá (%)</label>
                        <input
                            type="number"
                            name="discountPercentage"
                            value={sale.discountPercentage}
                            onChange={handleChange}
                            placeholder="Nhập phần trăm giảm giá"
                        />
                        {errors.discountPercentage && (
                            <p className="edit-sale-error-text">{errors.discountPercentage}</p>
                        )}
                    </div>

                    {/* Ngày Bắt Đầu */}
                    <div className="edit-sale-form-group">
                        <label>Ngày Bắt Đầu</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formatDateForInput(sale.startDate)}
                            onChange={handleChange}
                        />
                        {errors.startDate && <p className="edit-sale-error-text">{errors.startDate}</p>}
                    </div>

                    <div className="edit-sale-form-group">
                        <label>Ngày Kết Thúc</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formatDateForInput(sale.endDate)}
                            onChange={handleChange}
                        />
                        {errors.endDate && <p className="edit-sale-error-text">{errors.endDate}</p>}
                    </div>

                    {/* Loại Khuyến Mãi */}
                    <div className="edit-sale-form-group edit-sale-radio-group">
                        <label>Loại Khuyến Mãi</label>
                        <div className="edit-sale-radio-option">
                            <input
                                type="radio"
                                id="product-type"
                                name="saletype"
                                value="1"
                                checked={sale.saletype === 1 || sale.saletype === "1"}
                                onChange={(e) => setSale({ ...sale, saletype: Number(e.target.value) })}
                            />
                            <label htmlFor="product-type">Giảm giá sản phẩm</label>
                        </div>
                        <div className="edit-sale-radio-option">
                            <input
                                type="radio"
                                id="invoice-type"
                                name="saletype"
                                value="2"
                                checked={sale.saletype === 2 || sale.saletype === "2"}
                                onChange={(e) => setSale({ ...sale, saletype: Number(e.target.value) })}
                            />
                            <label htmlFor="invoice-type">Mã giảm giá</label>
                        </div>
                        {errors.saletype && <p className="edit-sale-error-text">{errors.saletype}</p>}
                    </div>

                    {/* Nút hành động */}
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
