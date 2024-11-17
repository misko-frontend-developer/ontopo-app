import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_APPLICATION_BACKEND_URL as string,
  timeout: 10000,
});

http.interceptors.request.use(
  (config: any): InternalAxiosRequestConfig => {
    const token: string | null = sessionStorage.getItem("jwt_token");

    if (token) {
      config.headers = {
        ...config.headers,
        token,
      };
    }

    if (config.url === "/search_token") {
      //fix the data we use for this call.
      config.data = {
        ...config.data,
        marketplace_id: "15380287",
        locale: "en",
        geocodes: ["belgrade"],
      };
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default http;
