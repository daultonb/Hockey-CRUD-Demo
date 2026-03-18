import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getWriteHeaders = () => ({
  "X-API-Key": process.env.REACT_APP_ADMIN_API_KEY ?? "",
});

export default apiClient;
