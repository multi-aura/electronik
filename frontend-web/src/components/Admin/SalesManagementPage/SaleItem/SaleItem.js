import React from 'react';
import './SaleItem.css';

const SaleItem = ({ sale, onEditSale, onSelectProduct }) => {
    return (
        <div className="sale-item-container">
            <div className="sale-info">
                <p><strong>Mã:</strong> {sale.id}</p>
                <p><strong>{sale.description}</strong></p>
                <p><em>Giảm giá:</em> {sale.discount}%</p>
            </div>
            <div className="sale-dates">
                <p><strong>Ngày bắt đầu:</strong> {sale.startDate}</p>
                <p><strong>Ngày kết thúc:</strong> {sale.endDate}</p>
            </div>
            <div className="sale-status">
                <span className="status-indicator"><strong>Trạng thái:</strong> <strong className="active-status">{sale.status}</strong></span>
                <span className="status-type"><strong>Loại: </strong> {sale.category}</span>
            </div>
            <div className="sale-actions">
                <button className="action-button edit-button" title="Chỉnh sửa" onClick={() => onEditSale(sale)}>
                    ✏️
                </button>
                <button className="action-button delete-button" title="Xóa">
                    🗑️
                </button>
                <button
                className="action-button product-button"
                title="Chọn sản phẩm"
                onClick={() => onSelectProduct(sale)}
            >
                <i className="fas fa-cube"></i>
            </button>
            </div>
        </div>
    );
};

export default SaleItem;
