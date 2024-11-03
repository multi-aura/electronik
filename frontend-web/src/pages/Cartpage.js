import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import CartItem from '../components/CartPage/CartItem/CartItem';
import CartFooter from '../components/CartPage/CartFooter/CartFooter';
import FreeShippingProgress from '../components/CartPage/FreeShippingProgress/FreeShippingProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Laptop Gaming - High Performance",
      price: 22500000,
      quantity: 1,
      image: "https://product.hstatic.net/200000722513/product/ava_e10fafc0165e4a2cb5380668574e512d.png",
      brand: "Asus ROG",
      relatedProducts: [
        {
          id: 201,
          name: "Gaming Mouse",
          discountedPrice: 500000,
          originalPrice: 800000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "201-1",
              name: "Gaming Mouse - Black",
              discountedPrice: 500000,
              originalPrice: 800000,
              image: "https://product.hstatic.net/200000722513/product/black_mouse_variant.png",
            },
            {
              id: "201-2",
              name: "Gaming Mouse - White",
              discountedPrice: 520000,
              originalPrice: 850000,
              image: "https://product.hstatic.net/200000722513/product/white_mouse_variant.png",
            },
          ]
        },
        {
          id: 202,
          name: "Mechanical Keyboard",
          discountedPrice: 1500000,
          originalPrice: 2000000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "202-1",
              name: "Mechanical Keyboard - Red Switch",
              discountedPrice: 1500000,
              originalPrice: 2000000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",

            },
            {
              id: "202-2",
              name: "Mechanical Keyboard - Blue Switch",
              discountedPrice: 1550000,
              originalPrice: 2100000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",

            },
          ]
        },
      ]
    },
    {
      id: 2,
      name: "Smartphone Pro Max",
      price: 30000000,
      quantity: 2,
      image: "https://product.hstatic.net/200000722513/product/ava_e10fafc0165e4a2cb5380668574e512d.png",
      brand: "iPhone",
      relatedProducts: [
        {
          id: 204,
          name: "Wireless Charger",
          discountedPrice: 600000,
          originalPrice: 900000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "204-1",
              name: "Wireless Charger - 10W",
              discountedPrice: 600000,
              originalPrice: 900000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
            {
              id: "204-2",
              name: "Wireless Charger - 15W",
              discountedPrice: 650000,
              originalPrice: 950000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
          ]
        },
        {
          id: 205,
          name: "Protective Case",
          discountedPrice: 150000,
          originalPrice: 300000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "205-1",
              name: "Protective Case - Black",
              discountedPrice: 150000,
              originalPrice: 300000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
            {
              id: "205-2",
              name: "Protective Case - Transparent",
              discountedPrice: 160000,
              originalPrice: 320000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
          ]
        },
        {
          id: 204,
          name: "Wireless Charger",
          discountedPrice: 600000,
          originalPrice: 900000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "204-1",
              name: "Wireless Charger - 10W",
              discountedPrice: 600000,
              originalPrice: 900000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
            {
              id: "204-2",
              name: "Wireless Charger - 15W",
              discountedPrice: 650000,
              originalPrice: 950000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
          ]
        }, {
          id: 204,
          name: "Wireless Charger",
          discountedPrice: 600000,
          originalPrice: 900000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "204-1",
              name: "Wireless Charger - 10W",
              discountedPrice: 600000,
              originalPrice: 900000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
            {
              id: "204-2",
              name: "Wireless Charger - 15W",
              discountedPrice: 650000,
              originalPrice: 950000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
          ]
        }, {
          id: 204,
          name: "Wireless Charger",
          discountedPrice: 600000,
          originalPrice: 900000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "204-1",
              name: "Wireless Charger - 10W",
              discountedPrice: 600000,
              originalPrice: 900000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
            {
              id: "204-2",
              name: "Wireless Charger - 15W",
              discountedPrice: 650000,
              originalPrice: 950000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Smart TV 4K Ultra HD",
      price: 18000000,
      quantity: 1,
      image: "https://product.hstatic.net/200000722513/product/ava_e10fafc0165e4a2cb5380668574e512d.png",
      brand: "Samsung",
      relatedProducts: [
        {
          id: 207,
          name: "Soundbar",
          discountedPrice: 2500000,
          originalPrice: 3000000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "207-1",
              name: "Soundbar - Black",
              discountedPrice: 2500000,
              originalPrice: 3000000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
            {
              id: "207-2",
              name: "Soundbar - White",
              discountedPrice: 2550000,
              originalPrice: 3050000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
          ]
        },
        {
          id: 208,
          name: "Wall Mount Bracket",
          discountedPrice: 400000,
          originalPrice: 700000,
          image: "https://product.hstatic.net/200000722513/product/171679380513_7f4f7182629244cbb2da1ab6123ad183_grande.png",
          variants: [
            {
              id: "208-1",
              name: "Wall Mount - Small",
              discountedPrice: 380000,
              originalPrice: 700000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",
            },
            {
              id: "208-2",
              name: "Wall Mount - Large",
              discountedPrice: 400000,
              originalPrice: 750000,
              image: "https://product.hstatic.net/200000722513/product/artboard_1_d8717d1e98e249fab1a09833bf8cd654_medium.png",

            },
          ]
        },
      ]
    },
  ]);

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="container cart-page mt-5">
        <div className='row'>
          <div className='col-8'>
            <h2 className="text-center mb-4">Giỏ Hàng</h2>

            <FreeShippingProgress subtotal={subtotal} freeShippingThreshold={500000} />

            <div className="row text-center fw-bold py-3 border-bottom">
              <div className="col-6 col-md-4">Sản Phẩm</div>
              <div className="col-2">Giá</div>
              <div className="col-2">Số Lượng</div>
              <div className="col-2">Tổng</div>
              <div className="col-1">Xóa</div>
            </div>

            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                relatedProducts={item.relatedProducts}  // Truyền danh sách sản phẩm mua kèm
              />
            ))}
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
