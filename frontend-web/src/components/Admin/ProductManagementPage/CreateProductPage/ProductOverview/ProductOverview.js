import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ProductOverview = ({ product, handleChange, categories ,setProduct}) => {
    const [selectedLanguage, setSelectedLanguage] = useState('vi'); // Mặc định hiển thị Tiếng Việt
    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };
    const getManufacturersForCategory = (categoryId) => {
        const categoryData = categories.find(
            (item) => item.category && item.category._id === categoryId
        );
        return categoryData ? categoryData.manufacturers : [];
    };

    return (
        <div>
            <Form.Group controlId="languageSelect" className="mb-3">
                <Form.Label>Chọn ngôn ngữ</Form.Label>
                <Form.Control as="select" value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                </Form.Control>
            </Form.Group>

            <Form>
                <Row className="mb-3">
                    <Col>
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
                                value={product.category._id || ''} // Ensure it reflects the category ID
                                onChange={(e) => {
                                    const selectedCategoryId = e.target.value;
                                    const selectedCategory = categories.find(
                                        (item) => item.category && item.category._id === selectedCategoryId
                                    );

                                    if (selectedCategory && selectedCategory.category) {
                                        setProduct((prevState) => ({
                                            ...prevState,
                                            category: {
                                                _id: selectedCategory.category._id,
                                                nameVi: selectedCategory.category.nameVi,
                                                nameEn: selectedCategory.category.nameEn,
                                                image: selectedCategory.category.image,
                                            },
                                        }));
                                    } else {
                                        setProduct((prevState) => ({
                                            ...prevState,
                                            category: {
                                                _id: '',
                                                nameVi: '',
                                                nameEn: '',
                                            },
                                        }));
                                    }
                                }}
                            >
                                <option value="">{selectedLanguage === 'vi' ? '-- Chọn danh mục --' : '-- Select Category --'}</option>
                                {categories.length > 0 ? (
                                    categories.map((item, index) => (
                                        item.category && (
                                            <option key={item.category._id || index} value={item.category._id}>
                                                {selectedLanguage === 'vi' ? item.category.nameVi : item.category.nameEn}
                                            </option>
                                        )
                                    ))
                                ) : (
                                    <option disabled>{selectedLanguage === 'vi' ? 'Không có danh mục' : 'No categories available'}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Col>




                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                    <Form.Group controlId="productManufacturer">
                            <Form.Label>{selectedLanguage === 'vi' ? 'Nhà sản xuất' : 'Manufacturer'}</Form.Label>
                            <Form.Control
                                as="select"
                                name="manufacturer"
                                value={product.manufacturer || ''}
                                onChange={handleChange}
                            >
                                <option value="MSI">{selectedLanguage === 'vi' ? '-- Chọn nhà sản xuất --' : '-- Select Manufacturer --'}</option>
                                {getManufacturersForCategory(product.category._id).map((manufacturer, index) => (
                                    <option key={index} value={manufacturer}>{manufacturer}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="productDimensions">
                            <Form.Label>{selectedLanguage === 'vi' ? 'Kích Thước' : 'Dimensions'}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={selectedLanguage === 'vi' ? 'Nhập kích thước sản phẩm' : 'Enter product dimensions'}
                                name="dimensions" 
                                value={product.dimensions} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="productWarranty">
                            <Form.Label>{selectedLanguage === 'vi' ? 'Bảo Hành' : 'Warranty'}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={selectedLanguage === 'vi' ? 'Nhập thời gian bảo hành sản phẩm' : 'Enter warranty period'}
                                name="warranty" 
                                value={product.warranty} 
                                onChange={handleChange} 
                            />
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
