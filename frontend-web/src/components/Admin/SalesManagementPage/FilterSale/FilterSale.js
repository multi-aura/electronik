import React, { useState } from 'react';
import './FilterSale.css';

const FilterSale = ({ onChangeDate, onChangeStatus }) => {
    const [activeStatus, setActiveStatus] = useState('All');

    const handleStatusChange = (status) => {
        setActiveStatus(status);
        onChangeStatus(status);
    };

    return (
        <div className="container-fluid filter-sale-component p-3 rounded shadow-sm">
            <div className="row align-items-center">
                <div className="col-md-8 col-12 filter-sale-status-filters d-flex gap-3">
                    <button
                        className={`filter-sale-option ${activeStatus === 'All' ? 'filter-sale-active' : ''}`}
                        onClick={() => handleStatusChange('All')}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`filter-sale-option ${activeStatus === 'Pending' ? 'filter-sale-active' : ''}`}
                        onClick={() => handleStatusChange('Pending')}
                    >
                        Đang hoạt động
                    </button>
                    <button
                        className={`filter-sale-option ${activeStatus === 'Confirmed' ? 'filter-sale-active' : ''}`}
                        onClick={() => handleStatusChange('Confirmed')}
                    >
                        Đã hết hạn
                    </button>
                    <button
                        className={`filter-sale-option ${activeStatus === 'Canceled' ? 'filter-sale-active' : ''}`}
                        onClick={() => handleStatusChange('Canceled')}
                    >
                        Đã xóa
                    </button>
                </div>
                
                <div className="col-md-4 col-12 filter-sale-date-filter d-flex justify-content-end align-items-center">
                    <div className="filter-sale-date-select-group d-flex align-items-center gap-2">
                        <label className="filter-sale-date-label">Date:</label>
                        <select className="form-select filter-sale-date-select">
                            <option>01</option>
                            {/* Thêm các tùy chọn ngày */}
                        </select>
                        <select className="form-select filter-sale-date-select">
                            <option>01</option>
                            {/* Thêm các tùy chọn tháng */}
                        </select>
                        <select className="form-select filter-sale-date-select">
                            <option>2024</option>
                            {/* Thêm các tùy chọn năm */}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSale;
