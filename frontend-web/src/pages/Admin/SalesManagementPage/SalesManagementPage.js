import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import SalesList from '../../../components/Admin/SalesManagementPage/SalesList/SalesList';
import '../../../assets/css/SalesManagementPage.css';
import FilterSale from '../../../components/Admin/SalesManagementPage/FilterSale/FilterSale';
import AddNewSale from '../../../components/Admin/SalesManagementPage/AddNewSale/AddNewSale';
import EditSale from '../../../components/Admin/SalesManagementPage/EditSale/EditSale';
import ProductSelection from '../../../components/Admin/SalesManagementPage/ProductSelection/ProductSelection';

const SalesManagementPage = () => {
    const [sales, setSales] = useState([
        {
            id: 'SA12312312',
            name: 'Sale mùa lễ hội',
            description: 'Sale off 50% cho các sản phẩm sữa rửa mặt',
            discount: 50,
            startDate: '2024-09-09',
            endDate: '2024-09-09',
            status: 'Active',
            category: 'giảm giá sản phẩm',
        },
        {
            id: 'SA12312312',
            name: 'Sale mùa lễ hội',
            description: 'Sale off 50% cho các sản phẩm sữa rửa mặt',
            discount: 50,
            startDate: '2024-09-09',
            endDate: '2024-09-09',
            status: 'Active',
            category: 'giảm giá sản phẩm',
        },
        {
            id: 'SA12312312',
            name: 'Sale mùa lễ hội',
            description: 'Sale off 50% cho các sản phẩm sữa rửa mặt',
            discount: 50,
            startDate: '2024-09-09',
            endDate: '2024-09-09',
            status: 'Active',
            category: 'giảm giá sản phẩm',
        },
        {
            id: 'SA12312312',
            name: 'Sale mùa lễ hội',
            description: 'Sale off 50% cho các sản phẩm sữa rửa mặt',
            discount: 50,
            startDate: '2024-09-09',
            endDate: '2024-09-09',
            status: 'Active',
            category: 'giảm giá sản phẩm',
        },
        // Thêm các sale mẫu khác nếu cần
    ]);

    const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [currentSale, setCurrentSale] = useState(null);

    const openNewSaleModal = () => {
        setIsNewSaleOpen(true);
    };

    const closeNewSaleModal = () => {
        setIsNewSaleOpen(false);
    };

    const openEditModal = (sale) => {
        setCurrentSale(sale);
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
        setCurrentSale(null);
    };

    const openProductModal = () => {
        setIsProductModalOpen(true);
    };

    const closeProductModal = () => {
        setIsProductModalOpen(false);
    };

    const handleSave = (sale) => {
        console.log('Sale saved:', sale);
        setSales([...sales, sale]);
        closeNewSaleModal();
    };

    const handleUpdateSale = (updatedSale) => {
        setSales(
            sales.map((sale) => (sale.id === updatedSale.id ? updatedSale : sale))
        );
        closeEditModal();
    };

    return (
        <AdminLayout>
            <div className="sales-management-page">
                <div className="sales-filter-bar">
                    <FilterSale />
                </div>

                <div className="sales-add-new-button-container">
                    <button className="btn btn-success filter-sale-add-new-button" onClick={openNewSaleModal}>+ Add new</button>
                </div>

                {/* Truyền hàm openEditModal và openProductModal vào SalesList */}
                <SalesList
                    sales={sales}
                    onEditSale={openEditModal}
                    onSelectProduct={openProductModal} // Thêm prop này để truyền đúng hàm
                />


                <AddNewSale isOpen={isNewSaleOpen} onClose={closeNewSaleModal} onSave={handleSave} />

                {isEditOpen && currentSale && (
                    <EditSale
                        saleData={currentSale}
                        onSave={handleUpdateSale}
                        onCancel={closeEditModal}
                    />
                )}

                {/* Modal ProductSelection */}
                {isProductModalOpen && (
                    <ProductSelection
                        products={[
                            { id: 'P1', name: 'Son Merzy V6 Blue Dream', color: 'Red', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },
                            { id: 'P2', name: 'Son Merzy V6 Blue Dream', color: 'Blue', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },
                            { id: 'P3', name: 'Son Merzy V6 Blue Dream', color: 'Green', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },
                            { id: 'P4', name: 'Son Merzy V6 Blue Dream', color: 'Green', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },
                            { id: 'P5', name: 'Son Merzy V6 Blue Dream', color: 'Green', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },
                            { id: 'P6', name: 'Son Merzy V6 Blue Dream', color: 'Green', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },
                            { id: 'P8', name: 'Son Merzy V6 Blue Dream', color: 'Green', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },
                            { id: 'P9', name: 'Son Merzy V6 Blue Dream', color: 'Green', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },
                            { id: 'P20', name: 'Son Merzy V6 Blue Dream', color: 'Green', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' },

                            { id: 'P7', name: 'Son Merzy V6 Blue Dream', color: 'Green', quantity: 123, price: 1311, image: 'https://product.hstatic.net/200000722513/product/pc_gvn_rx6600_-_3_762ba90a94904a50809a93355cd819a7_medium.png' }

                        ]}
                        isOpen={isProductModalOpen}
                        onClose={closeProductModal}
                        onApply={(selectedProducts) => {
                            console.log('Selected products:', selectedProducts);
                            closeProductModal();
                        }}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default SalesManagementPage;
