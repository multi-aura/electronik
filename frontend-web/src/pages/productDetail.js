import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import Layout from '../layouts/Layout';
import ProductImage from '../components/productDetail/productImage/productImage';
import ProductDescription from '../components/productDetail/ProductDescription/ProductDescription';
import ProductInfo from '../components/productDetail/productInfo/productInfo';
import ProductSpecifications from '../components/productDetail/ProductSpecifications/ProductSpecifications';
import ProductReviews from '../components/productDetail/ProductReviews/ProductReviews';
import ProductImageCarousel from '../components/productDetail/ProductImageCarousel/ProductImageCarousel';
import SimilarProducts from '../components/productDetail/SimilarProducts/SimilarProducts';
import TechNewsList from '../components/productDetail/TechNewsList/TechNewsList';
import FlashSale from '../components/FlashSale/FlashSale';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid'
const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState(null);
    const handleSelect = (selectedTab) => {
        setActiveTab(activeTab === selectedTab ? null : selectedTab);
    };

    const [selectedImage, setSelectedImage] = useState('https://cdn.tgdd.vn/Products/Images/44/302532/hp-15s-fq5162tu-i5-7c134pa-1-750x500.jpg');
    return (
        <Layout>
            <Container className="product-details my-2">
                <Row style={{ justifyContent: 'center', marginBottom: '20px', padding: '10px', backgroundColor: 'white' }}>
                    <Col md={6}>
                        <ProductImage imageUrl={selectedImage} />
                        <ProductImageCarousel onSelectImage={setSelectedImage} />
                    </Col>
                    <Col md={6}>
                        <ProductInfo />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={7} style={{ justifyContent: 'center', marginBottom: '20px', padding: '10px', backgroundColor: 'white' }}>

                        <Tab.Container defaultActiveKey="description">
                            <Nav variant="tabs" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="description">Mô Tả</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="specifications">Thông Số Kỹ Thuật</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="reviews">Đánh Giá</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content className="mt-3">
                                <Tab.Pane eventKey="description">
                                    <ProductDescription />
                                </Tab.Pane>
                                <Tab.Pane eventKey="specifications">
                                    <ProductSpecifications />
                                </Tab.Pane>
                                <Tab.Pane eventKey="reviews">
                                    <ProductReviews />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                    <Col md={5}>
                        <SimilarProducts />
                        <div style={{ marginTop: '20px' }}>
                            <TechNewsList />
                        </div>
                    </Col>

                </Row>
            </Container>
            <FlashSale />   
            <CategoryGrid />
        </Layout>
    );
};

export default ProductDetail;