import React from 'react';
import { Table } from 'react-bootstrap';

const ProductSpecifications = ({ specifications }) => {

    return (
        <div className="product-specifications ">
            <h4 className="mb-3">Thông Số Kỹ Thuật</h4>
            <Table striped hover responsive>
                <tbody>
                    {specifications && specifications.length > 0 ? (
                        specifications.map(spec => (
                            <tr key={spec._id}>
                                <td style={{ fontWeight: 'bold', width: '30%' }}>{spec.name}</td>
                                <td>{spec.value}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">Không có thông số kỹ thuật.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <style>{`
                .product-specifications table {
                    border: none;
                }
                .product-specifications th,
                .product-specifications td {
                    border: none; /* Loại bỏ border cho th và td */
                    padding: 8px; /* Tùy chỉnh khoảng cách */
                }
                .product-specifications tr:hover {
                    background-color: #f8f9fa; /* Màu nền khi hover */
                }
            `}</style>
        </div>
    );
};

export default ProductSpecifications;
