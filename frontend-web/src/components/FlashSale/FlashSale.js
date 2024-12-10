import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './FlashSale.css';
import { fetchProductBySerial, fetchProductRecommend } from '../../services/productService';
import ProductCardSugges from '../Suggestedproduct/Suggestedproduct';

const FlashSale = ({ serial }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [flashSaleItems, setFlashSaleItems] = useState([]);
  const [recommendedSerials, setRecommendedSerials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // New state for handling errors

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);  // Reset error state when starting a new fetch
      try {
        if (serial) {
          const recommendedSerials = await fetchProductRecommend(serial);
          setRecommendedSerials(recommendedSerials || []);
        }
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        setError("Failed to load recommended products.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [serial]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (recommendedSerials.length > 0) {
        setLoading(true);
        try {
          const products = await fetchProductBySerial(recommendedSerials);
          setFlashSaleItems(products.data || []);
        } catch (error) {
          console.error("Error fetching products:", error);
          setError("Failed to load products.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, [recommendedSerials]);

  const totalPages = Math.ceil(flashSaleItems.length / itemsPerPage);
  const currentItems = flashSaleItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > totalPages) {
      setCurrentPage(1);
    } else if (newPage < 1) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flash-sale-container p-4 rounded position-relative">
      <div className="flash-sale-container">
        <div className="d-flex justify-content-between align-items-center ">
          <h4 className="text-light fw-bold flash-sale-title">
            <span role="img" aria-label="flash">
              ⚡
            </span>
            DEAL SỐC - GIÁ HỜI
          </h4>

          <p className="flash-sale-description">
            🚀 <strong>Chớp lấy cơ hội</strong>, săn sale ngay! 🔥
          </p>

          <button className="btn fw-bold px-4 flash_sale_product">
            Flash Sale
          </button>
        </div>
      </div>
      {loading && <div className="col-12 text-center">Đang tải sản phẩm...</div>}

      {error && <div className="col-12 text-center text-danger">{error}</div>}

      {!loading && !error && (
        <div className="row position-relative">
          {Array.isArray(flashSaleItems) && flashSaleItems.length > 0 ? (
            currentItems.map((item) => {
              const price = item.price || 0;
              const discount = item.sale?.discountPercentage || 0;
              const discountPrice = price * (1 - discount / 100);
              return (
            
                  <ProductCardSugges product={item} />
              );
            })
          ) : (
            <div className="col-12 text-center">Không có sản phẩm</div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-buttons text-center">
          <button
            className="btn btn-primary btn-prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="mx-2">
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-primary btn-next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}


    </div>
  );
};

export default FlashSale;
