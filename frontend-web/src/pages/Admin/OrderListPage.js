import React, { useState, useEffect } from 'react';
import OrderTable from '../../components/Admin/OrderManagement/OrderTable/OrderTable';
import OrderFilter from '../../components/Admin/OrderManagement/OrderFilter/OrderFilter';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';

const OrderListPage = () => {
    const [orders, setOrders] = useState([
        {
            _id: '1',
            name: 'Order #001',
            recipientName: 'Trần Thị Trúc',
            contactPhone: '0356171716',
            email: 'Tructran@gmail.com',
            addressLine: '22 Đinh Tiên Hoàng',
            ward: 'Phường 1',
            district: 'Quận 1',
            province: 'TP HCM',
            status: 'Wait for confirmation',
            startDate: '2024-05-22',
            endDate: '2024-05-23',
            details: [
                { nameEn: 'Laptop Dell XPS 15', price: 25000000, quantity: 1 },
                { nameEn: 'Mouse Logitech MX', price: 1500000, quantity: 2 }
            ]
        },
        {
            _id: '2',
            name: 'Order #002',
            recipientName: 'Hà Trọng Thắng',
            contactPhone: '0912345678',
            email: 'Thangha@gmail.com',
            addressLine: '123 Phan Văn Trị',
            ward: 'Phường 2',
            district: 'Quận Gò Vấp',
            province: 'TP HCM',
            status: 'Confirmed',
            startDate: '2024-06-01',
            endDate: '2024-06-02',
            details: [
                { nameEn: 'Laptop HP Pavilion', price: 20000000, quantity: 1 }
            ]
        },
        {
            _id: '3',
            name: 'Order #003',
            recipientName: 'Nguyễn Văn B',
            contactPhone: '0987654321',
            email: 'Nguyenb@gmail.com',
            addressLine: '45 Võ Thị Sáu',
            ward: 'Phường 6',
            district: 'Quận 3',
            province: 'TP HCM',
            status: 'Cancelled',
            startDate: '2024-07-10',
            endDate: '2024-07-11',
            details: [
                { nameEn: 'Headphone Sony WH-1000XM4', price: 5000000, quantity: 1 }
            ]
        }
    ]);
    const [statusFilter, setStatusFilter] = useState('All');

    // Function to handle order confirmation
    const handleConfirmOrder = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: 'Confirmed' } : order
            )
        );
    };

    // Function to handle order cancellation
    const handleCancelOrder = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: 'Cancelled' } : order
            )
        );
    };

    return (
        <AdminLayout>
            <div className="order-list-page container">
                <h1>Order Management</h1>
                <OrderFilter setStatusFilter={setStatusFilter} />
                <OrderTable
                    orders={orders.filter(
                        (order) => statusFilter === 'All' || order.status === statusFilter
                    )}
                    onConfirmOrder={handleConfirmOrder}
                    onCancelOrder={handleCancelOrder}
                />
            </div>
        </AdminLayout>
    );
};

export default OrderListPage;
