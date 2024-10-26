import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LogoSection from '../components/LogoSection/LogoSection'; 
import RegisterForm from '../components/RegisterForm/RegisterForm'; 
import logoImage from '../assets/img/Logo.png';
import { register } from '../services/authService';
import '../assets/css/RegisterPage.css';

function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  
  // Hàm xử lý đăng ký
  const handleRegister = async (credentials) => {
    try {
      const response = await register(credentials.username, credentials.email, credentials.phone, credentials.password); 
      console.log('Đăng ký thành công:', response);
      try {
        navigate('/');
      } catch (error) {
        console.error('Lỗi điều hướng:', error);
      }

    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage('Lỗi hệ thống. Vui lòng thử lại sau.'); 
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại.');
      } else {
        setErrorMessage('Đăng ký thất bại. Vui lòng thử lại.');
      }
      console.error('Đăng ký thất bại:', error);
    }
  };
  
  return (
    <div className="container-fluid register-page d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center register-left">
          <LogoSection 
            logoImage={logoImage}
            altText="Multi Aura" 
          />
        </div>
        <div className="col-md-6 register-right">
          <RegisterForm onSubmit={handleRegister} /> {/* Form đăng ký */}
          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>} {/* Hiển thị lỗi */}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
