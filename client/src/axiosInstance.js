import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ai-powered-diet-planning-system.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;