import React from 'react';
import './RecommendedProducts.css';
const RecommendedProducts = ({ analysisResults, productData }) => {
    return (
        <div className="recommended-products-container">
            {analysisResults.map((result, index) => (
                <div key={index} className="result-item-card">
                    <h4>Itemset: [{result.itemset.join(', ')}]</h4>
                    <p>Utility: {result.utility.toFixed(2)}</p>
                    <div className="product-grid">
                        {result.itemset.map((productId) => {
                            const product = productData.find(p => p.id === productId);
                            return (
                                <div key={productId} className="product-card">
                                    <img src={product.image} alt={product.name} className="product-img" />
                                    <div className="product-info">
                                        <p>Mã SP: {productId}</p>
                                        <h5>{product.name}</h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecommendedProducts;
