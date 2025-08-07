import axios from "axios";

const BASE_URL = 
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"  // Development URL
    : "https://mini-linkedin-backend-r10r.onrender.com/api/v1"; // Production URL (relative path since we're serving from same domain)

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

