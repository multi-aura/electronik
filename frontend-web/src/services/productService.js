import axios from 'axios';
import { API_URL } from '../config/config';
import Cookies from 'js-cookie';


export const fetchProductsByCategory = async (categoryId, page, limit) => {
    try {

        const response = await axios.post(
            `${API_URL}/product/category/${categoryId}`,
            { page, limit }
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

        if (!response || !response.data) {
            throw new Error('Dữ liệu phản hồi không hợp lệ hoặc rỗng');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching product no query:', error);

        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('Request made but no response received:', error.request);
        } else {
            console.error('Error message:', error.message);
        }

        throw error; // Ném lỗi ra để xử lý ở nơi gọi hàm nếu cần
    }
};
export const fetchProductALL = async () => {
    try {
        const response = await axios.get(`${API_URL}/product/All`);

        if (response.status !== 200) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Ném lỗi ra ngoài để có thể xử lý tiếp nếu cần
    }
};


export const fetchProductRecommend = async (serial) => {
    try {
        const response = await axios.post(`${API_URL}/recommend`, null, {
            params: { serials: serial },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            const data = response.data.data;
            const serials = data[0]?.remainingItems || [];
            return serials;
        } else {
            console.log('Error: Failed to get product recommendations.');
            return null;
        }
    } catch (error) {
        console.error('Error: Fetching product recommendations', error);
        throw error;
    }
};


export const fetchProductBySerial = async (serials) => {
    try {
        const response = await axios.post(
            `${API_URL}/product/informationBySerial`,
            { serials }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            console.log('Error: Failed to get product recommendations.');
            return null;
        }
    } catch (error) {
        console.error('Error: Fetching product recommendations', error);
        throw error;
    }
};
export const fetchProductsBySearch = async (page, limit) => {
    try {
        const response = await axios.post(
            `${API_URL}/product/search`,
            {
                page,
                limit,
            }
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
        console.error('Error fetching products by search:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const token = Cookies.get('authToken');
        const response = await axios.post(
            `${API_URL}/product/create`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error('Failed to create product');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        }
        console.error('Error creating product:', error);
        throw error;
    }
};
export const updateProduct = async (productData) => {
    try {
        console.log('Payload to update:', productData);

        const token = Cookies.get('authToken');
        const response = await axios.put(
            `${API_URL}/product/update`,
            productData,
            {
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`,  
                },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error('Failed to update product');
        }
    } catch (error) {
        // Log error details
        if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        }
        console.error('Error updating product:', error.message);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const token = Cookies.get('authToken');
        const response = await axios.put(
            `${API_URL}/product/delete/${productId}`,
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200 || response.status === 204) {
            return response.data;
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        }
        console.error('Error deleting product:', error);
        throw error;
    }
};
