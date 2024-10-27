import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MulRegisterPage from '../pages/multiRegisPage';
import IntroPage from '../pages/IntroPage';
import Home from '../pages/Homepage';
import ProductDetail from '../pages/productDetail'; // Cập nhật đường dẫn
function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/12" element={<IntroPage />} />
        <Route path="*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mulregister" element={<MulRegisterPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
    </Routes>
  
  );
}

export default AppRoutes;
