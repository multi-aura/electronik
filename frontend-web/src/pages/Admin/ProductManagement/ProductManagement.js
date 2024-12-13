// ProductManagementPage.js
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import Header from '../../../components/Admin/ProductManagementPage/Header/Header';
import Filter from '../../../components/Admin/ProductManagementPage/Filter/Filter';
import PaginationControls from '../../../components/Admin/ProductManagementPage/PaginationControls/PaginationControls';
import ProductTable from '../../../components/Admin/ProductManagementPage/ProductTable/ProductTable';
import { fetchProductsBySearch,fetchProductsBySearchWithQuery } from '../../../services/productService';
import '../../../assets/css/ProductManagement.css'

const ProductManagementPage = () => {
    const [products, setProducts] = useState([]);   
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProductsBySearchWithQuery(currentPage, itemsPerPage, searchTerm);
                console.log(data.data); 
                if (data.data && data.data.length > 0) {
                    setProducts((prevProducts) => [...prevProducts, ...data.data]); 
                } else {
                    setHasMore(false); // No more products to load
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, itemsPerPage, searchTerm]);

    // Infinite scroll event handler
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 50 &&
                !isLoading &&
                hasMore
            ) {
                setCurrentPage((prevPage) => prevPage + 1); // Load next page
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, hasMore]);
    useEffect(() => {
        setProducts([]);
        setCurrentPage(1);
        setHasMore(true);
    }, [searchTerm, itemsPerPage]);
    return (
        <AdminLayout>
            <div className="container-fluid px-4 ProductManagement">
                {/* Row cho Header */}
                <div className="row mb-3">
                    <div className="col">
                        <Header />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <Filter 
                            searchTerm={searchTerm} 
                            onSearchChange={setSearchTerm} 
                        />
                    </div>
                    
                </div>

                {/* Row cho bảng sản phẩm */}
                <div className="row">
                    <div className="col">
                        <ProductTable products={products} />
                    </div>
                </div>

                {/* Row cho PaginationControls */}
                <div className="row mt-3">
                    <div className="col text-md-right">
                        {isLoading && <p>Loading...</p>}
                        {!hasMore && <p>No more products to load.</p>}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProductManagementPage;
