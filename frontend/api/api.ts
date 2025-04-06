import env from '@/constant/env';
import axios from 'axios';

const api = axios.create({
  baseURL: env.url.backend_url,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;

  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default api;
