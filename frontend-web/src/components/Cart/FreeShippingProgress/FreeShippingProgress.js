import React from 'react';
import './FreeShippingProgress.css';

const FreeShippingProgress = ({ subtotal, freeShippingThreshold }) => {
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const soTienConLai = (freeShippingThreshold - subtotal).toFixed(2);

  const layMau = (progress) => {
    if (progress < 33) return '#FF5733'; 
    if (progress < 66) return '#FFC300'; 
    return '#2ECC71';
  };

  return (
    <div className="free-shipping-progress">
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${progress}%`,
            background: `repeating-linear-gradient(45deg, ${layMau(progress)}, ${layMau(progress)} 10px, ${layMau(progress)} 20px)`,
          }}
        ></div>
      </div>
      <p className="free-shipping-text">Chỉ còn ${soTienConLai} để được miễn phí vận chuyển</p>
    </div>
  );
};

export default FreeShippingProgress;
