import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const createClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    // Enable sending cookies with requests
    withCredentials: true,
  });

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createClient();

export const request = async <T>(
  method: HttpMethod,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.request({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
};

export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  request<T>("GET", url, undefined, config);

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  request<T>("POST", url, data, config);

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  request<T>("PUT", url, data, config);

export const del = <T>(url: string, config?: AxiosRequestConfig) =>
  request<T>("DELETE", url, undefined, config);

export const patch = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => request<T>("PATCH", url, data, config);
