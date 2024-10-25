import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import CustomInput from '../Input/CustomInput'; // Giữ nguyên component CustomInput từ login
import { validateEmail } from '../../utils/validation'; // Hàm validateEmail
import './RegisterForm.css';

function RegisterForm({ handleRegister }) {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [nation, setNation] = useState('');
  const [province, setProvince] = useState('');
  const [gender, setGender] = useState('Male');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorFullname, setErrorFullname] = useState('');
  const [errorBirthday, setErrorBirthday] = useState('');



  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu và mật khẩu xác nhận không khớp.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Email không hợp lệ.');
      return;
    }

    handleRegister({ fullname, username, email, phone, password, birthday, nation, province, gender });
  };

  return (
    <form onSubmit={onSubmit} className="custom-register-form">
      <h2 className="form-title text-center mb-4">Register</h2>

      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
      {errorFullname && <p className="text-danger text-center">{errorFullname}</p>}
      {errorBirthday && <p className="text-danger text-center">{errorBirthday}</p>}

      <CustomInput
        type="text"
        label="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        icon="user"
      />
      <CustomInput
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        icon="user"
      />
      <CustomInput
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon="envelope"
      />
      <CustomInput
        type="text"
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        icon="phone"
      />
      <CustomInput
        type="date"
        label="Birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        icon="calendar-alt"
      />
      <CustomInput
        type="text"
        label="Nation"
        value={nation}
        onChange={(e) => setNation(e.target.value)}
        icon="globe"
      />
      <CustomInput
        type="text"
        label="Province"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        icon="map-marker-alt"
      />

      <div className="form-group mb-3">
        <label>Gender</label>
        <div className="d-flex">
          <div className="form-check me-3">
            <input
              type="radio"
              value="Male"
              name="gender"
              checked={gender === 'Male'}
              onChange={() => setGender('Male')}
            />
            <label>Male</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              value="Female"
              name="gender"
              checked={gender === 'Female'}
              onChange={() => setGender('Female')}
            />
            <label>Female</label>
          </div>
        </div>
      </div>

      <CustomInput
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="lock"
      />
      <CustomInput
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon="lock"
      />


      <button type="submit" className="custom-button w-100">Register</button>
    </form>
  );
}

export default RegisterForm;
