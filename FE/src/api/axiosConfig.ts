import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Biến để kiểm soát việc redirect (tránh redirect lặp lại)
let isRedirecting = false;

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

// Xử lý lỗi response (ví dụ: 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      console.log("Token không hợp lệ hoặc hết hạn:", error.response.config.url);
      isRedirecting = true; // Đánh dấu đang redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect khi token hết hạn
    }
    return Promise.reject(error);
  }
);

export default api;