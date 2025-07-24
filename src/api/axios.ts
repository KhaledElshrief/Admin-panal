import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mahfouzapp.com',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
