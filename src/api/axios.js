import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const customerToken = localStorage.getItem('customerToken');
  const adminToken = localStorage.getItem('adminToken');

  if (adminToken && config.url.startsWith('/api/admin')) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (customerToken && config.url.startsWith('/api/user')) {
    config.headers.Authorization = `Bearer ${customerToken}`;
  }

  return config;
});

export default api;
