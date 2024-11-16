import React from 'react';
import './OrderFilter.css';

const OrderFilter = ({ setStatusFilter, activeFilter }) => {

    return (
        <div className="order-filter mb-3">
            <button
                onClick={() => setStatusFilter('All')}
                className={`filter-button ${activeFilter === 'All' ? 'active' : ''}`}
            >
                Tất cả
            </button>
            <button
                onClick={() => setStatusFilter(1)}
                className={`filter-button ${activeFilter === 1 ? 'active' : ''}`}
            >
                Chờ xác nhận
            </button>
            <button
                onClick={() => setStatusFilter(2)}
                className={`filter-button ${activeFilter === 2 ? 'active' : ''}`}
            >
                Đã xác nhận
            </button>
            <button
                onClick={() => setStatusFilter(3)}
                className={`filter-button ${activeFilter === 3 ? 'active' : ''}`}
            >
                Đã hủy
            </button>
            <button
                onClick={() => setStatusFilter(4)}
                className={`filter-button ${activeFilter === 4 ? 'active' : ''}`}
            >
                Đã hoàn thành
            </button>
        </div>
    );
};

export default OrderFilter;
