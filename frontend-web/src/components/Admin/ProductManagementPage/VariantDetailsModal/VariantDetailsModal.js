import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import icons from react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './VariantDetailsModal.css';

const VariantDetailsModal = ({ variant, onClose, onDelete }) => {
    if (!variant) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog custom-modal-width" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Variant Details</h5>
                      
                    </div>
                    <div className="modal-body">
                        <div className="text-center mb-3">
                            <img
                                src={variant.images[0]?.url || 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png'}
                                alt={variant.color}
                                className="img-fluid variant-image-large"
                            />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Color:</strong> {variant.color}</p>
                                    <p><strong>Stock:</strong> {variant.stock}</p>
                                    <p><strong>SKU:</strong> {variant.sku}</p>
                                    <p><strong>Price:</strong> {variant.price.toLocaleString()} đ</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Purchase Price:</strong> {variant.purchasePrice.toLocaleString()} đ</p>
                                    <p><strong>Weight:</strong> {variant.weight}</p>
                                    <p><strong>Description (VI):</strong> {variant.descriptionVi}</p>
                                    <p><strong>Description (EN):</strong> {variant.descriptionEn}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary me-2">
                            <FaEdit className="me-1" /> Edit
                        </button>
                        <button className="btn btn-danger me-2" onClick={() => onDelete(variant._id)}>
                            <FaTrash className="me-1" /> Delete
                        </button>
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VariantDetailsModal;
