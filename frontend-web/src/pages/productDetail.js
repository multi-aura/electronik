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
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import '../assets/css/productDetail.css';
import { fetchProductDetailsByID } from '../services/productService';

const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [carouselImages, setCarouselImages] = useState([]);
    const [description, setDescription] = useState('');
    const [specifications, setSpecifications] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { serialID } = useParams();

    const { productId } = useParams();
    const handleSelect = (selectedTab) => {
        setActiveTab(activeTab === selectedTab ? null : selectedTab);
    };

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const productDetail = await fetchProductDetailsByID(productId);

                setProductData(productDetail.data);

                setSelectedImage(productDetail.data?.default_image || '');
                // Gán hình ảnh từ biến thể vào carouselImages
                const variantImages = productDetail.data?.variants?.flatMap(variant => variant.images || []) || [];
                setCarouselImages(variantImages);

                setDescription(productDetail.data || '');
                setSpecifications(productDetail.data?.specifications || []);
                setReviews(productDetail.data || []);
            } catch (error) {
                console.error('Failed to fetch product details', error);
            }
        };

        if (productId) {
            getProductDetails();
        }
    }, [productId]);
    useEffect(() => {
        const getInformationBySerial = async () => {
            alert(serialID);
        }
        if (serialID) {
            getInformationBySerial();
        }
       
    }, [serialID])
    return (
        <Layout>
            <Container className="product-detail-container my-2">
                <Row className="product-detail-main-row" style={{ justifyContent: 'center', marginBottom: '20px', padding: '10px', backgroundColor: 'white' }}>
                    <Col md={6}>
                        <ProductImage imageUrl={selectedImage} />
                        <ProductImageCarousel images={carouselImages} onSelectImage={setSelectedImage} />
                    </Col>
                    <Col md={6}>
                        <ProductInfo
                            product={productData}
                            onSelectImage={setSelectedImage} // Truyền hàm callback
                        />

                    </Col>
                </Row>
                <Row className="product-detail-content-row mt-4">
                    <Col md={7} className="product-detail-tab-col" style={{ justifyContent: 'center', marginBottom: '20px', padding: '10px', backgroundColor: 'white' }}>
                        <Tab.Container defaultActiveKey="description">
                            <Nav className="product-detail-tabs-nav" variant="tabs" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
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
                            <Tab.Content className="product-detail-tab-content mt-3">
                                <Tab.Pane eventKey="description">
                                    <ProductDescription description={description} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="specifications">
                                    <ProductSpecifications specifications={specifications} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="reviews">
                                    <ProductReviews reviews={reviews} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                    <Col md={5} className="product-detail-side-col">
                        <SimilarProducts />
                        <div className="product-detail-news-section" style={{ marginTop: '20px' }}>
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
