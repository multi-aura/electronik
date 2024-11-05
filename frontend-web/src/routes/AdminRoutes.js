import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import EMHUN from '../pages/Admin/EMHUN';
import ProductManagement from '../pages/Admin/ProductManagement';
function AdminRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Emhun" element={<EMHUN />} />
        <Route path="/ProductManagement" element={<ProductManagement />} />

      </Routes>
  );
}

export default AdminRoutes;
