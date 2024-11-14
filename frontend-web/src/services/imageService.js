import axios from 'axios';
import { API_URL } from '../config/config';
import Cookies from 'js-cookie';

export const uploadImages = async (files) => {
    try {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append('images', file);
        });

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        const response = await axios.post(`${API_URL}/images/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.data; 
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};