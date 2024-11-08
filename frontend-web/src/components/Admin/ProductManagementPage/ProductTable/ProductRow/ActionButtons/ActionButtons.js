// ActionButtons.js
import React from 'react';
import './ActionButtons.css';

const ActionButtons = ({ onEdit, onDelete, onManageVariants }) => {
    return (
        <div className="action-buttons">
            <button className="btn-action btn-edit" title="Chỉnh sửa" onClick={onEdit}>
                <i className="far fa-edit"></i> 
            </button>
            <button className="btn-action btn-variants" title="Quản lý biến thể" onClick={onManageVariants}>
                <i className="fas fa-th-large"></i> 
            </button>
            <button className="btn-action btn-delete" title="Xóa" onClick={onDelete}>
                <i className="far fa-trash-alt"></i>    
            </button>
        </div>
    );
};

export default ActionButtons;
