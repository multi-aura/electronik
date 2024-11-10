import axios from 'axios';
import { API_URL } from '../config/config';
export const productListPageALL = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-analysis-result`);

    } catch (error) {
        console.log('Error product list page all', error);
    }
}