import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { register } from '../../services/authService';

import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRegister = async () => {
   
    try {
      const response = await register(formData);
      console.log('Đăng ký thành công:', response);
      navigate('/Home', { state: { userData: response.data } });
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      setErrorMessage('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        <p className="register-subtitle">Tạo tài khoản của bạn</p>

        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
          <div className="form-group position-relative">
            <input
              type="text"
              name="username"
              className="form-control register-input"
              placeholder="Username"
              value={formData.username}
              onChange={handleFormChange}
              required
            />
            <FontAwesomeIcon icon={faUser} className="input-icon" />
          </div>

          <div className="form-group position-relative">
            <input
              type="email"
              name="email"
              className="form-control register-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          </div>

          <div className="form-group position-relative">
            <input
              type="tel"
              name="phone"
              className="form-control register-input"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleFormChange}
              required
            />
            <FontAwesomeIcon icon={faPhone} className="input-icon" />
          </div>

          <div className="form-group position-relative">
            <input
              type="password"
              name="password"
              className="form-control register-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          </div>

          <div className="form-group position-relative">
            <input
              type="password"
              name="confirmPassword"
              className="form-control register-input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleFormChange}
              required
            />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          </div>

          <div className="form-group position-relative">
            <select
              name="gender"
              className="form-control register-input"
              value={formData.gender}
              onChange={handleFormChange}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <FontAwesomeIcon icon={faVenusMars} className="input-icon" />
          </div>

          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

          <button type="submit" className="btn register-button">Đăng ký</button>
        </form>

        <div className="text-center mt-3">
          <span>Already have an account? <a href="/login" className="login-link">Login</a></span>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
