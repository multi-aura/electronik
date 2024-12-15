import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import EMHUN from '../pages/Admin/EMHUN';
import ProductManagementPage from '../pages/Admin/ProductManagement/ProductManagement';
import ProductCreatePage from '../pages/Admin/ProductManagement/createProductPage';
import OrderManagement from '../pages/Admin/orderManagement/OrderListPage'
import VariantManagementPage from '../pages/Admin/ProductManagement/VariantManagementPage';
import SalesManagementPage from '../pages/Admin/SalesManagementPage/SalesManagementPage';
import ProductEditPage from '../pages/Admin/ProductManagement/ProductEditPage';
import VariantCreatePage from '../pages/Admin/ProductManagement/VariantCreatePage';
function AdminRoutes() {
  return (
      <Routes>
        <Route path="/" element={<EMHUN />} />
        <Route path="/Emhun" element={<EMHUN />} />
        <Route path="/ProductManagement" element={<ProductManagementPage />} />
        <Route path="/SaleManagement" element={<SalesManagementPage />} />
        <Route path="/ProductManagement/create" element={<ProductCreatePage />} />
        <Route path="/OrderManagement" element={<OrderManagement />} />
        <Route path="/products/:productId/variants" element={<VariantManagementPage />} />
        <Route path="/products/:productId/edit" element={<ProductEditPage />} />
        <Route path="/products/:productId/variants/create" element={<VariantCreatePage />} />

      </Routes>
  );
}

export default AdminRoutes;
