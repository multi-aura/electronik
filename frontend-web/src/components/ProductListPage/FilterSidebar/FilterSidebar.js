// FilterBar.js
import React, { useState } from "react";
import "./FilterSidebar.css";
import { FaFilter, FaDollarSign, FaIndustry, FaMicrochip, FaMemory, FaHdd, FaQuestionCircle } from "react-icons/fa";

const FilterBar = () => {
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [price, setPrice] = useState(5000000); // Giá mặc định
  const [activeFilter, setActiveFilter] = useState(null);

  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
    setActiveFilter(null); // Đóng tất cả các bộ lọc khác khi mở bộ lọc giá
  };

  const toggleFilter = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
      setShowPriceFilter(false); // Đóng bộ lọc giá nếu đang mở
    }
  };

  return (
    <div className="filter-bar">
      <h4 className="filter-title">Chọn theo tiêu chí</h4>
      <div className="filter-options">
        <button className="filter-button">
          <FaFilter className="filter-icon" /> Bộ lọc
        </button>
        
        {/* Nút Giá */}
        <div className="filter-button" onClick={togglePriceFilter}>
          <FaDollarSign className="filter-icon" /> Giá
          {showPriceFilter && (
            <div className="price-filter-popover">
              <div className="price-slider">
                <span>0đ</span>
                <input
                  type="range"
                  min="0"
                  max="200000000"
                  step="1000000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span>{parseInt(price).toLocaleString()}đ</span>
              </div>
              <div className="price-filter-actions">
                <button className="close-button" onClick={togglePriceFilter}>Đóng</button>
                <button className="apply-button">Xem kết quả</button>
              </div>
            </div>
          )}
        </div>

        {/* Nút Ổ cứng */}
        <div className="filter-button" onClick={() => toggleFilter("storage")}>
          <FaHdd className="filter-icon" /> Ổ cứng <FaQuestionCircle className="info-icon" />
          {activeFilter === "storage" && (
            <div className="filter-dropdown">
              <button className="dropdown-item">256GB</button>
              <button className="dropdown-item">512GB</button>
              <button className="dropdown-item">1TB</button>
              <button className="dropdown-item">2TB</button>
              <button className="dropdown-item">8TB</button>
            </div>
          )}
        </div>

        {/* Nút Nhu cầu sử dụng */}
        <div className="filter-button" onClick={() => toggleFilter("usage")}>
          Nhu cầu sử dụng <FaQuestionCircle className="info-icon" />
          {activeFilter === "usage" && (
            <div className="filter-dropdown">
              <button className="dropdown-item">Học tập - Văn phòng</button>
              <button className="dropdown-item">Đồ họa - Kỹ thuật</button>
              <button className="dropdown-item">Cao cấp - Sang trọng</button>
              <button className="dropdown-item">Laptop sáng tạo nội dung</button>
              <button className="dropdown-item">Mỏng nhẹ</button>
            </div>
          )}
        </div>

        {/* Nút Dung lượng RAM */}
        <div className="filter-button" onClick={() => toggleFilter("ram")}>
          <FaMemory className="filter-icon" /> Dung lượng RAM
          {activeFilter === "ram" && (
            <div className="filter-dropdown">
              <button className="dropdown-item">4GB</button>
              <button className="dropdown-item">8GB</button>
              <button className="dropdown-item">16GB</button>
              <button className="dropdown-item">32GB</button>
            </div>
          )}
        </div>

        {/* Nút CPU */}
        <div className="filter-button" onClick={() => toggleFilter("cpu")}>
          <FaMicrochip className="filter-icon" /> CPU
          {activeFilter === "cpu" && (
            <div className="filter-dropdown">
              <button className="dropdown-item">Apple M1</button>
              <button className="dropdown-item">Apple M2</button>
              <button className="dropdown-item">Apple M3</button>
              <button className="dropdown-item">Intel i5</button>
              <button className="dropdown-item">Intel i7</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
