import React from 'react';
import './FreeShippingProgress.css';

const FreeShippingProgress = ({ subtotal, freeShippingThreshold}) => {
  // Tính phần trăm tiến trình
  console.log(subtotal);
  console.log(freeShippingThreshold);
  const progress = subtotal >= freeShippingThreshold 
    ? 100 
    : (subtotal / freeShippingThreshold) * 100;

  // Tính số tiền còn lại
  const amountLeft = subtotal >= freeShippingThreshold 
    ? 0 
    : freeShippingThreshold - subtotal;

  // Đặt màu cho thanh tiến trình
  let progressColor;
  if (progress < 34) {
    progressColor = 'red';
  } else if (progress < 67) {
    progressColor = 'yellow';
  } else {
    progressColor = 'green';
  }

  return (
    <div className="free-shipping-progress">
      <div className="progress-bar">
        <div
          className={`progress ${progressColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span
        role="img"
        aria-label="truck"
        className="truck-icon"
        style={{ left: `calc(${progress}% )` }}
      >
        🚚
      </span>
      <p className="progress-text">
        {amountLeft > 0
          ? `Chỉ còn ${amountLeft.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} để được miễn phí vận chuyển`
          : "Chúc mừng! Bạn đã được miễn phí vận chuyển"}
      </p>
    </div>
  );
};

export default FreeShippingProgress;
