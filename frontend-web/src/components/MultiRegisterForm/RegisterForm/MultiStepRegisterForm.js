import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StepIndicator from './StepIndicator'; // Thanh hiển thị bước
import Step1 from './Step1'; // Bước 1: Đăng ký tài khoản
import Step2 from './Step2'; // Bước 2: Thông tin cá nhân
import { register } from '../../../services/authService'; 

function MultiStepRegisterForm() {
  const [currentStep, setCurrentStep] = useState(1); // Bước hiện tại
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    phone: '',
    birthday: '',
    nation: '',
    province: '',
    gender: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (inputName, value) => {
    setFormData({
      ...formData,
      [inputName]: value, // Cập nhật đúng từng trường trong formData
    });
  };
  

  const handleRegister = async () => {
    debugger;
    try {

      const { fullname, username, email, password, phone, birthday, nation, province, gender } = formData;
  
      const response = await register(fullname, username, email, password, phone, birthday, nation, province, gender);
      
      console.log('Đăng ký thành công:', response);
      navigate('/Home', { state: { userData: response.data } });

    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      setErrorMessage('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };
  

  return (
    <div className="multi-step-register-form">
      <StepIndicator currentStep={currentStep} /> 
      
      {currentStep === 1 && (
        <Step1 
          formData={formData} 
          onFormChange={handleFormChange} 
          onNext={handleNextStep} 
        />
      )}

      {currentStep === 2 && (
        <Step2 
        
          formData={formData} 
          onFormChange={handleFormChange} 
          onPrev={handlePrevStep} 
          onSubmit={handleRegister} 
        />
      )}

      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
      <div className="text-center mt-3">
        <span>You have an account? <a href="/login" className="form-link">Login</a></span>
      </div>
    </div>
  );
}

export default MultiStepRegisterForm;
