import React, { useState } from 'react';
import './ProductSelection.css';
import ProductItemSale from '../ProductItemSale/ProductItemSale';
import { FaTimes } from 'react-icons/fa';
const ProductSelection = ({ products, isOpen, onClose, onApply }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const handleSelectProduct = (productId) => {
        setSelectedProducts((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId);
            }
            return [...prev, productId];
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(products.map((product) => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
    );

    const handleApply = () => {
        onApply(selectedProducts);
        onClose();
    };

    return (
        <div className="product-selection-modal-overlay">
            <div className="product-selection-modal-content">
                <div className="modal-header">
                    <h2>Product Selection</h2>
                    <button onClick={onClose} className="close-button">
                        <FaTimes /> {/* Biểu tượng đóng */}
                    </button>
                </div>
                <div className="modal-info">
                    <p><strong>ID:</strong> SA12312312</p>
                    <p><strong>Description:</strong> Sale off 50% cho các sản phẩm sữa rửa mặt</p>
                    <p><strong>Start date:</strong> 00:00 09/09/2024</p>
                    <p><strong>End date:</strong> 23:59 09/09/2024</p>
                </div>

                <div className="product-list-header">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <label className="select-all-checkbox">
                        <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedProducts.length === products.length}
                        />
                        Select All
                    </label>
                </div>

                <div className="product-list">
                    {filteredProducts.map((product) => (
                        <ProductItemSale
                            key={product.id}
                            product={product}
                            isSelected={selectedProducts.includes(product.id)}
                            onSelect={() => handleSelectProduct(product.id)}
                        />
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="apply-button" onClick={handleApply}>Áp dụng</button>
                    <button className="cancel-button" onClick={onClose}>Hủy</button>
                </div>

            </div>
        </div>
    );
};

export default ProductSelection;
