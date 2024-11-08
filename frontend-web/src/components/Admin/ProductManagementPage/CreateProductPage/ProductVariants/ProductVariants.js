import React from 'react';
import { Table, Button } from 'react-bootstrap';
import './ProductVariants.css'; // Custom CSS for styling

const ProductVariants = ({ variants, handleVariantChange, addVariant, removeVariant }) => (
    <div className="product-variants-container">
        <h5 className="variants-header">Biến thể sản phẩm</h5>
        {variants.length > 0 ? (
            <Table bordered hover className="variant-table">
                <thead className="variant-table-header">
                    <tr>
                        <th>Color</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>SKU</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {variants.map((variant, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="color"
                                    value={variant.color}
                                    onChange={(e) => handleVariantChange(e, index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="stock"
                                    value={variant.stock}
                                    onChange={(e) => handleVariantChange(e, index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={variant.price}
                                    onChange={(e) => handleVariantChange(e, index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="sku"
                                    value={variant.sku}
                                    onChange={(e) => handleVariantChange(e, index)}
                                />
                            </td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => removeVariant(index)}
                                >
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        ) : (
            <p className="no-variants-message">Chưa có biến thể sản phẩm nào.</p>
        )}
        <Button variant="primary" onClick={addVariant} className="add-variant-btn">
            Thêm biến thể
        </Button>
    </div>
);

export default ProductVariants;
