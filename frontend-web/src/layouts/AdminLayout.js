import React from 'react'
import AppHeader from '../components/admin/AppHeader'
import AppSidebar from '../components/admin/AppSidebar'
import { Outlet } from 'react-router-dom'
import './AdminLayout.css' // Đảm bảo rằng bạn có file CSS này để áp dụng style

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AppHeader />
      <div className="admin-body">
        <AppSidebar />
        <main className="admin-content">
          <Outlet /> {/* Vùng này sẽ hiển thị nội dung của từng trang con trong admin */}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
