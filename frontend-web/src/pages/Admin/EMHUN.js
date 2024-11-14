import React, { useState , useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';
import AnalysisChart from '../../components/Admin/EMHUN/AnalysisChart/AnalysisChart';
import InputField from '../../components/Admin/EMHUN/InputField/InputField';
import RecommendedProducts from '../../components/Admin/EMHUN/RecommendedProducts/RecommendedProducts';
import { fetchAnalysisResult, fetchProductBySerials,fetchEMHUNAnalysis } from '../../services/emhunService';
const EMHUN = () => {
    const [minUtility, setMinUtility] = useState(() => {
        const savedMinUtility = localStorage.getItem('minUtility');
        return savedMinUtility ? Number(savedMinUtility) : 5000;
    });
    const [analysisResults, setAnalysisResults] = useState([]);
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        setIsLoading(true);
        try {
            window.alert('Phân tích đang được thực hiện. Vui lòng chờ...');
            localStorage.setItem('minUtility', minUtility);

            const results = await fetchEMHUNAnalysis(minUtility);
            setAnalysisResults(results);
            console.log('Analysis Results:', results);

            const serials = results.flatMap(result => result.itemset);
            console.log('Extracted serials:', serials);

            if (serials.length > 0) {
                const formattedSerials = serials.map(serial => serial.toString());
                console.log('Formatted serials:', formattedSerials);

                const productInfo = await fetchProductBySerials(formattedSerials);
                setProductData(productInfo);
                console.log('Product Information:', productInfo);
            } else {
                console.log('No serials found to fetch product information');
            }
        } catch (error) {
            console.error('Error fetching analysis or product data:', error);
        } finally {
            console.log("Setting isLoading to false");
            setIsLoading(false); 
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {

                const results = await fetchAnalysisResult();
                setAnalysisResults(results);
                console.log('Analysis Results:', results);
    
                const serials = results.flatMap(result => result.itemset);
                console.log('Extracted serials:', serials);
    
                if (serials.length > 0) {
                    const formattedSerials = serials.map(serial => serial.toString());
                    console.log('Formatted serials:', formattedSerials);
    
                    const productInfo = await fetchProductBySerials(formattedSerials);
                    setProductData(productInfo);
                    console.log('Product Information:', productInfo);
                } else {
                    console.log('No serials found to fetch product information');
                }
            } catch (error) {
                console.error('Error fetching analysis or product data:', error);
            }
        };
    
        getData();

        const interval = setInterval(() => {
            getData();
        }, 10000); 

        return () => clearInterval(interval);
    }, []);
    
    

    return (
        <AdminLayout>
            <div className="emhun-container">
                <h2>Phân Tích EMHUN</h2>

                <AnalysisChart data={analysisResults} />

                <InputField 
                    minUtility={minUtility} 
                    setMinUtility={setMinUtility} 
                    handleAnalyze={handleAnalyze} 
                    isLoading={isLoading} 
                />
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
