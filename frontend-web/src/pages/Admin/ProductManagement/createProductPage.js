import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import ProductOverview from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductOverview/ProductOverview';
import ProductImageUpload from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductImageUpload/ProductImageUpload';
import ProductSpecifications from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductSpecifications/ProductSpecifications';
import ProductVariants from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductVariants/ProductVariants';
import ProductHeader from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductHeader/ProductHeader';
import '../../../assets/css/ProductCreatePage.css';

const ProductCreatePage = () => {
    const [product, setProduct] = useState({
        code: '',
        name: '',
        quantity: '',
        status: '',
        category: '',
        supplier: '',
        price: '',
        cost: '',
        image: '',
        descriptionVi: '',
        descriptionEn: '',
        variants: [],
        specifications: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSpecificationChange = (e, index) => {
        const { name, value } = e.target;
        setProduct(prevState => {
            const updatedSpecifications = [...prevState.specifications];
            updatedSpecifications[index] = { ...updatedSpecifications[index], [name]: value };
            return { ...prevState, specifications: updatedSpecifications };
        });
    };

    const addSpecification = () => {
        setProduct(prevState => ({
            ...prevState,
            specifications: [...prevState.specifications, { name: '', value: '' }]
        }));
    };

    const removeSpecification = (index) => {
        setProduct(prevState => ({
            ...prevState,
            specifications: prevState.specifications.filter((_, i) => i !== index)
        }));
    };

    const handleVariantChange = (e, index) => {
        const { name, value } = e.target;
        setProduct(prevState => {
            const updatedVariants = [...prevState.variants];
            updatedVariants[index] = { ...updatedVariants[index], [name]: value };
            return { ...prevState, variants: updatedVariants };
        });
    };

    const addVariant = () => {
        setProduct(prevState => ({
            ...prevState,
            variants: [...prevState.variants, { color: '', stock: '', price: '', sku: '' }]
        }));
    };

    const removeVariant = (index) => {
        setProduct(prevState => ({
            ...prevState,
            variants: prevState.variants.filter((_, i) => i !== index)
        }));
    };

    return (
        <AdminLayout>
            <Container fluid className="product-create-page p-4 bg-light rounded">
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex justify-content-between align-items-center header_create">
                            <h2 className="page-title display-5">Tạo sản phẩm mới</h2>
                            <ProductHeader />
                        </div>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="details" id="product-create-tabs" className="mb-4">
                    <Tab eventKey="details" title="Thông tin sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded">
                            <ProductOverview product={product} handleChange={handleChange} />
                        </div>
                    </Tab>
                    <Tab eventKey="images" title="Hình ảnh sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded">
                            <ProductImageUpload handleImageUpload={handleChange} />
                        </div>
                    </Tab>
                    <Tab eventKey="specifications" title="Thông số kỹ thuật">
                        <div className="p-3 bg-white shadow-sm rounded">
                            <ProductSpecifications
                                specifications={product.specifications}
                                handleSpecChange={handleSpecificationChange}
                                addSpecification={addSpecification}
                                removeSpecification={removeSpecification}
                            />
                        </div>
                    </Tab>
                    <Tab eventKey="variants" title="Biến thể sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded">
                            <ProductVariants
                                variants={product.variants}
                                handleVariantChange={handleVariantChange}
                                addVariant={addVariant}
                                removeVariant={removeVariant}
                            />
                        </div>
                    </Tab>
                </Tabs>

                <Row>
                    <Col className="text-end">
                        <Button variant="success" type="submit" className="me-2">Lưu sản phẩm</Button>
                        <Button variant="danger" type="reset">Hủy bỏ</Button>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
};

export default ProductCreatePage;
