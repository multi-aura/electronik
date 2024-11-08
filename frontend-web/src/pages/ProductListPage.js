import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import TopFilterBar from "../components/ProductListPage/TopFilterBar/TopFilterBar";
import FilterSidebar from "../components/ProductListPage/FilterSidebar/FilterSidebar";
import ProductGrid from "../components/ProductListPage/ProductGrid/ProductGrid";
import "../assets/css/ProductListPage.css";
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Giới hạn 5 trang giả lập
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentPage <= totalPages && !loading) {
      fetchProducts();
    }
  }, [currentPage]);

  // Hàm tải thêm sản phẩm khi cuộn đến cuối trang
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        !loading &&
        currentPage < totalPages
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, currentPage, totalPages]);

  // Hàm giả lập lấy dữ liệu sản phẩm
  const fetchProducts = () => {
    setLoading(true);

    const sampleProducts = Array.from({ length: 10 }, (_, index) => ({
      id: index + currentPage * 10,
      name: `ASUS Vivobook S 14 OLED - Trang ${currentPage}`,
      specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
      oldPrice: "26.990.000",
      newPrice: "24.290.000",
      discount: 10,
      image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
      rating: 5,
      reviews: 10,
    }));

    // Cập nhật danh sách sản phẩm và dừng trạng thái tải
    setProducts((prevProducts) => [...prevProducts, ...sampleProducts]);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container product-list-page my-3">
        <div className="row mt-4">
          <div>
            <FilterSidebar />
            <TopFilterBar />
          </div>

          <div>
            <ProductGrid products={products} />
          </div>
        </div>

        {loading && (
          <div className="d-flex justify-content-center mt-4">
            <span>Đang tải thêm...</span>
          </div>
        )}
        {currentPage >= totalPages && (
          <div className="d-flex justify-content-center mt-4">
            <span>Đã tải hết sản phẩm.</span>
          </div>
        )}
      </div>
      <CategoryGrid />
    </Layout>
  );
};

export default ProductListPage;
