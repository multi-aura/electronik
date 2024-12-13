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
    
        </div>
    );
};

export default Header;
