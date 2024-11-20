import React from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();

    const handleCreateProduct = () => {
        navigate('/admin/ProductManagement/create'); // Điều hướng đến trang tạo sản phẩm
    };

    return (
        <div
            className="d-flex flex-wrap gap-2 mb-3 align-items-center"
            style={{
                borderBottom: "2px solid #ddd", /* Đường viền dưới */
                paddingBottom: "10px", /* Khoảng cách phía dưới */
            }}
        >
            <button className="btn btn-success btn-sm mx-1"  onClick={handleCreateProduct}>
                <i className="fas fa-plus-circle"></i> Tạo mới sản phẩm
            </button>
            <button className="btn btn-warning btn-sm mx-1">
                <i className="fas fa-file-upload"></i> Tải từ file
            </button>
            <button className="btn btn-info btn-sm mx-1 text-white">
                <i className="fas fa-print"></i> In dữ liệu
            </button>
            <button className="btn btn-success btn-sm mx-1">
                <i className="fas fa-file-excel"></i> Xuất Excel
            </button>
            <button className="btn btn-danger btn-sm mx-1">
                <i className="fas fa-file-pdf"></i> Xuất PDF
            </button>
            <button className="btn btn-secondary btn-sm mx-1">
                <i className="fas fa-trash-alt"></i> Xóa tất cả
            </button>
        </div>
    );
};

export default Header;
