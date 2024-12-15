import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import CartItem from '../components/CartPage/CartItem/CartItem';
import CartFooter from '../components/CartPage/CartFooter/CartFooter';
import FreeShippingProgress from '../components/CartPage/FreeShippingProgress/FreeShippingProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/CartPage.css';
import { getCart, calculateTotal, removeFromCart, updateQuantity } from '../services/cartService';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import RelatedProducts from '../components/CartPage/RelatedProducts/RelatedProducts';

const CartPage = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [subtotal, setSubtotal] = useState(calculateTotal());
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(getCart());
      setSubtotal(calculateTotal());
    };
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);
  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
    setCartItems(getCart());
    setSubtotal(calculateTotal());
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    setCartItems(getCart());
    setSubtotal(calculateTotal());
  };

  return (
    <Layout>
      <div className="container cart-page mt-5">
        <h2 className="text-center mb-4">Giỏ Hàng</h2>
        <FreeShippingProgress subtotal={subtotal} freeShippingThreshold={15000000} />

        <div className='row'>
          <div className='col-8'>


            <div className="row text-center fw-bold py-3 border-bottom">
              <div className="col-6 col-md-4">Sản Phẩm</div>
              <div className="col-2">Giá</div>
              <div className="col-3">Số Lượng</div>
              <div className="col-2">Tổng</div>
              <div className="col-1">Xóa</div>
            </div>
            {cartItems.length === 0 ? (
              <div className="empty-cart-container text-center">
                <FaShoppingCart className="empty-cart-icon" />
                <h4>Giỏ hàng của bạn đang trống</h4>
                <span>
                  <span>Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm nào! </span>
                  <span>
                    <Link to={`/product`}>
                      Quay lại trang sản phẩm

                    </Link>
                  </span>
                </span>

              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="cart-item-container">
                  <CartItem
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                  {item.relatedProducts && item.relatedProducts.length > 0 && (
                    <div className="related-products mt-3">
                      <h6>Sản phẩm kèm theo:</h6>
                      <RelatedProducts />
                    </div>
                  )}
                </div>
              ))
            )}

          </div>
          <div className='col-4'>
            <CartFooter cartItems={cartItems} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
