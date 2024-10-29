// ProductGrid.js
import React from "react";
import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCardListpage";
const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
