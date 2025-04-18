import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
// Optional: Add interceptors for handling tokens or errors
// api.interceptors.request.use(
//   (config) => {
//     // Example: Add auth token if needed
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally (e.g., 401 Unauthorized)
//     console.error('API error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

export default api;