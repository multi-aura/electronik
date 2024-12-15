import React from 'react';
import { Link } from 'react-router-dom';
import './RecommendedProducts.css';

const RecommendedProducts = ({ analysisResults, productData }) => {
    return (
        <div className="recommended-products-container">
            {analysisResults.map((result, index) => (
                <div key={index} className="result-item-card">


                    <p>Utility: {result.utility.toFixed(2)}</p>
                    <div className="product-grid">
                        {result.itemset.map((serial) => {
                            // Chuyển đổi serial từ kết quả phân tích thành chuỗi để đảm bảo cùng kiểu
                            const serialString = serial.toString().trim();
                            const product = productData?.find(p =>
                                p.variants?.some(v => {
                                    const variantSerial = v.serial.toString(); // Chuyển đổi serial từ API sang string
                                    const itemsetSerial = serial.toString(); // Chuyển đổi serial từ itemset sang string
                                    console.log(`Variant serial: ${variantSerial}, Itemset serial: ${itemsetSerial}`);
                                    return variantSerial === itemsetSerial;
                                })
                            );
                            

                            if (product) {
                                const variant = product.variants.find(v => v.serial.toString().trim() === serialString);
                                console.log(`Product found for serial ${serialString}:`, product);
                                return (
                                    <Link
                                    to={`/product/${product._id}`} // Sử dụng _id hoặc trường ID tương ứng
                                    key={serialString}
                                    className="product-card-link" // Bạn có thể thêm class để tùy chỉnh kiểu dáng
                                >
                                    <div className="product-card">
                                        <img
                                            src={variant?.images[0]?.url || product.default_image}
                                            alt={product.nameEn}
                                            className="product-img"
                                        />
                                        <div className="product-info">
                                            <p>Mã Serial: {serialString}</p>
                                            <h5>{product.nameEn}</h5>
                                        </div>
                                    </div>
                                </Link>
                                );
                            } else {
                                console.warn(`Product with serial ${serialString} not found`);
                                return <p key={serialString}>Product with serial {serialString} not found</p>;
                            }
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default RecommendedProducts;
