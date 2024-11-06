// components/Admin/AdminLayout.js
import React, { useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar';
import Header from '../../components/Admin/AdminHeader/AdminHeader';
import Footer from '../../components/Footer/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import './AdminLayout.css';

function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="admin-layout d-flex">
            {isSidebarOpen && <AdminSidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />}
            <main className={`flex-grow-1 main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <Container fluid className="mt-4">
                    <Row>
                        <Col>
                            <div className="content-area">
                                {children}
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </main>
        </div>
    );
}

export default AdminLayout;
