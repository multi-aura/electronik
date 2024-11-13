import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetailsByID } from '../../../services/productService';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import VariantCard from '../../../components/Admin/ProductManagementPage/VariantCard/VariantCard';
import VariantDetailsModal from '../../../components/Admin/ProductManagementPage/VariantDetailsModal/VariantDetailsModal';
import '../../../assets/css/VariantManagementPage.css';

const VariantManagementPage = () => {
    const { productId } = useParams();
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
                console.error('Failed to fetch product details:', error);
                setError('Unable to load product details. Please try again later.');
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

    const handleDeleteVariant = (variantId) => {
        // Logic for deleting a variant, possibly including an API call
        console.log(`Deleting variant with ID: ${variantId}`);
        // Update state after deletion if needed
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>No product found.</p>;

    return (
        <AdminLayout>
            <div className="variant-management-page">
                <h2>Manage Variants for {product.nameVi}</h2>
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