import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../assets/css/IntroPage.css';

function IntroPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    
    if (authToken) {
      navigate('/home');
    }
  }, [navigate]);

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="intro-page-container" onClick={handleStart}>
      <div className="intro-content">
        <h1>Multi Aura</h1>
        <p>Start Joining Us</p>
      </div>
    </div>
  );
}

export default IntroPage;
