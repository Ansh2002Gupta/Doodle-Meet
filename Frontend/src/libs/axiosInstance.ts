import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true, // cookies will be send along with the request
});

export default axiosInstance;
