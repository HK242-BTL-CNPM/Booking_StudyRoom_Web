import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log("Đã thêm token vào header:", token);
    } else {
      console.log("Không tìm thấy token trong localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;