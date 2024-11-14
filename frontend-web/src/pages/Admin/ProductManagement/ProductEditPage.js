import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import ProductOverview from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductOverview/ProductOverview';
import ProductSpecifications from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductSpecifications/ProductSpecifications';
import ProductHeader from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductHeader/ProductHeader';
import { fetchAllCategories } from '../../../services/categoryService';
import { fetchProductDetailsByID, updateProduct } from '../../../services/productService';
import '../../../assets/css/ProductEditPage.css';

const ProductEditPage = ({ productID }) => {
    const [product, setProduct] = useState({
        nameVi: '',
        nameEn: '',
        descriptionVi: '',
        descriptionEn: '',
        category: {
            _id: '',
            nameVi: '',
            nameEn: '',
        },
        variants: [],
        specifications: [],
        manufacturer: '',
        dimensions: '',
        warranty: '',
        weight: '',
        status: 1,
    });
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const loadProductDetails = async () => {
            try {
                const data = await fetchProductDetailsByID(productID);
                setProduct(data); // Assuming `data` contains the product object
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories();
        loadProductDetails();
    }, [productID]);

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

    const handleSaveProduct = async () => {
        try {
            await updateProduct(productID, product);
            alert('Product updated successfully!');
        } catch (error) {
            console.error('Error while updating product:', error);
            alert('Failed to update product. Please check the console for more details.');
        }
    };

    return (
        <AdminLayout>
            <Container fluid className="admin-product-edit-page p-4 bg-light rounded shadow">
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex justify-content-between align-items-center admin-header-edit">
                            <h2 className="admin-page-title">Chỉnh sửa sản phẩm</h2>
                            <ProductHeader />
                        </div>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="details" id="admin-product-edit-tabs" className="admin-product-edit-tabs mb-4">
                    <Tab eventKey="details" title="Thông tin sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded admin-tab-content">
                            <ProductOverview product={product} handleChange={handleChange} categories={categories} setProduct={setProduct} />
                        </div>
                    </Tab>
                    <Tab eventKey="specifications" title="Thông số kỹ thuật">
                        <div className="p-3 bg-white shadow-sm rounded admin-tab-content">
                            <ProductSpecifications
                                specifications={product.specifications}
                                handleSpecChange={handleSpecificationChange}
                                addSpecification={addSpecification}
                                removeSpecification={removeSpecification}
                            />
                        </div>
                    </Tab>
                </Tabs>

                <Row>
                    <Col className="text-end">
                        <Button variant="success" onClick={handleSaveProduct} className="me-2">Lưu thay đổi</Button>
                        <Button variant="danger" onClick={() => window.history.back()}>Hủy bỏ</Button>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
};

export default ProductEditPage;
