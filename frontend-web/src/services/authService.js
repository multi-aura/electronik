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
export const register = async (formData) => {
  console.log("formData:", formData);
  const username = formData.username;
  const email = formData.email;
  const password = formData.password;
  const phone = formData.phone;
  const gender = formData.gender;


  return axios.post(`${API_URL}/user/register`, {
    username,
    email,
    password,
    phone,
    gender
  });
};

export const logout = async()=>
{
  try{
    Cookies.remove('authToken');
    localStorage.removeItem('user');

  }catch(error)
  {
    console.log("Lỗi đăng xuất:", error);
  }
};