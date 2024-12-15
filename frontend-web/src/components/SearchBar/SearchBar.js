import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";
import { fetchProductsBySearchWithQuery } from "../../services/productService";
import SuggestionItem from "../SuggestionItem/SuggestionItem";

const SearchBar = () => {
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
      const response = await fetchProductsBySearchWithQuery(page, limit, searchTerm);
      const results = response?.data || [];
      setSuggestedProducts(results);
      setIsDropdownVisible(results.length > 0);
    }, 300); // Debounce 300ms

    return () => clearTimeout(delayDebounceFn); // Xóa timeout
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectProduct = (product) => {
    setIsDropdownVisible(false); // Ẩn dropdown
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
        <div className="suggestions-horizontal-container">
          {suggestedProducts.map((product) => (
            <SuggestionItem
              key={product._id} 
              product={product} 
              onSelect={handleSelectProduct} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
