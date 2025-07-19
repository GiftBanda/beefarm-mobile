// api.ts
import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.EXPO_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;