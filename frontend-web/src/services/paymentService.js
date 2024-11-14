import axios from 'axios';
import Cookies from 'js-cookie';

import { API_URL } from '../config/config';
export const fetchAdressProvince = async () => {
    try {

        const response = await axios.get(`https://vapi.vnappmob.com/api/province/`);
        return response.data;
    } catch (error) {
        console.log('Error: fetching address province', error);
        throw error;
    }
}

export const fetchAdressDistrict = async (Idprovinces) => {
    try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${Idprovinces}`);
        return response.data;
    } catch (error) {
        console.log('Error: fetching address district', error);
        throw error;
    }
}
export const fetchAdressWard = async (IDdistrict) => {
    try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${IDdistrict}`);
        return response.data;
    } catch (error) {
        console.log('Error: fetching address ward', error);
        throw error;
    }
}
export const fetchCreateOrder = async (orderData) => {
    try {
        const token = Cookies.get('authToken');

        const response = await axios.post(
            `${API_URL}/order/create`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        throw error;
    }
};