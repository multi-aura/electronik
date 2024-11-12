import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import TopFilterBar from "../components/ProductListPage/TopFilterBar/TopFilterBar";
import FilterSidebar from "../components/ProductListPage/FilterSidebar/FilterSidebar";
import ProductGrid from "../components/ProductListPage/ProductGrid/ProductGrid";
import "../assets/css/ProductListPage.css";
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../services/productService";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [loading, setLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState(""); // Thêm state để lưu manufacturer
  const { categoryID } = useParams();
  const limit = 8; // Giới hạn số sản phẩm mỗi trang

  const listProductByCategoryID = async (page) => {
    if (!categoryID) return;

    setLoading(true);
    try {
      console.log('Fetching products for category ID:', categoryID, 'Page:', page, 'Manufacturer:', manufacturer);
      const productsData = await fetchProductsByCategory(categoryID, page, limit, manufacturer);
      
      if (productsData.data) {
        setProducts(prevProducts => page === 1 ? productsData.data : [...prevProducts, ...productsData.data]);
        setCurrentPage(page); // Cập nhật trang hiện tại
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryID) {
      listProductByCategoryID(1); // Tải dữ liệu trang đầu tiên khi `categoryID` thay đổi
    }
  }, [categoryID, manufacturer]); // Thêm `manufacturer` vào mảng phụ thuộc nếu cần lọc sản phẩm theo manufacturer

  const loadMoreProducts = () => {
    if (!loading && currentPage < totalPages) {
      listProductByCategoryID(currentPage + 1); // Tải trang tiếp theo
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 // Giảm khoảng cách để kích hoạt sớm hơn
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
            {/* Hiển thị sản phẩm nếu có `categoryID` */}
            {categoryID ? (
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
