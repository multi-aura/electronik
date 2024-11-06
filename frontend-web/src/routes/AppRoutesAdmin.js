// src/routes/AppRoutesAdmin.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import DashboardPage from '../pages/admin/DashboardPage'
import UsersPage from '../pages/admin/UsersPage'
import SettingsPage from '../pages/admin/SettingsPage'

const AppRoutesAdmin = () => {
  return (
    <Routes>
      {/* Route cho Admin với layout dùng chung */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutesAdmin
