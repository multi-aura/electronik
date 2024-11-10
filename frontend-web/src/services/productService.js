import axios from 'axios';
import { API_URL } from '../config/config';
import Cookies from 'js-cookie';

export const fetchProductsByCategory = async (categoryId, page = 1, limit = 10) => {
    try {
        const authToken = Cookies.get('authToken'); // Get the token if needed

        const response = await axios.post(
            `${API_URL}/product/category/${categoryId}`,
            { page, limit },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Include the token if needed for authentication
                },
                withCredentials: true, // Include cookies in the request
            }
        );

        if (response.status === 200) {
            console.log('Products fetched successfully:', response.data);
            return response.data; // Adjust this if you need to return `response.data.data` or any specific part of the response
        } else {
            throw new Error('Failed to fetch products');
        }
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};