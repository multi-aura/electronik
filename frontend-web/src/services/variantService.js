import axios from 'axios';
import { API_URL } from '../config/config';
import Cookies from 'js-cookie';

const PRODUCT_URL = `${API_URL}/products`; 

export const addVariantToProduct = async (productId, variantData) => {
    try {

        const response = await axios.post(
           `${PRODUCT_URL}/${productId}/variants`, variantData
        );

        if (response.status === 200 || response.status === 201) {
            return response.data; 
        } else {
            throw new Error('Failed to create variant');
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