import React from 'react';
import './FreeShippingProgress.css';

const FreeShippingProgress = ({ subtotal, freeShippingThreshold = 500 }) => {
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountLeft = Math.max(freeShippingThreshold - subtotal, 0);

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
          ? `Chỉ còn ${amountLeft.toFixed(2)} đ để được miễn phí vận chuyển`
          : "Chúc mừng! Bạn đã được miễn phí vận chuyển"}
      </p>
    </div>
  );
};

export default FreeShippingProgress;
