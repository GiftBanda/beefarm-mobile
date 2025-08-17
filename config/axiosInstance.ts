import axios from 'axios';

const BACKEND_API_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`;

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL, // Replace with your actual API base URL
  timeout: 10000, // Optional: Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers as needed, e.g., Authorization tokens
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here, e.g., redirect to login on 401
    return Promise.reject(error);
  }
);

export default axiosInstance;