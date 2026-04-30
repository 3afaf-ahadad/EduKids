import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,   // send cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Automatically fetch CSRF cookie before any POST/PUT/DELETE request
api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
  }
  return config;
});

export default api;