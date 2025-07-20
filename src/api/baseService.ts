import axios from "axios";
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/";

export const baseService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

baseService.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('__session');


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);