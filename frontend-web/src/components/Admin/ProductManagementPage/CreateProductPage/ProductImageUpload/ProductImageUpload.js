import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './ProductImageUpload.css'; // Custom CSS for additional styling

const ProductImageUpload = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file, index) => ({
            id: images.length + index + 1,
            url: URL.createObjectURL(file),
            isDefault: false
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleDefaultChange = (id) => {
        setImages((prevImages) =>
            prevImages.map((img) =>
                img.id === id ? { ...img, isDefault: true } : { ...img, isDefault: false }
            )
        );
    };

    const handleDelete = (id) => {
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    };

    return (
        <div className="custom-product-image-upload p-4 bg-light rounded shadow-sm">
            <Form.Group controlId="formFileMultiple" className="mb-4">
                <Form.Label className="custom-upload-label">Tải lên hình ảnh</Form.Label>
                <Form.Control type="file" multiple onChange={handleImageUpload} className="custom-upload-input" />
            </Form.Group>

            {images.length > 0 && (
                <Table bordered hover responsive className="custom-image-table">
                    <thead className="custom-table-header">
                        <tr>
                            <th>#</th>
                            <th>Hình ảnh</th>
                            <th>Ảnh đại diện</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((img, index) => (
                            <tr key={img.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={img.url} alt={`Preview ${index + 1}`} className="custom-img-preview" />
                                </td>
                                <td>
                                    <Form.Check
                                        type="radio"
                                        name="defaultImage"
                                        checked={img.isDefault}
                                        onChange={() => handleDefaultChange(img.id)}
                                        className="custom-form-check-input"
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(img.id)}>
                                        <i className="fas fa-trash-alt"></i> Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProductImageUpload;
