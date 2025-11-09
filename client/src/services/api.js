import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Posts API
export const postsAPI = {
  getAll: (page = 1, limit = 10) => 
    api.get(`/posts?page=${page}&limit=${limit}`),
  
  getById: (id) => 
    api.get(`/posts/${id}`),
  
  create: (postData) => 
    api.post('/posts', postData),
  
  update: (id, postData) => 
    api.put(`/posts/${id}`, postData),
  
  delete: (id) => 
    api.delete(`/posts/${id}`),
  
  getByCategory: (categoryId) => 
    api.get(`/posts/category/${categoryId}`)
};

// Categories API
export const categoriesAPI = {
  getAll: () => 
    api.get('/categories'),
  
  create: (categoryData) => 
    api.post('/categories', categoryData)
};

// Auth API
export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  getMe: () => 
    api.get('/auth/me')
};

export default api;