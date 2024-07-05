import axios from "axios";
import { getCookie } from "cookies-next";
import config from "./config";

const axiosClient = axios.create({
  baseURL: config.getConfig()?.baseurl,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = getCookie("TOKEN");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export { axiosClient };
