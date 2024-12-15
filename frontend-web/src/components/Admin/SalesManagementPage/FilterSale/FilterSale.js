import React, { useState } from 'react';
import './FilterSale.css';

const FilterSale = ({ onChangeDate = () => { }, onChangeStatus = () => { }, setIsNewSaleOpen }) => {
    // State cho trạng thái
    const [activeStatus, setActiveStatus] = useState('All');

    // State cho ngày, tháng, năm
    const [day, setDay] = useState('01');
    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2024');

    // Hàm xử lý thay đổi trạng thái
    const handleStatusChange = (status) => {
        setActiveStatus(status); // Cập nhật trạng thái trong component
        onChangeStatus(status); // Gọi callback truyền từ parent
    };

    // Hàm xử lý thay đổi ngày
    const handleDateChange = () => {
        const selectedDate = `${year}-${month}-${day}`; // Format ngày: YYYY-MM-DD
        onChangeDate(selectedDate); // Gọi callback truyền từ parent
    };

    return (
        <div className="container-fluid filter-sale-component p-3 rounded shadow-sm">
            <div className="row align-items-center">
                {/* Bộ lọc trạng thái */}
                <div className="col-md-8 col-12 filter-sale-status-filters d-flex gap-3">
                    <button
                        className={`filter-sale-option ${activeStatus === 'All' ? 'filter-sale-active' : ''}`}
                        onClick={() => handleStatusChange('All')}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`filter-sale-option ${activeStatus === 1 ? 'filter-sale-active' : ''}`}
                        onClick={() => handleStatusChange(1)}
                    >
                        Đang hoạt động
                    </button>
                    <button
                        className={`filter-sale-option ${activeStatus === 0 ? 'filter-sale-active' : ''}`}
                        onClick={() => handleStatusChange(0)}
                    >
                        Đã hết hạn
                    </button>
                    <button
                        className={`filter-sale-option ${activeStatus === -1 ? 'filter-sale-active' : ''}`}
                        onClick={() => handleStatusChange(-1)}
                    >
                        Đã xóa
                    </button>
                </div>


                {/* Bộ lọc ngày */}
                <div className="col-md-4 col-12 filter-sale-date-filter d-flex justify-content-end align-items-center">
                    <div className="filter-sale-date-select-group d-flex align-items-center gap-2">
                        <button
                            className="btn btn-success filter-sale-add-new-button"
                            onClick={() => setIsNewSaleOpen(true)}
                        >
                            + Thêm mới
                        </button>

                        {/* <label className="filter-sale-date-label">Date:</label>
                        <select
                            className="form-select filter-sale-date-select"
                            value={day}
                            onChange={(e) => {
                                setDay(e.target.value);
                                handleDateChange();
                            }}
                        >
                            {[...Array(31)].map((_, i) => (
                                <option key={i} value={String(i + 1).padStart(2, '0')}>
                                    {String(i + 1).padStart(2, '0')}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-select filter-sale-date-select"
                            value={month}
                            onChange={(e) => {
                                setMonth(e.target.value);
                                handleDateChange();
                            }}
                        >
                            {[...Array(12)].map((_, i) => (
                                <option key={i} value={String(i + 1).padStart(2, '0')}>
                                    {String(i + 1).padStart(2, '0')}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-select filter-sale-date-select"
                            value={year}
                            onChange={(e) => {
                                setYear(e.target.value);
                                handleDateChange();
                            }}
                        >
                            {[2024, 2023, 2022].map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSale;
