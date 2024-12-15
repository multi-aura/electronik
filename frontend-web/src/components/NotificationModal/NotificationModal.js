import React, { useState, useEffect } from 'react';
import './NotificationModal.css';

const NotificationModal = ({ title, description, onClose }) => {
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(false); 
        }, 3000);

        return () => clearTimeout(timer); 
    }, []);

    useEffect(() => {
        if (!showModal) {
            const timer = setTimeout(() => {
                onClose(); // Gọi onClose sau khi modal ẩn
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showModal, onClose]);

    return (
        <div className={`notification-modal-overlay ${showModal ? 'show' : 'hide'}`}>
            <div className="notification-modal-container">
                <div className="notification-modal-content">
                    {title && (
                        <h2 className="notification-modal-title">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                            >
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.293 14.707l-1.414 1.414L12 13.414l-3.879 3.879-1.414-1.414L10.586 12 6.707 8.121l1.414-1.414L12 10.586l3.879-3.879 1.414 1.414L13.414 12l3.879 3.879z" />
                            </svg>
                            {title}
                        </h2>
                    )}

                    {description && <p className="notification-modal-description">{description}</p>}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
