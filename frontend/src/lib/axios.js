import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "https://mini-linkedin-backend-r10r.onrender.com/api/v1"
    : "https://mini-linkedin-backend-r10r.onrender.com/api/v1"; // same for production

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
