// frontend/src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ai-powered-diet-planning-system.onrender.com/api',
});

export default instance;