// App.js
import React from 'react';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';
import AdminDashboard from '../../components/Admin/Dashboard/Dashboard';

const Dashboard = () => {
    return (
        <AdminLayout>
           <AdminDashboard/>
        </AdminLayout>
    );
};

export default Dashboard;
