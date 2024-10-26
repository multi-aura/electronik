import React from 'react';
import CustomInput from '../../Input/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function Step1({ formData, onFormChange, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp không
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu và mật khẩu xác nhận không khớp');
      return;
    }

    // Chuyển sang bước 2
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Account</h2>
      
      <CustomInput 
        type="text"
        label="Username"
        value={formData.username}
        onChange={(e) => onFormChange('username', e.target.value)}
        icon={faUser}
      />
      <CustomInput 
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => onFormChange('email', e.target.value)}
        icon={faEnvelope}
      />
      <CustomInput 
        type="password"
        label="Password"
        value={formData.password}
        onChange={(e) => onFormChange('password', e.target.value)}
        icon={faLock}
      />
      <CustomInput 
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => onFormChange('confirmPassword', e.target.value)}
        icon={faLock}
      />
      <button type="submit" className="custom-button w-100">Next</button>
    </form>
  );
}

export default Step1;
