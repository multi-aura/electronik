import axios from 'axios';
import { API_URL } from '../config/config';


export const fetchProductsByCategory = async (categoryId, page, limit) => {
    try {
        const response = await axios.post(
            `${API_URL}/product/category/${categoryId}`,
            { page, limit } // Thêm dữ liệu `body` như trong Postman
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch products');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        }
        console.error('Error fetching products by category:', error);
        throw error;
    }
};
export const fetchProductDetailsByID = async (productID) => {
    try {
        const response = await axios.post(`${API_URL}/product/${productID}`);
        if (response.status === 200) {
            return response.data;
        }
        else {
            console.log('Failed to fetch product details');
        }
    } catch (error) {
        console.log('Error fetching product Details by iD:', error);
        throw error;
    }
}

export const fetchProductBySimilar = async (productID, limit = 4) => {
    try {
        const response = await axios.get(`${API_URL}/product/similar?id=${productID}&limit=${limit}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log('Failed to fetch similar products');
        }
    } catch (error) {
        console.log('Error fetching similar products:', error);
        throw error;
    }
};


export const fetchProductNoQuery = async (page = 1, limit = 10) => {
    try {
        const response = await axios.post(
            `${API_URL}/product/search`,
            { page, limit }
        );
        return response.data; 
    } catch (error) {
        console.error('Error fetching product no query:', error);
        throw error; // Ném lỗi ra để xử lý bên ngoài nếu cần
    }
};
