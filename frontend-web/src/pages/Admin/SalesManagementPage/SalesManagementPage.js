import React, { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import SalesList from '../../../components/Admin/SalesManagementPage/SalesList/SalesList';
import '../../../assets/css/SalesManagementPage.css';
import FilterSale from '../../../components/Admin/SalesManagementPage/FilterSale/FilterSale';
import AddNewSale from '../../../components/Admin/SalesManagementPage/AddNewSale/AddNewSale';
import EditSale from '../../../components/Admin/SalesManagementPage/EditSale/EditSale';
import ProductSelection from '../../../components/Admin/SalesManagementPage/ProductSelection/ProductSelection';
import { AddProductSale, DeleteSale, fetchAllSale, GetSaleByID, SaveSale, UpdateSale } from '../../../services/saleService';

const SalesManagementPage = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [currentSale, setCurrentSale] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState(null);
    const [IdEditSale, setIdEditSale] = useState(null);
    const [IdSale, setIdSale] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);

    const initialSaleState = {
        SaleNameVi: '',
        discount_percentage: '',
        startDate: '',
        endDate: '',
        saletype: '',
        status_sale: '1',
    };

    const openEditModal = (sale) => {
        setIdEditSale(sale._id);
        setCurrentSale(sale);
        setIsEditOpen(true);
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchAllSale();
            setSales(response.data);
        } catch (error) {
            console.error("Error fetching sales:", error);
            setError("Có lỗi khi lấy dữ liệu");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSave = async (sale) => {
        const saleNew = {
            discountPercentage: Number(sale.discount_percentage),
            SaleNameVi: sale.SaleNameVi,
            status_sale: Number(sale.status_sale),
            saletype: Number(sale.saletype),
            startDate: new Date(sale.startDate).toISOString(),
            endDate: new Date(sale.endDate).toISOString(),
        };
        try {
            await SaveSale(saleNew);
            fetchData();
            alert("Đã thêm sale thành công");
            setIsNewSaleOpen(false);
        } catch (error) {
            console.error("Error saving sale:", error);
        }
    };

    const handleUpdateSale = async (updatedSale) => {
        const saleNew = {
            _id: IdEditSale,
            discountPercentage: Number(updatedSale.discountPercentage),
            saleNameVi: updatedSale.saleNameVi,
            status_sale: Number(updatedSale.status_sale),
            saletype: Number(updatedSale.saletype),
            startDate: new Date(updatedSale.startDate).toISOString(),
            endDate: new Date(updatedSale.endDate).toISOString(),
        };
        try {
            await UpdateSale(saleNew);
            fetchData();
            alert("Đã cập nhật sale thành công");
            setIsEditOpen(false);
            setCurrentSale(null);
        } catch (error) {
            console.error("Error updating sale:", error);
        }
    };

    const handleDeleteSale = useCallback(async (IdDelete) => {
        if (!IdDelete) return;
        try {
            const response = await DeleteSale(IdDelete);
            if (response.data.status === 200) {
                alert("Bạn đã xóa thành công sale");
                fetchData();
            }
        } catch (error) {
            console.error("Error deleting sale:", error);
        }
    }, [fetchData]);

    const GetSaleID = async (id) => {
        try {
            const response = await GetSaleByID(id);
            setCurrentSale(response.data);
        } catch (error) {
            console.error("Error fetching sale by ID:", error);
        }
    };


    const handleProductSelection = async (productDetails) => {
        if (productDetails.length > 0) {
            const productAddSale = {
                SaleID: IdSale,
                products: productDetails.map((product) => ({
                    productId: product.productId,
                    status: 1,
                    quantitySale: product.quantity,
                }))
            };

            try {
                const response = await AddProductSale(productAddSale);
                if (response) {
                    alert("Bạn đã thêm thành công");
                    fetchData(); // Gọi lại để cập nhật danh sách sale

                    if (IdSale) {
                        await GetSaleID(IdSale);
                    }

                    setIsProductModalOpen(false);
                }
            } catch (error) {
                console.log('Error adding products to sale:', error);
                console.log('Product Add Sale:', productAddSale);
            }
        }
    };




    const handleSelectProduct = (sale) => {
        setIsProductModalOpen(true);

        if (sale && sale._id !== selectedSale?._id) {
            setSelectedSale(sale);
            setIdEditSale(sale._id);
            setIdSale(sale._id);
        }
    };
    useEffect(() => {
        if (IdSale) {
            GetSaleID(IdSale);
        }
    }, [IdSale]);



    return (
        <AdminLayout>
            <div className="sales-management-page">
                <FilterSale
                    onChangeStatus={setStatusFilter}
                    onChangeDate={setDateFilter}
                    setIsNewSaleOpen={setIsNewSaleOpen}
                />


                <SalesList
                    sales={sales.filter(sale =>
                        (statusFilter === 'All' || sale.status_sale === statusFilter) &&
                        (!dateFilter || sale.date === dateFilter)
                    )}
                    onEditSale={openEditModal}
                    onSelectProduct={handleSelectProduct}
                    setIdDelete={handleDeleteSale}
                />
                <AddNewSale isOpen={isNewSaleOpen} onClose={() => setIsNewSaleOpen(false)} onSave={handleSave} />
                {isEditOpen && currentSale && (
                    <EditSale saleData={currentSale} onSave={handleUpdateSale} onCancel={() => setIsEditOpen(false)} />
                )}
                {isProductModalOpen && (
                    <ProductSelection
                        isOpen={isProductModalOpen}
                        onClose={() => setIsProductModalOpen(false)}
                        onApply={handleProductSelection} // Truyền hàm xử lý vào đây
                        sale={currentSale}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default SalesManagementPage;
