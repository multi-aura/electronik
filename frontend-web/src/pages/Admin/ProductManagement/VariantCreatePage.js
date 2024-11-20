import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import { Variant } from '../../../models/variantModel';
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import ProductImageUpload from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductImageUpload/ProductImageUpload';
import ProductVariants from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductVariants/ProductVariants';
import { uploadImages } from '../../../services/imageService';
import '../../../assets/css/VariantCreatePage.css';

const VariantCreatePage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [variant, setVariant] = useState({ ...Variant, variants: [] });

    const [images, setImages] = useState([]);

    const handleImageUpload = (uploadedImages) => {
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
        setVariant((prevVariant) => ({
            ...prevVariant,
            images: uploadedImages.map((img, index) => ({
                url: img,
                isDefault: index === 0,
            })),
        }));
    };

    const handleVariantChange = (e, index) => {
        const { name, value } = e.target;
        setVariant((prevVariant) => {
            const updatedVariants = [...prevVariant.variants];
            updatedVariants[index] = {
                ...updatedVariants[index],
                [name]: name === 'stock' || name === 'price' || name === 'purchasePrice' ? parseFloat(value) : value,
            };
            return { ...prevVariant, variants: updatedVariants };
        });
    };

    const addVariant = () => {
        setVariant((prevVariant) => ({
            ...prevVariant,
            variants: [...prevVariant.variants, { color: '', stock: 0, price: 0, sku: '', purchasePrice: 0 }],
        }));
    };

    const removeVariant = (index) => {
        setVariant((prevVariant) => ({
            ...prevVariant,
            variants: prevVariant.variants.filter((_, i) => i !== index),
        }));
    };

    const handleSaveVariant = async () => {
        try {
            const payload = { ...variant, productId };
            // const response = await createVariant(payload);
            // console.log('Variant created successfully:', response);
            alert('Variant created successfully!');
            // navigate(`/admin/products/${productId}/variants`);
        } catch (error) {
            console.error('Error creating variant:', error);
            alert('Failed to create variant. Please check the console for more details.');
        }
    };

    return (
        <AdminLayout>
            <Container fluid className="admin-product-create-page p-4 bg-light rounded shadow">
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex justify-content-between align-items-center admin-header-create">
                            <h2 className="admin-page-title">Tạo biến thể mới</h2>
                        </div>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="images" id="admin-variant-create-tabs" className="admin-product-create-tabs mb-4">
                    {/* Tab "Hình ảnh sản phẩm" */}
                    <Tab eventKey="images" title="Hình ảnh sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded admin-tab-content">
                            <ProductImageUpload handleImageUpload={handleImageUpload} />
                        </div>
                    </Tab>

                    {/* Tab "Biến thể sản phẩm" */}
                    <Tab eventKey="variants" title="Biến thể sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded admin-tab-content">
                            <ProductVariants
                                variants={variant.variants}
                                handleVariantChange={handleVariantChange}
                                addVariant={addVariant}
                                removeVariant={removeVariant}
                            />
                        </div>
                    </Tab>
                </Tabs>

                <Row>
                    <Col className="text-end">
                        <Button variant="success" onClick={handleSaveVariant} className="me-2">Lưu biến thể</Button>
                        <Button variant="danger" onClick={() => navigate(`/admin/products/${productId}/variants`)}>Hủy bỏ</Button>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
};

export default VariantCreatePage;
