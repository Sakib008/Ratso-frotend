import axios, { Axios } from "axios";


const axiosInstance : Axios = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true as boolean,
  },
});

export default axiosInstance;