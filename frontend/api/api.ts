import env from '@/constant/env';
import axios from 'axios';

const api = axios.create({
  baseURL: env.url.backend_url,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export default api;
