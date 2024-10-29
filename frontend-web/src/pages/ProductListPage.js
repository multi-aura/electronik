import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import TopFilterBar from "../components/ProductListPage/TopFilterBar/TopFilterBar";
import FilterSidebar from "../components/ProductListPage/FilterSidebar/FilterSidebar";
import ProductGrid from "../components/ProductListPage/ProductGrid/ProductGrid";
import Pagination from "../components/ProductListPage/Pagination/Pagination";
import "../assets/css/ProductListPage.css";
import FlashSale from '../components/FlashSale/FlashSale';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid'
const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = () => {
    const sampleProducts = [
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      {
        id: 1,
        name: "ASUS Vivobook S 14 OLED",
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        oldPrice: "26.990.000",
        newPrice: "24.290.000",
        discount: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        rating: 5,
        reviews: 10,
      },
      // Thêm các sản phẩm mẫu khác nếu cần
    ];
    setProducts(sampleProducts);
    setTotalPages(5);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="container product-list-page my-3">

        <div className="row mt-4">
          <div>
            <FilterSidebar />
            <TopFilterBar />

          </div>

          <div >
            <ProductGrid products={products} />
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <CategoryGrid />
    </Layout>
  );
};

export default ProductListPage;
