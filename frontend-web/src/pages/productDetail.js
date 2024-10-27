import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import Layout from '../layouts/Layout';
import ProductImage from '../components/productDetail/productImage/productImage';
import ProductInfo from '../components/productDetail/productInfo/productInfo';
import ProductSpecifications from '../components/productDetail/ProductSpecifications/ProductSpecifications';
import ProductReviews from '../components/productDetail/ProductReviews/ProductReviews';
import ProductImageCarousel from '../components/productDetail/ProductImageCarousel/ProductImageCarousel';
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    // Giả lập dữ liệu sản phẩm từ database
    const productData = {
      _id: productId,
      product_name: 'Laptop Dell XPS 15',
      description: 'Laptop Dell với màn hình 15 inch, CPU Core i7, RAM 16GB',
      price: 15000000,
      default_image: 'https://product.hstatic.net/1000233206/product/laptop-msi-raider-ge68-hx-14vig-496vn_2205aac63b9549d6a3263a7ed47f224a_grande.png',
      category: { name: 'Laptops' },
      variants: [
        {
          color: 'Silver',
          stock: 10,
          price: 15000000,
          images: [
            { url: 'https://product.hstatic.net/1000233206/product/laptop-msi-raider-ge68-hx-14vig-496vn_2205aac63b9549d6a3263a7ed47f224a_grande.png' },
            { url: 'https://product.hstatic.net/1000233206/product/laptop-msi-raider-ge68-hx-14vig-496vn_5_7f13c3bfab7b4d06b3cf9b72fea8c09d_medium.png' },
            { url: 'https://product.hstatic.net/1000233206/product/laptop-msi-raider-ge68-hx-14vig-496vn_1_80ad0b00caab4f20ac1904b126b392d6_medium.png' },
            { url: 'https://product.hstatic.net/1000233206/product/laptop-msi-raider-ge68-hx-14vig-496vn_4_5b38d4132e0f4758bf54d5f5b060e942_medium.png' }
          ],
        },
      ],
      feedbacks: [
        { username: 'Nguyen Van A', content_rated: 'Sản phẩm tốt, chất lượng cao', number_star: 5 },
      ],
      specifications: {
        cpu: 'Intel Core i7',
        ram: '16GB',
        storage: '512GB SSD',
        graphics: 'NVIDIA GeForce GTX 1650',
      },
      sale: {
        discount_percentage: 30,
        sale_name: 'Summer Sale',
      },
    };

    setProduct(productData);
    setSelectedImage(productData.default_image); // Đặt ảnh mặc định
  }, [productId]);

  const handleImageSelect = (url) => {
    setSelectedImage(url); // Cập nhật ảnh lớn khi người dùng chọn
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Layout>
      <Container className="product-details my-5">
        <Row>
          <Col md={6}>
            <ProductImage
              imageUrl={selectedImage}
              altText={product.product_name}
            />
            <ProductImageCarousel
              images={product.variants[0].images}
              onSelectImage={handleImageSelect}
            />
          </Col>
          <Col md={6}>
            <ProductInfo
              name={product.product_name}
              description={product.description}
              price={product.price}
              sale={product.sale}
              stock={product.variants[0].stock}
              variants={product.variants}
              onVariantChange={() => {}}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Tab.Container defaultActiveKey="description">
              <Nav variant="tabs">
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
                  <p>{product.description}</p>
                </Tab.Pane>
                <Tab.Pane eventKey="specifications">
                  <ProductSpecifications specifications={product.specifications} />
                </Tab.Pane>
                <Tab.Pane eventKey="reviews">
                  <ProductReviews reviews={product.feedbacks} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProductDetail;