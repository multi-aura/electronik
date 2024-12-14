import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";
import { fetchProductsBySearchWithQuery } from "../../services/productService";

const SearchBar = ({ fetchProducts }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [suggestedProducts, setSuggestedProducts] = useState([]); // Danh sách gợi ý sản phẩm
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Hiển thị dropdown

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestedProducts([]); // Xóa danh sách nếu từ khóa trống
      setIsDropdownVisible(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const page = 1;
      const limit = 10;
      const results = await fetchProductsBySearchWithQuery(page, limit, searchTerm);
      console.log(results);
      setSuggestedProducts(results);
      setIsDropdownVisible(results.length > 0);
    }, 300); // Debounce 300ms

    return () => clearTimeout(delayDebounceFn); // Xóa timeout
  }, [searchTerm, fetchProducts]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectProduct = (product) => {
    console.log("Selected product:", product);
    setIsDropdownVisible(false);
  };

  return (
    <div className="search-bar-container">
      <div className="input-group">
        <input
          type="text"
          className="form-control search-input-field"
          placeholder="Nhập tên sản phẩm cần tìm"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownVisible(suggestedProducts.length > 0)} // Hiển thị dropdown khi focus
        />
        <div className="input-group-text ssearch-icon-bg">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      {isDropdownVisible && (
        <div className="suggestions-dropdown">
          {suggestedProducts.map((product) => (
            <div
              key={product.id}
              className="suggestion-item"
              onClick={() => handleSelectProduct(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="product-price">
                  {product.salePrice.toLocaleString("vi-VN")}đ
                </span>
                <span className="product-original-price">
                  {product.originalPrice.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
