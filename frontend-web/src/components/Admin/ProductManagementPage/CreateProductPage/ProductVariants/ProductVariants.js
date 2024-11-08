import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import './ProductVariants.css'; // Ensure you have this CSS file for custom styles

const ProductVariants = ({ variants, handleVariantChange, addVariant, removeVariant, setPrimaryVariant }) => (
    <div className="product-variants-container">
        <h5 className="variants-header">Biến thể sản phẩm</h5>
        <div className="variants-card-container">
            {variants.map((variant, index) => (
                <Card key={variant._id} className="variant-card mb-3">
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                                <Form.Group controlId={`variantColor-${index}`}>
                                    <Form.Label>Màu sắc</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập màu sắc"
                                        name="color"
                                        value={variant.color}
                                        onChange={(e) => handleVariantChange(e, index)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId={`variantStock-${index}`}>
                                    <Form.Label>Tồn kho</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Nhập số lượng"
                                        name="stock"
                                        value={variant.stock}
                                        onChange={(e) => handleVariantChange(e, index)}
                                        min="0"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId={`variantPrice-${index}`}>
                                    <Form.Label>Giá bán</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Nhập giá bán"
                                        name="price"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(e, index)}
                                        min="0"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={4}>
                                <Form.Group controlId={`variantPurchasePrice-${index}`}>
                                    <Form.Label>Giá nhập</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Nhập giá nhập"
                                        name="purchasePrice"
                                        value={variant.purchasePrice}
                                        onChange={(e) => handleVariantChange(e, index)}
                                        min="0"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId={`variantSku-${index}`}>
                                    <Form.Label>SKU</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập SKU"
                                        name="sku"
                                        value={variant.sku}
                                        onChange={(e) => handleVariantChange(e, index)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId={`variantWeight-${index}`}>
                                    <Form.Label>Cân nặng</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập cân nặng"
                                        name="weight"
                                        value={variant.weight}
                                        onChange={(e) => handleVariantChange(e, index)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={6}>
                                <Button variant="success" onClick={() => setPrimaryVariant(index)} className="mt-2">
                                    Chọn làm sản phẩm chính
                                </Button>
                            </Col>
                            <Col md={6} className="text-end">
                                <Button variant="outline-danger" onClick={() => removeVariant(index)} className="mt-3">
                                    Xóa
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
        <Button variant="success" onClick={addVariant} className="mt-3 add-spec-btn">
            Thêm biến thể
        </Button>
    </div>
);

export default ProductVariants;
