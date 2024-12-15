import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";
import { fetchProductsBySearchWithQuery } from "../../services/productService";
import SuggestionItem from "../SuggestionItem/SuggestionItem";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const sliderRef = useRef(null); // Ref cho thanh trượt

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestedProducts([]);
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
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
    }
  }; const handleSelectProduct = (product) => {
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
          onFocus={() => setIsDropdownVisible(suggestedProducts.length > 0)}
        />
        <div className="input-group-text ssearch-icon-bg">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      {isDropdownVisible && (
        <div className="slider-container">
          <button className="slider-btn left" onClick={() => handleScroll("left")}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="suggestions-horizontal-container" ref={sliderRef}>
            {suggestedProducts.map((product) => (
              <SuggestionItem key={product._id} product={product}   onSelect={handleSelectProduct} />
            ))}
          </div>

          <button className="slider-btn right" onClick={() => handleScroll("right")}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
