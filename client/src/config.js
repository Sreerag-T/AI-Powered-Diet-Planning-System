const token = localStorage.getItem('token');

export const base = "https://ai-powered-diet-planning-system.onrender.com/";

const config = {
    headers: {
      'x-auth-token': token,
    },
  };

export default config;