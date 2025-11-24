import axios from "axios";

const api_account = axios.create({
  baseURL: import.meta.env.VITE_ACCOUNT_URL,
});

api_account.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api_account;
