import React from 'react';

const SaleInfo = ({ sale }) => {
    if (!sale) return null;
    return (
        <div className="sale-info">
            <h3>Thông tin khuyến mãi</h3>
            <p><strong>Tên khuyến mãi:</strong> {sale.saleNameVi} / {sale.saleNameEn}</p>
            <p><strong>Phần trăm giảm:</strong> {sale.discountPercentage}%</p>
            <p><strong>Thời gian:</strong> {new Date(sale.startDate).toLocaleDateString()} - {new Date(sale.endDate).toLocaleDateString()}</p>
        </div>
    );
};

export default SaleInfo;
    