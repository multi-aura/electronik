import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { fetchProductDetailsByID } from '../../../services/productService';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import VariantCard from '../../../components/Admin/ProductManagementPage/VariantCard/VariantCard';
import VariantDetailsModal from '../../../components/Admin/ProductManagementPage/VariantDetailsModal/VariantDetailsModal';
import '../../../assets/css/VariantManagementPage.css';

const VariantManagementPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProductDetailsByID(productId);
                setProduct(data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Không thể tải chi tiết sản phẩm:', error);
                setError('Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.');
                setIsLoading(false);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleShowDetails = (variant) => {
        setSelectedVariant(variant);
    };

    const handleCloseModal = () => {
        setSelectedVariant(null);
    };

    const handleCreateVariant = () => {
        navigate(`/admin/products/${productId}/variants/create`);
    };

    const handleDeleteVariant = (variantId) => {
        // Logic for deleting a variant, possibly including an API call
        console.log(`Đang xóa biến thể với ID: ${variantId}`);
        // Update state after deletion if needed
    };

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <AdminLayout>
            <div className="variant-management-page">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Quản lý Biến thể cho {product.nameVi}</h2>
                    <button
                        className="btn btn-success"
                        onClick={handleCreateVariant}
                    >
                        <i className="fas fa-plus-circle"></i> Tạo Biến thể mới
                    </button>
                </div>
                <div className="variant-list">
                    {product.variants.map((variant) => (
                        <VariantCard
                            key={variant._id}
                            variant={variant}
                            onShowDetails={handleShowDetails}
                            onDelete={handleDeleteVariant}
                        />
                    ))}
                </div>
                {selectedVariant && (
                    <VariantDetailsModal
                        variant={selectedVariant}
                        onClose={handleCloseModal}
                        onDelete={handleDeleteVariant}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default VariantManagementPage;
