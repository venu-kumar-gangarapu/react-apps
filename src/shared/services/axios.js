import axios from "axios";

const api = axios.create({
    baseURL: "https://order-now-app-api.onrender.com/ordernowApi/v1",
});

export default api;