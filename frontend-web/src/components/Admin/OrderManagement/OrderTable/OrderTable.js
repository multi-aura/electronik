import React, { useState } from 'react';
import './OrderTable.css';

const OrderTable = ({ orders, onConfirmOrder, onCancelOrder }) => {
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const handleDetailClick = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Order Name</th>
                    <th>Customer Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <React.Fragment key={order._id}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.recipientName}</td>
                            <td>{new Date(order.startDate).toLocaleDateString()}</td>
                            <td>{new Date(order.endDate).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={() => handleDetailClick(order._id)}
                                >
                                    Detail
                                </button>
                            </td>
                        </tr>
                        {expandedOrderId === order._id && (
                            <tr>
                                <td colSpan="7">
                                    <div className="order-details">
                                        <div className="customer-info">
                                            <p><strong>{order.recipientName}</strong></p>
                                            <p>Phone: {order.contactPhone}</p>
                                            <p>Email: {order.email}</p>
                                            <p>Address: {order.addressLine}, {order.ward}, {order.district}, {order.province}</p>
                                        </div>
                                        <div className="order-products">
                                            <h5>Products</h5>
                                            <ul>
                                                {order.details.map((product, idx) => (
                                                    <li key={idx}>
                                                        {product.nameEn} - {product.price.toLocaleString()} VND
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Confirmation and Cancellation Buttons */}
                                        {order.status === 'Wait for confirmation' && (
                                            <div className="order-actions mt-3">
                                                <button
                                                    className="btn btn-success me-2"
                                                    onClick={() => onConfirmOrder(order._id)}
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => onCancelOrder(order._id)}
                                                >
                                                    Cancel
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
    );
};

export default OrderTable;
