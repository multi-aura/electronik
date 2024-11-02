import React from 'react';

const VoucherList = ({ onApplyVoucher }) => {
  const vouchers = [
    { id: 1, code: 'SAVE10', description: 'Giảm 10% cho đơn hàng từ 500.000đ', discount: 0.1 },
    { id: 2, code: 'SAVE20', description: 'Giảm 20% cho đơn hàng từ 1.000.000đ', discount: 0.2 },
  ];

  return (
    <div className="voucher-list mb-3">
      {vouchers.map((voucher) => (
        <div key={voucher.id} className="voucher-item d-flex justify-content-between align-items-center p-2 mb-2" style={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f8f8' }}>
          <div>
            <div className="fw-bold">{voucher.description}</div>
            <div>Mã: <span className="text-dark">{voucher.code}</span></div>
          </div>
          <button
            className="btn btn-outline-dark"
            onClick={() => onApplyVoucher(voucher.code, voucher.discount)}
          >
            Áp dụng
          </button>
        </div>
      ))}
    </div>
  );
};

export default VoucherList;
