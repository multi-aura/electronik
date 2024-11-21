import axios from 'axios';
import { API_URL } from '../config/config';


export const fetchAllSale = async ( page, limit) => {
    try {
        
        const response = await axios.post(
            `${API_URL}/sale/all/`,
            { page, limit }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch sales');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response status:', error.response.status);
        }
        console.error('Error fetching sale:', error);
        throw error;
    }
};
export const SaveSale = async ( sale) => {
    console.log(sale);
    try {
        
        const response = await axios.post(
            `${API_URL}/sale/create/`,
            sale
        );

        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error('Failed to add sales');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response status:', error.response.status);
        }
        console.error('Error save sale:', error);
        throw error;
    }
};
export const GetSaleByID = async (id) => {
    try {
        
        const response = await axios.get(
            `${API_URL}/sale/${id}`
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to add sales');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response status:', error.response.status);
        }
        console.error('Error save sale:', error);
        throw error;
    }
};

export const UpdateSale = async ( sale) => {
    try {
        
        const response = await axios.put(
            `${API_URL}/sale/update/`,
            sale
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update sales');
        }
    } catch (error) {
     
        console.error('Error update sale:', error);
        throw error;
    }
};
export const DeleteSale = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/sale/delete/${id}`);

            return response;
    } catch (error) {
     
        console.error('Error delete sale:', error);
        throw error;
    }
};

export const AddProductSale = async ( product) => {
    try {
        
        const response = await axios.post(
            `${API_URL}/sale/addproducts/`,
            product
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to add product sales');
        }
    } catch (error) {
     
        console.error('Error add product sale:', error);
        throw error;
    }
};