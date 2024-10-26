import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MulRegisterPage from '../pages/multiRegisPage';
import IntroPage from '../pages/IntroPage';
function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mulregister" element={<MulRegisterPage />} />
    </Routes>
  
  );
}

export default AppRoutes;
