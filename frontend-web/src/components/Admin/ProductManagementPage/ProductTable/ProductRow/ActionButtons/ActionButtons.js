import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../../../../../services/productService';
import './ActionButtons.css';

const ActionButtons = ({ productId }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/admin/products/${productId}/edit`);
    };
    const handleManageVariants = () => {
        navigate(`/admin/products/${productId}/variants`);
    };
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            await deleteProduct(productId);
            alert('Product deleted successfully!');
            navigate(`/admin/ProductManagement`);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product.');
        }
    };

    return (
        <div className="action-buttons">
            <button className="btn-action btn-edit" title="Edit" onClick={handleEdit}>
                <i className="far fa-edit"></i>
            </button>
            <button className="btn-action btn-variants" title="Manage Variants" onClick={handleManageVariants}>
                <i className="fas fa-th-large"></i>
            </button>
            <button className="btn-action btn-delete" title="Delete" onClick={handleDelete}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    );
};

export default ActionButtons;
