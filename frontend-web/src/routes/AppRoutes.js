import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MulRegisterPage from '../pages/multiRegisPage';
import IntroPage from '../pages/IntroPage';
import Home from '../pages/Homepage';
function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/12" element={<IntroPage />} />
        <Route path="*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mulregister" element={<MulRegisterPage />} />
    </Routes>
  
  );
}

export default AppRoutes;
