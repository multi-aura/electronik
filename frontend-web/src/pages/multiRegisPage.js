import React from 'react';
import RegisterForm from '../components/MultiRegisterForm/RegisterForm';
import logoImage from '../assets/img/Logo.png';
import LogoSection from '../components/LogoSection/LogoSection'; 
import '../assets/css/multiRegisPage.css';


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
          
          < RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
