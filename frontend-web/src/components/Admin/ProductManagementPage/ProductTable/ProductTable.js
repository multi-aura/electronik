// ProductTable.js
import React from 'react';
import ProductRow from './ProductRow/ProductRow';
import './ProductTable.css';

const ProductTable = ({ products }) => {
    return (
        <div className="custom-product-table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th scope="col"><input type="checkbox" /></th>
                        <th scope="col">Mã sản phẩm</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tình trạng</th>
                        <th scope="col">Giá tiền</th>
                        <th scope="col">Danh mục</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductRow key={product.id} product={product} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
