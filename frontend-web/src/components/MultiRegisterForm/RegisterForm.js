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

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Tên người dùng không được để trống.';
    }

    if (!formData.email) {
      newErrors.email = 'Email không được để trống.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
    }

    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại không được để trống.';
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải gồm 10-11 chữ số.';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return; // Nếu form không hợp lệ, dừng lại

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
            {errors.username && <p className="text-danger-error" >{errors.username}</p>}
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
            {errors.email && <p className="text-danger-error">{errors.email}</p>}
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
            {errors.phone && <p className="text-danger-error">{errors.phone}</p>}
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
            {errors.password && <p className="text-danger-error">{errors.password}</p>}
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
            {errors.confirmPassword && <p className="text-danger-error">{errors.confirmPassword}</p>}
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
            {errors.gender && <p className="text-danger-error">{errors.gender}</p>}
          </div>

          {errorMessage && <p className="text-danger-error text-center">{errorMessage}</p>}

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
