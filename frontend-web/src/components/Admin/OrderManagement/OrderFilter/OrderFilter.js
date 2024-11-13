import React from 'react';
import './OrderFilter.css';

const OrderFilter = ({ setStatusFilter, activeFilter }) => {
    return (
        <div className="order-filter mb-3">
            <button
                onClick={() => setStatusFilter('All')}
                className={`filter-button ${activeFilter === 'All' ? 'active' : ''}`}
            >
                All
            </button>
            <button
                onClick={() => setStatusFilter('Wait for confirmation')}
                className={`filter-button ${activeFilter === 'Wait for confirmation' ? 'active' : ''}`}
            >
                Wait for confirmation
            </button>
            <button
                onClick={() => setStatusFilter('Confirmed')}
                className={`filter-button ${activeFilter === 'Confirmed' ? 'active' : ''}`}
            >
                Confirmed
            </button>
            <button
                onClick={() => setStatusFilter('Cancelled')}
                className={`filter-button ${activeFilter === 'Cancelled' ? 'active' : ''}`}
            >
                Cancelled
            </button>
            <button
                onClick={() => setStatusFilter('Done')}
                className={`filter-button ${activeFilter === 'Done' ? 'active' : ''}`}
            >
                Done
            </button>
        </div>
    );
};

export default OrderFilter;
