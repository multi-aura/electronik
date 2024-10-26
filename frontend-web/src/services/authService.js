import axios from 'axios';
import { API_URL } from '../config/config';
import Cookies from 'js-cookie';
export const login = async (username, password) => {
  try {
    Cookies.remove('authToken');
    localStorage.removeItem('user');
    const response = await axios.post(`${API_URL}/user/login`, {
      username,
      password,
    });
    const { token } = response.data.data; 
    Cookies.set('authToken', token, {
      expires: 1, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict', 
    });
    localStorage.setItem('user', JSON.stringify(response.data.data));


    return response.data.data; 
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    throw error; 
  }
};
export const register = async (fullname, username, email, password, phone, birthday, nation, province, gender) => {
  return axios.post(`${API_URL}/user/register`, {
    fullname,
    username,
    email,
    password,
    phone,
    birthday,
    nation,
    province,
    gender
  });
};
