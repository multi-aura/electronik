import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import EMHUN from '../pages/Admin/EMHUN';
import ProductManagementPage from '../pages/Admin/ProductManagement/ProductManagement';
import ProductCreatePage from '../pages/Admin/ProductManagement/createProductPage';
import OrderManagement from '../pages/Admin/OrderListPage'
import VariantManagementPage from '../pages/Admin/ProductManagement/VariantManagementPage';
function AdminRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Emhun" element={<EMHUN />} />
        <Route path="/ProductManagement" element={<ProductManagementPage />} />
        <Route path="/ProductManagement/create" element={<ProductCreatePage />} />
        <Route path="/OrderManagement" element={<OrderManagement />} />
        <Route path="/products/:productId/variants" element={<VariantManagementPage />} />


      </Routes>
  );
}

export default AdminRoutes;
