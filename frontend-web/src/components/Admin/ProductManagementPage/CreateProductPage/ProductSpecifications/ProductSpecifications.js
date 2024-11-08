import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './ProductSpecifications.css'; // Ensure this file has the necessary styles

const ProductSpecifications = ({ specifications, handleSpecChange, addSpecification, removeSpecification }) => (
    <div className="product-specifications-container">
        <h5 className="specifications-header mb-4">Thông số kỹ thuật</h5>
        {specifications.length > 0 ? (
            specifications.map((spec, index) => (
                <Row key={index} className="specification-row mb-3">
                    <Col md={5}>
                        <Form.Group controlId={`specName-${index}`}>
                            <Form.Control
                                type="text"
                                placeholder="Tên thông số"
                                name="name"
                                value={spec.name}
                                onChange={(e) => handleSpecChange(e, index)}
                                className="specification-input"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId={`specValue-${index}`}>
                            <Form.Control
                                type="text"
                                placeholder="Giá trị"
                                name="value"
                                value={spec.value}
                                onChange={(e) => handleSpecChange(e, index)}
                                className="specification-input"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} className="text-end">
                        <Button variant="outline-danger" onClick={() => removeSpecification(index)} className="remove-spec-btn">
                            Xóa
                        </Button>
                    </Col>
                </Row>
            ))
        ) : (
            <p className="no-specifications-message">Chưa có thông số kỹ thuật nào.</p>
        )}
        <Button variant="primary" onClick={addSpecification} className="add-spec-btn mt-3">
            Thêm thông số
        </Button>

    </div>
);

export default ProductSpecifications;
