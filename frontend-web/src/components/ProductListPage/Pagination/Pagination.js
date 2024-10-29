// Pagination.js
import React from "react";
import "./Pagination.css";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      pages.push(...Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1));
      pages.push("...", totalPages);
    } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      pages.push(1, "...");
      pages.push(...Array.from({ length: maxVisiblePages - 1 }, (_, i) => totalPages - (maxVisiblePages - 2) + i));
    } else {
      pages.push(1, "...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...", totalPages);
    }

    return pages;
  };

  const handlePageClick = (number) => {
    if (typeof number === "number") {
      onPageChange(number);
    }
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <FaAngleDoubleLeft />
      </button>
      {getPageNumbers().map((number, index) => (
        <button
          key={index}
          className={`page-btn ${number === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick(number)}
          disabled={number === "..."}
        >
          {number}
        </button>
      ))}
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
