import axios from 'axios';
import { API_URL } from '../config/config';
import Cookies from 'js-cookie';

export const fetchAllCategories = async () => {
    try {
        const token = Cookies.get('authToken');

        const response = await axios.get(`${API_URL}/category/all`, {

        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch categories');
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};