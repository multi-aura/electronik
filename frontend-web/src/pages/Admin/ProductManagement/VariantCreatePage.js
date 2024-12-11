import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import { Variant } from '../../../models/variantModel';
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import ProductImageUpload from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductImageUpload/ProductImageUpload';
import ProductVariant from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductVariant/ProductVariant';
import { uploadImages } from '../../../services/imageService';
import { addVariantToProduct } from '../../../services/variantService';
import '../../../assets/css/VariantCreatePage.css';

const VariantCreatePage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [variant, setVariant] = useState(Variant);

    const [images, setImages] = useState([]);
    const [isReadyToSave, setIsReadyToSave] = useState(false);

    const handleImageUpload = (uploadedImages) => {
        setImages((prevImages) => [...prevImages, ...uploadedImages]); // Append new images to existing ones
        setVariant((prevVariant) => ({
            ...prevVariant,
            images: uploadedImages.map((img) => ({
                url: img, // Lưu URL của ảnh
                isDefault: true
            }))
        }));
    };
    const handleVariantChange = (e) => {
        const { name, value } = e.target;
        setVariant((prevVariant) => ({
            ...prevVariant,
            [name]: name === 'stock' || name === 'price' || name === 'purchasePrice' ? parseFloat(value) : value,
        }));
    };
    
    const processImageUploadAndVariant = async () => {
        if (images.length > 0) {
            // Tải ảnh lên và nhận lại URL ảnh
            const uploadedImageUrls = await uploadImages(images);
            console.log(uploadedImageUrls);
    
            setVariant((prevState) => {
                const updatedVariant = {
                    ...prevState, // Giữ lại các thông tin hiện tại của variant
                    images: uploadedImageUrls.map((url, index) => ({
                        url: url,
                        isDefault: index === 0, // Đánh dấu ảnh đầu tiên là ảnh mặc định
                    })),
                };
    
                return updatedVariant;
            });
        }
    };
    

    useEffect(() => {
        if (isReadyToSave) {
            setIsReadyToSave(false);
            SaveVariant();
        }
    }, [variant, isReadyToSave]);
    const handleSaveVariant = async () => {
        try {
            await processImageUploadAndVariant();
            setIsReadyToSave(true);

            alert('Variant created successfully!');
        } catch (error) {
            console.error('Error creating variant:', error);
            alert('Failed to create variant. Please check the console for more details.');
        }
    };
    const SaveVariant = async () => {
        console.log('Product to be saved:', variant);
        try {
            const response = await addVariantToProduct(productId, variant);

            console.log('Product created successfully:', response);
            alert('Product created successfully!');
        } catch (error) {
            console.error('Error while saving product:', error);
            alert('Failed to create product. Please check the console for more details.');
        }
    };
    console.log('Variant:',variant );

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

                    <Tab eventKey="variants" title="Biến thể sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded admin-tab-content">
                        <ProductVariant
                            variant={variant} 
                            handleVariantChange={handleVariantChange}
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
