import React from 'react';

const SubMenu = () => {
  const subMenuItems = [
    'Săn Voucher Multi Aura',
    'Tin công nghệ',
    'Video',
    'Hướng dẫn thanh toán',
    'Hướng dẫn trả góp',
    'Tra cứu bảo hành',
  ];

  return (
    <div className="d-flex justify-content-center bg-light py-2">
      {subMenuItems.map((item, index) => (
        <span key={index} className="mx-3 text-dark" style={{ fontSize: '14px', cursor: 'pointer' }}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default SubMenu;
