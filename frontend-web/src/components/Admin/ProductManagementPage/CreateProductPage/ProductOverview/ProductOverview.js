import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ProductOverview = ({ product, handleChange }) => (
    <Form>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="productNameVi">
                    <Form.Label>Tên sản phẩm (Việt)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên sản phẩm tiếng Việt"
                        name="nameVi"
                        value={product.nameVi}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="productNameEn">
                    <Form.Label>Tên sản phẩm (Anh)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên sản phẩm tiếng Anh"
                        name="nameEn"
                        value={product.nameEn}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="productCode">
                    <Form.Label>Mã sản phẩm</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập mã sản phẩm"
                        name="code"
                        value={product.code}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="productStatus">
                    <Form.Label>Tình trạng</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={product.status}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn tình trạng --</option>
                        <option value="1">Còn hàng</option>
                        <option value="0">Hết hàng</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="productCategory">
                    <Form.Label>Danh mục</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập danh mục"
                        name="category"
                        value={product.category.nameVi}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="productSupplier">
                    <Form.Label>Nhà cung cấp</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập nhà cung cấp"
                        name="supplier"
                        value={product.supplier}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="productPrice">
                    <Form.Label>Giá bán</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Nhập giá bán"
                        name="price"
                        value={product.price}
                        min="0"
                        step="1000"
                        onChange={(e) => {
                            // Ràng buộc giá trị số dương
                            const value = Math.max(0, Number(e.target.value));
                            handleChange({ target: { name: 'price', value } });
                        }}
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="productCost">
                    <Form.Label>Giá vốn</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Nhập giá vốn"
                        name="cost"
                        value={product.cost}
                        min="0"
                        step="1000"
                        onChange={(e) => {
                            // Ràng buộc giá trị số dương
                            const value = Math.max(0, Number(e.target.value));
                            handleChange({ target: { name: 'cost', value } });
                        }}
                    />
                </Form.Group>
            </Col>
        </Row>
    </Form>
);

export default ProductOverview;
