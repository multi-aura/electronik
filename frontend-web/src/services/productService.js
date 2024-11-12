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
