// TopFilterBar.js
import React from "react";
import "./TopFilterBar.css";
import { FaSortAmountUpAlt, FaSortAmountDownAlt, FaPercentage, FaEye } from "react-icons/fa";

const TopFilterBar = ({ onSortChange }) => {
  return (
    
    <div className="top-filter-bar">
      <h3 className="sort-label">Sắp xếp theo</h3>
      <div className="sort-options">
        <button className="sort-button" onClick={() => onSortChange("priceAsc")}>
          <FaSortAmountUpAlt className="sort-icon" /> Giá Cao - Thấp
        </button>
        <button className="sort-button" onClick={() => onSortChange("priceDesc")}>
          <FaSortAmountDownAlt className="sort-icon" /> Giá Thấp - Cao
        </button>
        <button className="sort-button" onClick={() => onSortChange("discount")}>
          <FaPercentage className="sort-icon" /> Khuyến Mãi Hot
        </button>
        <button className="sort-button xem-nhieu" onClick={() => onSortChange("popular")}>
          <FaEye className="sort-icon" /> Xem nhiều
        </button>
      </div>
    </div>
  );
};

export default TopFilterBar;
