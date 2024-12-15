import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import PaginationControls from '../PaginationControls/PaginationControls';
import './BestSellingProducts.css';
import { fetchProductNoQuery } from '../../services/productService';

const BestSellingProducts = () => {
  const defaultImage =
    'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png';

  const itemsPerPage = 6;
  const [products, setProducts] = useState([]); // Đảm bảo products luôn là mảng
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const limit = itemsPerPage;
      const response = await fetchProductNoQuery(page, limit);
      if (response?.data) {
        setProducts(response.data);
        setTotalPages(Math.ceil(response.total / itemsPerPage));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="best-selling-container p-4 bg-light rounded">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Sản phẩm bán chạy</h4>
      </div>

      {loading ? (
        <div className="text-center">Đang tải dữ liệu...</div>
      ) : (
        <>
          <div className="row">
            {products?.length > 0 ? (
              products.map((product, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                  <ProductCard product={product} defaultImage={defaultImage} />
                </div>
              ))
            ) : (
              <div className="text-center">Không có sản phẩm nào.</div>
            )}
          </div>
          {/* <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          /> */}
        </>
      )}
    </div>
  );
};

export default BestSellingProducts;
