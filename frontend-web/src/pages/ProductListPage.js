import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import TopFilterBar from "../components/ProductListPage/TopFilterBar/TopFilterBar";
import FilterSidebar from "../components/ProductListPage/FilterSidebar/FilterSidebar";
import ProductGrid from "../components/ProductListPage/ProductGrid/ProductGrid";
import "../assets/css/ProductListPage.css";
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import { useParams } from "react-router-dom";
import { fetchProductsByCategory, fetchProductNoQuery } from "../services/productService";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [loading, setLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const { categoryID } = useParams();
  const limit = 8;

  // Hàm tải sản phẩm, có kiểm tra categoryID để quyết định gọi API nào
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      console.log('Fetching products:', { categoryID, page, manufacturer });
      
      // Kiểm tra `categoryID` để quyết định gọi API phù hợp
      const productsData = categoryID
        ? await fetchProductsByCategory(categoryID, page, limit, manufacturer)
        : await fetchProductNoQuery(page, limit, manufacturer);
      
      if (productsData.data) {
        setProducts(prevProducts => page === 1 ? productsData.data : [...prevProducts, ...productsData.data]);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Tải lại sản phẩm khi `categoryID` hoặc `manufacturer` thay đổi
  useEffect(() => {
    fetchProducts(1);
  }, [categoryID, manufacturer]);

  // Tải thêm sản phẩm khi người dùng cuộn xuống cuối trang
  const loadMoreProducts = () => {
    if (!loading && currentPage < totalPages) {
      fetchProducts(currentPage + 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, loading, totalPages]);

  return (
    <Layout>
      <div className="container product-list-page my-3">
        <div className="row mt-4">
          <div>
            <FilterSidebar setManufacturer={setManufacturer} /> {/* Truyền `setManufacturer` để cập nhật giá trị */}
            <TopFilterBar />
          </div>

          <div>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <span>Chọn một danh mục để xem sản phẩm</span>
            )}
          </div>
        </div>

        {loading && (
          <div className="d-flex justify-content-center mt-4">
            <span>Đang tải thêm...</span>
          </div>
        )}
      </div>
      <CategoryGrid />
    </Layout>
  );
};

export default ProductListPage;
