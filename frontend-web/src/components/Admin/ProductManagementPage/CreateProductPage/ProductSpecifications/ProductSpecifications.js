import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './ProductSpecifications.css'; // Custom CSS for additional styling

const ProductSpecifications = ({ specifications, handleSpecChange, addSpecification, removeSpecification }) => (
    <div className="product-specifications-container">
        <h5 className="specifications-header mb-4">Thông số kỹ thuật</h5>
        {specifications.length > 0 ? (
            specifications.map((spec, index) => (
                <Row key={index} className="specification-row mb-3">
                    <Col md={5}>
                        <Form.Group controlId={`specName-${index}`} className="specification-group">
                            <Form.Label className="specification-label">Tên thông số</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên thông số"
                                name="name"
                                value={spec.name}
                                onChange={(e) => handleSpecChange(e, index)}
                                className="specification-input"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId={`specValue-${index}`} className="specification-group">
                            <Form.Label className="specification-label">Giá trị</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập giá trị"
                                name="value"
                                value={spec.value}
                                onChange={(e) => handleSpecChange(e, index)}
                                className="specification-input"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} className="text-center">
                        <Button variant="outline-danger" onClick={() => removeSpecification(index)} className="remove-specification-btn">
                            Xóa
                        </Button>
                    </Col>
                </Row>
            ))
        ) : (
            <p className="no-specification-message">Chưa có thông số kỹ thuật nào.</p>
        )}
        <Button variant="primary" onClick={addSpecification} className="add-specification-btn mt-4">
            Thêm thông số
        </Button>
    </div>
);

export default ProductSpecifications;
