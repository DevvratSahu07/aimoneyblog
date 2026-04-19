import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
});

export const getPosts = (params = {}) => api.get('/posts', { params });
export const getPost = (slug) => api.get(`/posts/${slug}`);
export const getPopularPosts = () => api.get('/posts/popular');
export const getCategories = () => api.get('/categories');
export const getResources = (category) => api.get('/resources', { params: { category } });
export const getFAQs = () => api.get('/faqs');
export const getStats = () => api.get('/stats');
export const subscribe = (data) => api.post('/subscribe', data);
export const sendContact = (data) => api.post('/contact', data);

export default api;
