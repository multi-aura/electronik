import React, { useState } from 'react';
import './OrderTable.css';

const OrderTable = ({ orders, onConfirmOrder, onCancelOrder }) => {
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const handleDetailClick = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    // Hàm để lấy lớp CSS theo trạng thái thanh toán
    const statusMapping = {
        1: { class: "status-pending", display: "Chờ xác nhận" },
        2: { class: "status-confirmed", display: "Đã xác nhận" },
        3: { class: "status-cancelled", display: "Đã hủy" },
        4: { class: "status-completed", display: "Đã hoàn thành" },
    };

    const paymentStatusMapping = {
        'payment-pending': { class: "payment-pending", display: "Chưa thanh toán" },
        'payment-success': { class: "payment-success", display: "Đã thanh toán" },
    };
    const getStatusInfo = (status) => statusMapping[status] || { class: "", display: "Không xác định" };
    const getPaymentStatusInfo = (paymentStatus) => paymentStatusMapping[paymentStatus] || { class: "", display: "" };


    return (
        <div className="unique-order-table-wrapper">
            <table className="unique-order-table table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên Khách Hàng</th>
                        <th>Ngày Đặt Hàng</th>
                        <th>Tổng Tiền (VND)</th>
                        <th>Trạng Thái ĐH</th>
                        <th>Số Lượng SP</th>
                        <th>Thanh Toán</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <React.Fragment key={order._id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{order.recipientName}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.total.toLocaleString()}</td>
                                <td>
                                    <span className={`status-badge ${getStatusInfo(order.status).class}`}>
                                        {getStatusInfo(order.status).display}
                                    </span>
                                </td>
                                <td>{order.details.length}</td>
                                <td>
                                    <span className={`payment-status ${getPaymentStatusInfo(order.paymentStatus).class}`}>
                                        <span className="dot"></span>
                                        {getPaymentStatusInfo(order.paymentStatus).display}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="unique-order-button btn btn-outline-success"
                                        onClick={() => handleDetailClick(order._id)}
                                    >
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                            {expandedOrderId === order._id && (
                                <tr>
                                    <td colSpan="8">
                                        <div className="unique-order-details">
                                            <div className="unique-customer-info">
                                                <h5>Thông Tin Khách Hàng</h5>
                                                <p><strong>Họ Tên:</strong> {order.recipientName}</p>
                                                <p><strong>Điện Thoại:</strong> {order.contactPhone}</p>
                                                <p><strong>Email:</strong> {order.email}</p>
                                                <p><strong>Địa Chỉ:</strong> {order.addressLine}, {order.ward}, {order.district}, {order.province}</p>
                                            </div>
                                            <div className="unique-order-products">
                                                <h5>Danh Sách Sản Phẩm</h5>
                                                <ul>
                                                    {order.details.map((product, idx) => (
                                                        <li key={idx} className="order-product-item">
                                                            <div className="order-product-info">
                                                                <img src={product.image} alt={product.nameVi} className="order-product-image" />
                                                                <div className="order-product-details">
                                                                    <span className="order-product-name">{product.nameVi}</span>
                                                                    <span className="order-product-color">Màu: {product.color}</span>
                                                                </div>
                                                            </div>
                                                            <span className="order-product-quantity">Số lượng: {product.quantity}</span>
                                                            <span className="order-product-price">Giá: {product.price.toLocaleString()} VND</span>
                                                            <span className="order-product-total">Tổng: {product.total.toLocaleString()} VND</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="total-amount">
                                                    <span>Tổng tiền: </span>
                                                    <span className="total-amount-value">{order.total.toLocaleString()} VND</span>
                                                </div>
                                            </div>
                                            {order.status === 1 && (
                                                <div className="unique-order-actions">
                                                    <button
                                                        className="btn btn-confirm"
                                                        onClick={() => onConfirmOrder(order._id)}
                                                    >
                                                        Xác Nhận
                                                    </button>
                                                    <button
                                                        className="btn btn-cancel"
                                                        onClick={() => onCancelOrder(order._id)}
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}


                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default OrderTable;
