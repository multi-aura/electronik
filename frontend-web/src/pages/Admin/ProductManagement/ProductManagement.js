// ProductManagementPage.js
import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import Header from '../../../components/Admin/ProductManagementPage/Header/Header';
import Filter from '../../../components/Admin/ProductManagementPage/Filter/Filter';
import PaginationControls from '../../../components/Admin/ProductManagementPage/PaginationControls/PaginationControls';
import ProductTable from '../../../components/Admin/ProductManagementPage/ProductTable/ProductTable';
import '../../../assets/css/ProductManagement.css'

const ProductManagementPage = () => {
    const [products, setProducts] = useState([
        { id: 1, productCode: '71309005', productName: 'Bàn ăn gỗ Theresa', imageUrl: 'https://product.hstatic.net/200000722513/product/lp040w_124541e5ca0947f78a7483bc988e44b4_medium.gif', quantity: 40, status: 'Còn hàng', price: '5.600.000 đ', category: 'Bàn ăn' },
        { id: 2, productCode: '61304003', productName: 'Bàn ăn Reno mặt đá', imageUrl: 'https://product.hstatic.net/200000722513/product/lp040w_124541e5ca0947f78a7483bc988e44b4_medium.gif', quantity: 70, status: 'Còn hàng', price: '24.200.000 đ', category: 'Bàn ăn' },
        { id: 3, productCode: '61304003', productName: 'Bàn ăn Reno mặt đá', imageUrl: 'https://product.hstatic.net/200000722513/product/lp040w_124541e5ca0947f78a7483bc988e44b4_medium.gif', quantity: 70, status: 'Còn hàng', price: '24.200.000 đ', category: 'Bàn ăn' },
        { id: 4, productCode: '61304003', productName: 'Bàn ăn Reno mặt đá', imageUrl: 'https://product.hstatic.net/200000722513/product/lp040w_124541e5ca0947f78a7483bc988e44b4_medium.gif', quantity: 70, status: 'Còn hàng', price: '24.200.000 đ', category: 'Bàn ăn' },
        { id: 5, productCode: '61304003', productName: 'Bàn ăn Reno mặt đá', imageUrl: 'https://product.hstatic.net/200000722513/product/lp040w_124541e5ca0947f78a7483bc988e44b4_medium.gif', quantity: 70, status: 'Còn hàng', price: '24.200.000 đ', category: 'Bàn ăn' },


    ]);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

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
                        <Filter />
                    </div>
                    
                </div>

                {/* Row cho bảng sản phẩm */}
                <div className="row">
                    <div className="col">
                        <ProductTable products={currentProducts} />
                    </div>
                </div>

                {/* Row cho PaginationControls */}
                <div className="row mt-3">
                    <div className="col text-md-right">
                        <PaginationControls
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            totalItems={products.length}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProductManagementPage;
