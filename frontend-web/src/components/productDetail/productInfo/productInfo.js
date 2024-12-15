import React, { useState, useEffect } from 'react';
import { Button, Badge, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaHeart, FaShareAlt, FaShippingFast, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../services/cartService';
import SuccessModal from '../../SuccessModal/SuccessModal';
import NotificationModal from '../../NotificationModal/NotificationModal';

function ProductInfo({ product, onSelectImage, onSelectSerial }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(0);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setMaxQuantity(product.variants[0].stock || 0);
    }
  }, [product]);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedColor(product.variants[0]);
      onSelectSerial(product.variants[0].serial);
    }
  }, [product, onSelectSerial]);

  if (!product) {
    return <div>Product information is not available.</div>;
  }

  const price = selectedColor ? selectedColor.price : (product.price || 0);
  const priceSale = product.sale && product.sale.discountPercentage > 0
    ? price * (1 - product.sale.discountPercentage / 100)
    : price;

  const handleQuantityChange = (value) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + value;

      if (newQuantity < 1) return 1;

      if (newQuantity > maxQuantity) {
        setshowErrorModal(true);

        return maxQuantity;
      }
      return newQuantity;
    });
  };

  const handleVariantClick = (variant) => {
    setMaxQuantity(variant.stock || 0);
    setQuantity(1);
    setSelectedColor(variant);

    const newImage = variant.images && variant.images[0] ? variant.images[0].url : product.default_image;
    if (onSelectImage) {
      onSelectImage(newImage);
    }

    const selectedSerial = variant.serial;
    if (selectedSerial) {
      onSelectSerial(selectedSerial);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: product._id,
      name: product.nameVi,
      price: priceSale,
      priceold: price,
      quantity: quantity,
      image: selectedColor ? selectedColor.images[0].url : product.default_image,
      serial: selectedColor ? selectedColor.serial : product.serial || 'N/A',
      sku: selectedColor ? selectedColor.sku : product.sku || 'N/A',
      color: selectedColor ? selectedColor.color : product.color || 'N/A',
      variantID: selectedColor._id,
      sale: {
        saleID: product && product.sale && product.sale._id ? product.sale._id : ' ',
        saleName: product && product.sale && product.sale.saleNameVi ? product.sale.saleNameVi : ' ',
        discountPercentage: product && product.sale && product.sale.discountPercentage ? product.sale.discountPercentage : 0,
      },
      quantityTotal: selectedColor?.stock || 0,

    };

    addToCart(productToAdd);
    setShowSuccessModal(true);

  };

  return (
    <div className="product-info">
      <h2>{product.nameVi || 'Product Name'}</h2>

      <Badge bg="warning" className="mb-2" style={{ width: "30%" }}>4.8 ★ Đánh giá (123)</Badge>

      <div className="product-details">
        <p><strong>Serial:</strong> {selectedColor ? selectedColor.serial : 'N/A'}</p>
        <p><strong>SKU:</strong> {selectedColor ? selectedColor.sku : 'N/A'}</p>
        <p><strong>Trọng lượng:</strong> {selectedColor ? selectedColor.weight : 'N/A'}</p>
      </div>

      <div>
        <div>
          {price && product.sale && product.sale.discountPercentage > 0 ? (
            <>
              <span className="old-price text-decoration-line-through me-2 text-muted">
                {price.toLocaleString()}đ
              </span>
              <span className="new-price text-danger fs-4">
                {priceSale.toLocaleString()}đ
              </span>
              <Badge bg="danger" className="ms-2">
                -{product.sale.discountPercentage}%
              </Badge>
            </>
          ) : (
            <span className="new-price text-danger fs-4">{price.toLocaleString()}đ</span>
          )}
        </div>
      </div>

      <OverlayTrigger overlay={<Tooltip>Giao hàng nhanh trong 24 giờ</Tooltip>}>
        <div className="mt-3 d-flex align-items-center">
          <FaShippingFast className="text-success me-2" />
          <span>Giao hàng toàn quốc, nhận hàng nhanh chóng</span>
        </div>
      </OverlayTrigger>

      <hr />

      {/* Lựa Chọn Màu Sắc */}
      {product.variants && Array.isArray(product.variants) && product.variants.length > 0 && (
        <div className="color-section mt-2">
          <strong>Màu sắc:</strong> {selectedColor ? selectedColor.color : 'N/A'}
          <div className="d-flex gap-3 mt-3">
            {product.variants.map((variant, index) => (
              <Link
                to={`/product/${variant._id}`}
                key={index}
                onClick={() => handleVariantClick(variant)}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    border: selectedColor && selectedColor.color === variant.color ? '2px solid red' : '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '5px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    width: '70px',
                    backgroundColor: '#f9f9f9',
                    transition: 'border 0.3s ease'
                  }}
                >
                  <img
                    src={variant.images && variant.images[0] ? variant.images[0].url : 'https://via.placeholder.com/50'}
                    alt={variant.color}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      marginBottom: '5px',
                    }}
                  />
                  <div>{variant.color}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <hr />
      {showErrorModal && (
        <NotificationModal
          title="Thất bại!"
          description="Số lượng sản phẩm không đủ để tăng thêm."
          onClose={() => setshowErrorModal(false)}
        />
      )}

      <div className="quantity-section mt-3">
        {maxQuantity === 0 ? (
          <strong className="text-danger">Hết hàng</strong>
        ) : (
          <>
            <strong>Số lượng:</strong>
            <div className="d-flex align-items-center gap-2 mt-2">
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 1}
              >
                -
              </Button>
              <Form.Control
                type="text"
                value={quantity}
                readOnly
                className="text-center"
                style={{ width: '60px' }}
              />
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange(1)}

              >
                +
              </Button>
            </div>
            <div className="subtotal-section mt-3">
              <strong>Tổng cộng:</strong> {`${(priceSale * quantity).toLocaleString()}đ`}
            </div>

            <div className="d-flex gap-2 mt-4">
              <Button variant="danger" className="flex-grow-1" onClick={handleAddToCart}>
                <FaShoppingCart className="me-2" /> Thêm vào giỏ hàng
              </Button>
              <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center">
                <FaHeart />
              </Button>
              <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center">
                <FaShareAlt />
              </Button>
            </div>
          </>

        )}
      </div>



      <div className="additional-info mt-4">
        <p><strong>Bảo hành:</strong> {product.warranty || 'N/A'}</p>
        <p><strong>Chính sách đổi trả:</strong> Đổi trả trong 30 ngày nếu có lỗi kỹ thuật</p>
      </div>
      {showSuccessModal && (
        <SuccessModal
          title="Thành công!"
          description="Bạn đã thêm đơn hàng thành công."
          onClose={() => setShowSuccessModal(false)}
        />)
      }

    </div>

  );
}

export default ProductInfo;
