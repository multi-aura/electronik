import React, { useState, useEffect } from "react";
import OrderTable from '../../../components/Admin/OrderManagement/OrderTable/OrderTable';
import OrderFilter from '../../../components/Admin/OrderManagement/OrderFilter/OrderFilter';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/OrderListPage.css';
import { fetchAllOrder, fetchUpdateStatusOrder } from '../../../services/orderService';
import SuccessModal from "../../../components/SuccessModal/SuccessModal";

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [orderToUpdate, setOrderToUpdate] = useState(null); // Lưu trữ ID và status cần cập nhật
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Fetch tất cả các đơn hàng
    const handleAllOrder = async () => {
        try {
            const response = await fetchAllOrder();
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        }
    };
    useEffect(() => {

        handleAllOrder();
    }, []);

    // Cập nhật trạng thái đơn hàng khi `orderToUpdate` thay đổi
    useEffect(() => {
        if (!orderToUpdate) return;

        const handleUpdateStatusOrder = async () => {
            try {
                const { orderId, status } = orderToUpdate;
                const response = await fetchUpdateStatusOrder(orderId, status);
                if (response.status === 200) {
                    setShowSuccessModal(true);

                    handleAllOrder();
                }
            } catch (error) {
                console.error('Failed to update order status');
            }
        };

        handleUpdateStatusOrder();
    }, [orderToUpdate]);

    const handleConfirmOrder = (orderId) => {
        setOrderToUpdate({ orderId, status: 2 });
    };

    const handleCancelOrder = (orderId) => {
        setOrderToUpdate({ orderId, status: 3 });
    };
    const handleCompleted = (orderId) => {
        setOrderToUpdate({ orderId, status: 4 });

    }

    return (
        <AdminLayout>
            <Container fluid className="order-management__container">
                <Row>
                    <Col>
                        <Card className="order-management__filter-card hover-scale">
                            <OrderFilter
                                setStatusFilter={setStatusFilter}
                                activeFilter={statusFilter}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="order-management__card hover-scale">
                            <OrderTable
                                orders={orders.filter(
                                    (order) => statusFilter === 'All' || order.status === statusFilter
                                )}
                                onConfirmOrder={handleConfirmOrder}
                                onCancelOrder={handleCancelOrder}
                                onCompleted={handleCompleted}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
            {showSuccessModal && (
                <SuccessModal
                    title="Thành công!"
                    description="Bạn đã cập nhật trạng thái đơn hàng thành công."
                    onClose={() => setShowSuccessModal(false)}
                />)


            }
        </AdminLayout>
    );
};

export default OrderListPage;
