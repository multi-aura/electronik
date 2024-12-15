import React, { useState, useEffect } from 'react';
import './SuccessModal.css';

const SuccessModal = ({ title, description, onClose }) => {
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(false); // Đóng modal sau khi hiển thị 6 giây
        }, 6000);

        return () => clearTimeout(timer); // Dọn dẹp khi component bị unmount
    }, []);

    useEffect(() => {
        if (!showModal) {
            const timer = setTimeout(() => {
                onClose(); // Gọi onClose sau khi modal ẩn
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [showModal, onClose]);

    return (
        <div className={`success-modal-overlay ${showModal ? 'show' : 'hide'}`}>
            <div className="success-modal-container">
                <div className="success-modal-content">
                      
                    {title && <h2 className="success-modal-title">   <i className="fas fa-check-circle"> </i> {title}</h2>}
                    {description && <p className="success-modal-description">{description}</p>}
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
