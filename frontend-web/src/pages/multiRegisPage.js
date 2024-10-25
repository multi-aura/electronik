import React from 'react';
import MultiStepRegisterForm from '../components/MultiRegisterForm/RegisterForm/MultiStepRegisterForm'; // Đường dẫn tới MultiStepRegisterForm
import logoImage from '../assets/img/Logo.png';
import LogoSection from '../components/LogoSection/LogoSection'; 


function RegisterPage() {
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
          
          <MultiStepRegisterForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
