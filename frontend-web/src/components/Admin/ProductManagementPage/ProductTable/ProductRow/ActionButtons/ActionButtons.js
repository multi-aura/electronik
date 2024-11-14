import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionButtons.css';

const ActionButtons = ({ productId, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleManageVariants = () => {
        navigate(`/admin/products/${productId}/variants`);
    };

    return (
        <div className="action-buttons">
            <button className="btn-action btn-edit" title="Edit" onClick={onEdit}>
                <i className="far fa-edit"></i>
            </button>
            <button className="btn-action btn-variants" title="Manage Variants" onClick={handleManageVariants}>
                <i className="fas fa-th-large"></i>
            </button>
            <button className="btn-action btn-delete" title="Delete" onClick={onDelete}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    );
};

export default ActionButtons;
