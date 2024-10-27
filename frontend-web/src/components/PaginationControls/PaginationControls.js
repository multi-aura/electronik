// src/components/PaginationControls.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-controls">
      <button
        className="btn btn-primary btn-prev"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        className="btn btn-primary btn-next"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default PaginationControls;
