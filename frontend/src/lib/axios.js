import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "https://mini-linkedin-backend-r10r.onrender.com/api/v1" : "/api/v1",
	withCredentials: true,
});