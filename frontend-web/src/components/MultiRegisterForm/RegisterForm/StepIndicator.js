import React from 'react';
import './StepIndicator.css';

function StepIndicator({ currentStep }) {
  return (
    <div className="step-indicator-container">
      <div className={`step-box step-1 ${currentStep >= 1 ? 'active' : ''}`}>
        <span>Step 1</span>
        <p>Account</p>
      </div>
      <div className={`step-box step-2 ${currentStep >= 2 ? 'active' : ''}`}>
        <span>Step 2</span>
        <p>Information</p>
      </div>
    </div>
  );
}

export default StepIndicator;
