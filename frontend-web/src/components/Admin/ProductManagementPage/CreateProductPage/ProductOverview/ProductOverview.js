import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ProductOverview = ({ product, handleChange, categories = [], suppliers = [] }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('vi'); // Mặc định hiển thị Tiếng Việt

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    return (
        <div>
            {/* Combobox chọn ngôn ngữ */}
            <Form.Group controlId="languageSelect" className="mb-3">
                <Form.Label>Chọn ngôn ngữ</Form.Label>
                <Form.Control as="select" value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                </Form.Control>
            </Form.Group>

            {/* Hiển thị nội dung theo ngôn ngữ đã chọn */}
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId={`productName${selectedLanguage === 'vi' ? 'Vi' : 'En'}`}>
                            <Form.Label>{selectedLanguage === 'vi' ? 'Tên sản phẩm' : 'Product Name'}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={selectedLanguage === 'vi' ? 'Nhập tên sản phẩm' : 'Enter product name'}
                                name={selectedLanguage === 'vi' ? 'nameVi' : 'nameEn'}
                                value={selectedLanguage === 'vi' ? product.nameVi : product.nameEn}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="productCode">
                            <Form.Label>{selectedLanguage === 'vi' ? 'Mã sản phẩm' : 'Product Code'}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={selectedLanguage === 'vi' ? 'Nhập mã sản phẩm' : 'Enter product code'}
                                name="code"
                                value={product.code}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="productStatus">
                            <Form.Label>{selectedLanguage === 'vi' ? 'Tình trạng' : 'Status'}</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={product.status}
                                onChange={handleChange}
                            >
                                <option value="">{selectedLanguage === 'vi' ? '-- Chọn tình trạng --' : '-- Select Status --'}</option>
                                <option value="1">{selectedLanguage === 'vi' ? 'Còn hàng' : 'In Stock'}</option>
                                <option value="0">{selectedLanguage === 'vi' ? 'Hết hàng' : 'Out of Stock'}</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="productCategory">
                            <Form.Label>{selectedLanguage === 'vi' ? 'Danh mục' : 'Category'}</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={product.category?._id || ''}
                                onChange={handleChange}
                            >
                                <option value="">{selectedLanguage === 'vi' ? '-- Chọn danh mục --' : '-- Select Category --'}</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {selectedLanguage === 'vi' ? cat.nameVi : cat.nameEn}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="productSupplier">
                            <Form.Label>{selectedLanguage === 'vi' ? 'Nhà cung cấp' : 'Supplier'}</Form.Label>
                            <Form.Control
                                as="select"
                                name="supplier"
                                value={product.supplier || ''}
                                onChange={handleChange}
                            >
                                <option value="">{selectedLanguage === 'vi' ? '-- Chọn nhà cung cấp --' : '-- Select Supplier --'}</option>
                                {suppliers.map((sup) => (
                                    <option key={sup._id} value={sup._id}>
                                        {sup.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId={`productDescription${selectedLanguage === 'vi' ? 'Vi' : 'En'}`}>
                            <Form.Label>{selectedLanguage === 'vi' ? 'Mô tả sản phẩm' : 'Product Description'}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder={selectedLanguage === 'vi' ? 'Nhập mô tả sản phẩm' : 'Enter product description'}
                                name={selectedLanguage === 'vi' ? 'descriptionVi' : 'descriptionEn'}
                                value={selectedLanguage === 'vi' ? product.descriptionVi : product.descriptionEn}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ProductOverview;
