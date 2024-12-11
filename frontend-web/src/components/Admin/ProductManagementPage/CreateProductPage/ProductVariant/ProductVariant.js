import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import './ProductVariant.css'; // Ensure you have this CSS file for custom styles

const ProductVariant = ({ variant, handleVariantChange }) => (
    <div className="product-variants-container">
        <h5 className="variants-header">Biến thể sản phẩm</h5>
        <Card className="variant-card mb-3">
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="variantColor">
                            <Form.Label>Màu sắc</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập màu sắc"
                                name="color"
                                value={variant.color}
                                onChange={handleVariantChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="variantStock">
                            <Form.Label>Tồn kho</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập số lượng"
                                name="stock"
                                value={variant.stock}
                                onChange={handleVariantChange}
                                min="0"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="variantPrice">
                            <Form.Label>Giá bán</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập giá bán"
                                name="price"
                                value={variant.price}
                                onChange={handleVariantChange}
                                min="0"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={4}>
                        <Form.Group controlId="variantPurchasePrice">
                            <Form.Label>Giá nhập</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập giá nhập"
                                name="purchasePrice"
                                value={variant.purchasePrice}
                                onChange={handleVariantChange}
                                min="0"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="variantSku">
                            <Form.Label>SKU</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập SKU"
                                name="sku"
                                value={variant.sku}
                                onChange={handleVariantChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="variantWeight">
                            <Form.Label>Cân nặng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập cân nặng"
                                name="weight"
                                value={variant.weight}
                                onChange={handleVariantChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={12}>
                        <Form.Group controlId="variantDescription">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Nhập mô tả biến thể"
                                name="descriptionVi"
                                value={variant.descriptionVi}
                                onChange={handleVariantChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>
);

export default ProductVariant;
