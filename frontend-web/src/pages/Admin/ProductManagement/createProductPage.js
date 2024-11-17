import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import ProductOverview from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductOverview/ProductOverview';
import ProductImageUpload from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductImageUpload/ProductImageUpload';
import ProductSpecifications from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductSpecifications/ProductSpecifications';
import ProductVariants from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductVariants/ProductVariants';
import ProductHeader from '../../../components/Admin/ProductManagementPage/CreateProductPage/ProductHeader/ProductHeader';
import { fetchAllCategories } from '../../../services/categoryService';
import { uploadImages } from '../../../services/imageService';
import { createProduct } from '../../../services/productService';
import { defaultProduct } from '../../../models/productModel';

import '../../../assets/css/ProductCreatePage.css';
const ProductCreatePage = () => {
    const [product, setProduct] = useState(defaultProduct);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReadyToSave, setIsReadyToSave] = useState(false);
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                console.log('Fetched categories:', data); 
                setCategories(data.data); 
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setIsLoading(false);
            }
        };
    
        loadCategories();
    }, []);
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
            updatedVariants[index] = {
                ...updatedVariants[index],
                [name]: (name === 'stock' || name === 'price' || name === 'purchasePrice') 
                    ? parseFloat(value) || 0  
                    : value,
            };
            return { ...prevState, variants: updatedVariants };
        });
    };

    const addVariant = () => {
        setProduct(prevState => ({
            ...prevState,
            variants: [...prevState.variants, { color: '', stock: '', price: '', sku: '', purchasePrice: '' }]
        }));
    };

    const removeVariant = (index) => {
        setProduct(prevState => ({
            ...prevState,
            variants: prevState.variants.filter((_, i) => i !== index)
        }));
    };
    const handleImageUpload = (uploadedImages) => {
        setImages((prevImages) => [...prevImages, ...uploadedImages]); // Append new images to existing ones
        
        setProduct((prevState) => {
            const updatedVariants = prevState.variants.map((variant) => ({
                ...variant,
                images: uploadedImages.map((img, index) => ({
                    url: img,
                    isDefault: index === 0, // Set the first image as default if none is selected
                }))
            }));
    
            const defaultVariantImage = updatedVariants
                .flatMap((variant) => variant.images)
                .find((img) => img.isDefault);
    
            return {
                ...prevState,
                variants: updatedVariants,
                default_image: defaultVariantImage ? defaultVariantImage.url : '',
            };
        });
    };
    const processImageUploadAndVariant = async () => {
        if (images.length > 0) {
            const uploadedImageUrls = await uploadImages(images);
            console.log(uploadedImageUrls)
            setProduct((prevState) => {
                const updatedVariants = prevState.variants.map((variant) => ({
                    ...variant,
                    images: uploadedImageUrls.map((url, index) => ({
                        url: url,
                        isDefault: index === 0,
                    }))
                }));

                const defaultVariantImage = updatedVariants
                    .flatMap((variant) => variant.images)
                    .find((img) => img.isDefault);

                return {
                    ...prevState,
                    variants: updatedVariants,
                    default_image: defaultVariantImage ? defaultVariantImage.url : '',
                };
            });
        }
        if (product.variants.length > 0) {
            
            const minPriceVariant = product.variants.reduce((prev, current) => 
                parseFloat(current.price) < parseFloat(prev.price) ? current : prev
            );
            console.log("variant def",minPriceVariant)
            setProduct(prevState => ({
                ...prevState,
                
                price: parseFloat(minPriceVariant.price),
                weight: minPriceVariant.weight,
            }));
        }
        
    };

    const handleSaveProduct = async () => {
        try {
            await processImageUploadAndVariant();
            setIsReadyToSave(true);
          

        } catch (error) {
            console.error('Error while saving product:', error);
            alert('Failed to create product. Please check the console for more details.');
        }
    };
    useEffect(() => {
        if (isReadyToSave) {
            SaveProduct();
            setIsReadyToSave(false);
        }
    }, [product, isReadyToSave]);
    const SaveProduct = async () => {
        console.log('Product to be saved:', product);
        try {
            const response = await createProduct(product);
            console.log('Product created successfully:', response);
            alert('Product created successfully!');
        } catch (error) {
            console.error('Error while saving product:', error);
            alert('Failed to create product. Please check the console for more details.');
        }
    };
    
    return (
        <AdminLayout>
            <Container fluid className="admin-product-create-page p-4 bg-light rounded shadow">
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex justify-content-between align-items-center admin-header-create">
                            <h2 className="admin-page-title">Tạo sản phẩm mới</h2>
                            <ProductHeader />
                        </div>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="details" id="admin-product-create-tabs" className="admin-product-create-tabs mb-4" >
                    <Tab eventKey="details" title="Thông tin sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded admin-tab-content">
                            <ProductOverview product={product} handleChange={handleChange} categories={categories} setProduct={setProduct} />
                        </div>
                    </Tab>
                    <Tab eventKey="images" title="Hình ảnh sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded admin-tab-content">
                            <ProductImageUpload handleImageUpload={handleImageUpload} />
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
                    <Tab eventKey="variants" title="Biến thể sản phẩm">
                        <div className="p-3 bg-white shadow-sm rounded admin-tab-content">
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
                        <Button variant="success" type="submit"  onClick={handleSaveProduct} className="me-2">Lưu sản phẩm</Button>
                        <Button variant="danger" type="reset">Hủy bỏ</Button>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
};

export default ProductCreatePage;
