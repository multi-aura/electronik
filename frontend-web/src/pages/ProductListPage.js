import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import TopFilterBar from "../components/ProductListPage/TopFilterBar/TopFilterBar";
import FilterSidebar from "../components/ProductListPage/FilterSidebar/FilterSidebar";
import ProductGrid from "../components/ProductListPage/ProductGrid/ProductGrid";
import "../assets/css/ProductListPage.css";
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import { fetchAllCategories } from '../services/categoryService';
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../services/productService";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { categoryID } = useParams();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchAllCategories();
        if (Array.isArray(categoryData.data)) {
          setCategories(categoryData.data.map(cat => ({
            label: cat.category.nameVi,
            imgSrc: cat.category.image,
            link: `/category/${cat.category._id}`,
            subcategories: cat.manufacturers,
          })));
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const listProductByCategoryID = async () => {
      try {
        console.log('Fetching products for category ID:', categoryID); 
        const productsData = await fetchProductsByCategory(categoryID);
        setProducts(productsData.data); // Giả sử `productsData.data` chứa danh sách sản phẩm
        setLoading(false);
      } catch (error) {
        console.error('Error loading list product by categoryID:', error);
        setLoading(false);
      }
    };

    if (categoryID) {
      listProductByCategoryID();
    }
  }, [categoryID]);
  return (
    <Layout>
      <div className="container product-list-page my-3">
        <div className="row mt-4">
          <div>
            <FilterSidebar />
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
      <CategoryGrid categories={categories} />
    </Layout>
  );
};

export default ProductListPage;
