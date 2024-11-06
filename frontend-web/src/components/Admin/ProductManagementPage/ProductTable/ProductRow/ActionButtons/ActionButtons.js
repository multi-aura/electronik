// ActionButtons.js
import React from 'react';
import './ActionButtons.css';

const ActionButtons = () => {
    return (
        <div className="action-buttons">
            <button className="btn-edit" title="Edit">
                <i className="fas fa-edit"></i>
            </button>
            <button className="btn-delete" title="Delete">
                <i className="fas fa-trash-alt"></i>
            </button>
        </div>
    );
};

export default ActionButtons;
