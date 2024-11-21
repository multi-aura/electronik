import React from 'react';
import './SaleItem.css';

const SaleItem = ({ sale, onEditSale, onSelectProduct, setIdDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long', // Hiển thị tên ngày trong tuần
            day: 'numeric', // Hiển thị ngày
            month: 'long', // Hiển thị tên tháng
            year: 'numeric', // Hiển thị năm
        });
    };
    const Status_sale = new Map([
        [1, { class: "active", display: "Đang hoạt động" }], // Đang hoạt động
        [0, { class: "expired", display: "Đã hết hạn" }],    // Đã hết hạn
        [-1, { class: "deleted", display: "Đã xóa" }],       // Đã xóa
    ]);
    const handleSetDeleteId = (id) => {
        setIdDelete(id);
    }

    const getStatusInfo = (status) =>
        Status_sale.get(status) || { class: "", display: "Không xác định" };

    const type_sale = new Map([
        [1, { class: "product_discounts", display: "Giảm giá sản phẩm" }],
        [2, { class: "voucher_code", display: "Mã giảm giá" }],

    ]);

    const getTypeSale = (status) =>
        type_sale.get(status) || { class: "", display: "Không xác định" };

    return (
        <div className="sale-item-container">
            <div className="sale-info">
                <p><strong>Mã: </strong>SL{sale._id}</p>
                <p><strong>Tên: </strong> {sale.saleNameVi}</p>
                <p><em>Giảm giá:</em> {sale.discountPercentage}%</p>
            </div>
            <div className="sale-dates">
                <p><strong>Ngày bắt đầu:</strong> {formatDate(sale.startDate)}</p>
                <p><strong>Ngày kết thúc:</strong> {formatDate(sale.endDate)}</p>
            </div>
            <div className="sale-status">
                <strong>Trạng thái:    <span className={`status-indicator ${getStatusInfo(sale.status_sale).class}`}>
                    {getStatusInfo(sale.status_sale).display}
                </span></strong>

                <strong>Loại: <span className={`type-indicator ${getTypeSale(sale.saletype)?.class}`}>
                    {getTypeSale(sale.saletype).display}
                </span></strong>
            </div>
            <div className="sale-actions">
                {console.log(sale.status_sale)}
                {console.log(sale.status_sale)}
                <button
                    className={`action-button edit-button ${sale.status_sale === -1 ? 'disabled-button' : ''}`}

                    title="Chỉnh sửa"
                    onClick={() => onEditSale(sale)}
                    disabled={sale.status_sale === -1 || sale.status_sale === 0}

                >
                    ✏️
                </button>
                <button
                    className={`action-button delete-button ${sale.status_sale === -1 ? 'disabled-button' : ''}`}

                    title="Xóa"
                    onClick={() => handleSetDeleteId(sale._id)}
                    disabled={sale.status_sale === -1 || sale.status_sale === 0}

                >
                    🗑️
                </button>
                <button
                    className={`action-button product-button ${sale.status_sale === -1 ? 'disabled-button' : ''}`}
                    title="Chọn sản phẩm"
                    onClick={() => onSelectProduct(sale)}
                    disabled={sale.status_sale === -1 || sale.status_sale === 0}
                >
                    <i className="fas fa-cube"></i>
                </button>

            </div>
        </div>
    );
};

export default SaleItem;
