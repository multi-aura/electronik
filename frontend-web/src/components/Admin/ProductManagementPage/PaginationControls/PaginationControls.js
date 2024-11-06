// PaginationControls.js
import React from 'react';
import PropTypes from 'prop-types';
import './PaginationControls.css';

const PaginationControls = ({ itemsPerPage, currentPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const handlePageClick = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className="pagination-container">
            <button 
                className="pagination-button" 
                onClick={() => handlePageClick(currentPage - 1)} 
                disabled={currentPage === 1}
                aria-label="Previous"
            >
                &laquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageClick(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
            <button 
                className="pagination-button" 
                onClick={() => handlePageClick(currentPage + 1)} 
                disabled={currentPage === totalPages}
                aria-label="Next"
            >
                &raquo;
            </button>
        </div>
    );
};

PaginationControls.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PaginationControls;
