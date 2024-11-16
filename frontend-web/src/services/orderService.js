import axios from 'axios';
import { API_URL } from '../config/config';
import Cookies from 'js-cookie';

export const fetchAllOrder = async (page = 1, limit = 10) => {
    try {

        const response = await axios.post(
            `${API_URL}/order/All`,
            { page, limit }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch order all');
        }
    } catch (error) {
        console.error('Error fetching order all:', error);
        throw error;
    }
};

export const fetchUpdateStatusOrder = async (order_id,status ) => {
    try {

        const response = await axios.put(
            `${API_URL}/order/updatestatusorder`,
            { order_id, status }
        );

        if (response.status === 200) {
            return response;
        } else {
            throw new Error('Failed to update order status');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};