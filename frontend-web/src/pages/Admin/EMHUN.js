// src/pages/Admin/EMHUN.js
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';
import AnalysisChart from '../../components/Admin/EMHUN/AnalysisChart/AnalysisChart';
import InputField from '../../components/Admin/EMHUN/InputField/InputField';
import RecommendedProducts from '../../components/Admin/EMHUN/RecommendedProducts/RecommendedProducts';

const EMHUN = () => {
    const [minUtility, setMinUtility] = useState(5000); 
    const [analysisResults, setAnalysisResults] = useState(null);

    // Dữ liệu sản phẩm mẫu
    const productData = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `ASUS Vivobook S 14 OLED - Sản phẩm ${index + 1}`,
        specs: ["Ultra i5 125H", "Intel Arc", "16GB", "512GB"],
        originalPrice: "26.990.000",
        discountedPrice: "24.290.000",
        discountPercentage: 10,
        image: "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
        ratingStars: 5,
        reviewCount: 10,
    }));

    // Hàm giả lập để sinh ra dữ liệu phân tích
    const calculateItemsets = (minUtility) => {
        const results = [
            { itemset: [4], utility: 28000.0 },
            { itemset: [4, 3], utility: 31000.0 },
            { itemset: [4, 3, 5], utility: 37000.0 },
            { itemset: [4, 3, 5, 2], utility: 27000.0 },
            { itemset: [4, 5], utility: 37000.0 },
            { itemset: [4, 5, 2], utility: 31000.0 },
            { itemset: [4, 5, 2, 6], utility: 25000.0 },
            { itemset: [4, 2], utility: 25000.0 },
        ];

        // Lọc kết quả dựa trên giá trị minUtility
        return results.filter(item => item.utility >= minUtility);
    };

    // Hàm xử lý khi nhấn nút "Phân Tích"
    const handleAnalyze = () => {
        const results = calculateItemsets(minUtility);
        setAnalysisResults(results);
    };

    return (
        <AdminLayout>
            <div className="emhun-container">
                <h2>Phân Tích EMHUN</h2>

                {/* Biểu đồ phân tích */}
                <AnalysisChart data={analysisResults} />

                {/* Ô nhập min utility và nút phân tích */}
                <InputField minUtility={minUtility} setMinUtility={setMinUtility} handleAnalyze={handleAnalyze} />

                {/* Hiển thị danh sách kết quả phân tích */}
                <div className="analysis-results">
                    <h3>Kết Quả Phân Tích</h3>
                    {analysisResults && analysisResults.length > 0 ? (
                        <RecommendedProducts analysisResults={analysisResults} productData={productData} />
                    ) : (
                        <p>Không có dữ liệu để hiển thị</p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default EMHUN;
