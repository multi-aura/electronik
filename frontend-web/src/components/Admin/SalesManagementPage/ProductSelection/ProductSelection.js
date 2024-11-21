import React, { useState, useEffect, useRef } from 'react';
import './ProductSelection.css';
import ProductItemSale from '../ProductItemSale/ProductItemSale';
import { FaTimes } from 'react-icons/fa';
import { fetchProductALL } from '../../../../services/productService';

const ProductSelection = ({ isOpen, onClose, onApply, initialProducts, sale }) => {
    const [products, setProducts] = useState(initialProducts || []);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const productListRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!initialProducts) {
                setLoading(true);
                try {
                    const productsData = await fetchProductALL();
                    setProducts(productsData.data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (isOpen) {
            setProducts(initialProducts || []);
            fetchProducts();
        }
    }, [isOpen, initialProducts]);

    useEffect(() => {
        if (isOpen && sale && sale.products) {
            const selected = sale.products.map((saleProduct) => saleProduct.productId);
            setSelectedProducts(selected);

            const initialQuantities = {};
            sale.products.forEach((saleProduct) => {
                initialQuantities[saleProduct.productId] = saleProduct.quantitySale || 1;
            });
            setProductQuantities(initialQuantities);
        } else if (!isOpen) {
            setSelectedProducts([]);
            setProductQuantities({});
        }
    }, [isOpen, sale]);

    const handleSelectProduct = (productId) => {
        setSelectedProducts((prev) => {
            if (prev.includes(productId)) {
                const updatedQuantities = { ...productQuantities };
                delete updatedQuantities[productId];
                setProductQuantities(updatedQuantities);
                return prev.filter((id) => id !== productId);
            } else {
                setProductQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [productId]: 1,
                }));
                return [...prev, productId];
            }
        });
    };

    const handleQuantityChange = (productId, value) => {
        if (value >= 1) {
            setProductQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: value,
            }));
        }
    };
    
    
    const handleApply = () => {
        const selectedProductDetails = selectedProducts.map((productId) => ({
            productId,
            quantity: productQuantities[productId] || 1,
        }));
        onApply(selectedProductDetails); 
        onClose();
    };
    
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedProducts([]);
            setProductQuantities({});
        } else {
            const allProductIds = products.map((product) => product._id);
            setSelectedProducts(allProductIds);
            const newQuantities = {};
            allProductIds.forEach((productId) => {
                newQuantities[productId] = 1;
            });
            setProductQuantities(newQuantities);
        }
        setSelectAll(!selectAll);
    };

    const filteredProducts = products.filter((product) =>
        product.nameVi.toLowerCase().includes(searchTerm)
    );
    
    return (
        <div className="product-selection-modal-overlay">
            <div className="product-selection-modal-content">
                <div className="modal-header">
                    <h2>Product Selection</h2>
                    <button onClick={onClose} className="close-button">
                        <FaTimes />
                    </button>
                </div>

                {sale && (
                    <div className="sale-details">
                        <h3>Thông tin SALE</h3>
                        <div className="sale-details-grid">
                            <div className="sale-details-column">
                                <p><strong>Sale Name:</strong> {sale.saleNameVi}</p>
                                <p><strong>Discount:</strong> {sale.discountPercentage}%</p>
                            </div>
                            <div className="sale-details-column">
                                <p><strong>Start Date:</strong> {new Date(sale.startDate).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> {new Date(sale.endDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="product-list-header">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    />
                    <label className="select-all-checkbox">
                        <span>All</span>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                        />
                    </label>
                </div>

                <div className="product-list" ref={productListRef} style={{ overflowY: 'auto', maxHeight: '400px' }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductItemSale
                                key={product._id}
                                product={product}
                                isSelected={selectedProducts.includes(product._id)}
                                onSelect={() => handleSelectProduct(product._id)}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))
                    )}
                    {!loading && filteredProducts.length === 0 && <p>No products found</p>}
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
