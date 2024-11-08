import axios from 'axios';
import { API_URL } from '../config/config';

// Function to fetch analysis result from the API
const fetchAnalysisResult = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-analysis-result`);
        if (response.data && response.data.status === 'success') {
            return response.data.data.map((item) => ({
                itemset: item.itemset.map(id => id.replace(/[\[\]]/g, '')), // Clean up ID formatting
                utility: parseFloat(item.utility)
            }));
        } else {
            throw new Error('Failed to fetch analysis result');
        }
    } catch (error) {
        console.error('Error fetching analysis result:', error);
        throw error;
    }
};

const fetchProductBySerials = async (serials) => {
    try {
        console.log('Sending serials:', serials);

        const response = await axios.post(`${API_URL}/product/informationBySerial`,
            { serials: serials },
           
        );

        if (response.data && response.data.status === 200) {
            console.log('Product data retrieved:', response.data.data);

            return response.data.data;
        } else {
            throw new Error('Failed to fetch product information');
        }
    } catch (error) {
        console.error('Error fetching product information:', error);
        console.error('Error response data:', error.response?.data); // Log chi tiết về lỗi từ phía server
        throw error;
    }
};

const fetchEMHUNAnalysis = async (minUtility) => {
    try {
        const response = await axios.get(`${API_URL}/analysis-with-emhun`, {
            params: { minUtility }
        });
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data.map((item) => ({
                itemset: item.itemset.map(id => id.replace(/[\[\]]/g, '')), // Clean up ID formatting
                utility: parseFloat(item.utility)
            }));
        } else {
            throw new Error('Failed to fetch analysis result');
        }
    } catch (error) {
        console.error('Error fetching analysis result:', error);
        throw error;
    }
};

export { fetchAnalysisResult, fetchProductBySerials, fetchEMHUNAnalysis };
