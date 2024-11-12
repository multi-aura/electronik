import React, { useState, useEffect } from 'react';
import './CategoryGrid.css';
import { fetchAllCategories } from '../../services/categoryService';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchAllCategories();

        // Check if the data property is an array
        if (Array.isArray(categoryData.data)) {
          setCategories(categoryData.data.map(cat => ({
            label: cat.category.nameVi,
            imgSrc: cat.category.image,
            link: `/category/${cat.category._id}`,
            subcategories: cat.manufacturers,
          })));
        } else {
          console.warn('Expected an array, but got:', categoryData.data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="category-grid-container p-4 rounded">
      <h4 className="category-title text-danger fw-bold">Danh mục sản phẩm</h4>
      <div className="row mt-3">
        {categories.map((category, index) => (
          <div key={index} className="col-6 col-md-3 col-lg-2 text-center mb-4">
            <a href={category.link} className="category-items">
              <img src={category.imgSrc} alt={category.label} className="category-image mb-2" />
              <p className="category-name">{category.label}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
