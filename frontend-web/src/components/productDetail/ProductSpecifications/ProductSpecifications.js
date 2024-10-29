import React from 'react';
import { Table } from 'react-bootstrap';

const ProductSpecifications = ({ 
    specifications = [
        { _id: '1', name: 'Kích thước', value: '30x20x5 cm' },
        { _id: '2', name: 'Trọng lượng', value: '500g' },
        { _id: '3', name: 'Màu sắc', value: 'Đen' },
        { _id: '4', name: 'Chất liệu', value: 'Nhôm và nhựa' },
        { _id: '5', name: 'Xuất xứ', value: 'Việt Nam' },
        { _id: '6', name: 'Bảo hành', value: '12 tháng' },
        { _id: '7', name: 'Công suất', value: '100W' },
        { _id: '8', name: 'Điện áp', value: '220V' },
        { _id: '9', name: 'Độ ồn', value: '65 dB' },
        { _id: '10', name: 'Tốc độ quay', value: '1200 RPM' },
        { _id: '11', name: 'Dung lượng pin', value: '5000mAh' },
        { _id: '12', name: 'Thời gian sạc', value: '3 giờ' },
        { _id: '13', name: 'Màn hình', value: '6.5 inch Full HD' },
        { _id: '14', name: 'Độ phân giải', value: '1080x2400 pixels' },
        { _id: '15', name: 'Bộ nhớ trong', value: '128GB' },
        { _id: '16', name: 'RAM', value: '8GB' },
        { _id: '17', name: 'Hệ điều hành', value: 'Android 11' },
        { _id: '18', name: 'Camera sau', value: '48MP + 8MP + 2MP' },
        { _id: '19', name: 'Camera trước', value: '16MP' },
        { _id: '20', name: 'Kết nối', value: 'Wi-Fi, Bluetooth 5.0, USB-C' },
    ] 
}) => (
    <div className="product-specifications mt-4">
        <h4 className="mb-3">Thông Số Kỹ Thuật</h4>
        <Table striped hover responsive>
            <tbody>
                {specifications.map(spec => (
                    <tr key={spec._id}>
                        <td style={{ fontWeight: 'bold', width: '30%' }}>{spec.name}</td>
                        <td>{spec.value}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <style jsx>{`
            .product-specifications table {
                border: none; /* Loại bỏ border */
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

export default ProductSpecifications;
