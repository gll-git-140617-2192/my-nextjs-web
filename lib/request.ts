import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";
import { getSession, signOut } from "next-auth/react";

const http = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 1. 请求拦截器：可以在这里统一处理 Token（如果需要的话）
http.interceptors.request.use(
  async (config) => {
    // 默认 NextAuth 使用 Cookie，浏览器会自动携带，无需手动处理 headers
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. 响应拦截器：处理过期与提醒
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 只要 HTTP 状态码为 2xx，就直接返回数据
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response) {
      const status = response.status;
      const errorData = response.data;

      switch (status) {
        case 401:
          // 🛡️ 登录过期处理
          message.error("登录已过期，请重新登录");
          // 强制登出并跳转，redirect: true 会清空所有客户端缓存
          signOut({ callbackUrl: "/login", redirect: true });
          break;

        case 403:
          message.error("抱歉，您没有权限执行此操作");
          break;

        case 500:
          message.error(errorData?.message || "服务器内部错误");
          break;

        default:
          message.error(errorData?.message || "网络请求异常");
          break;
      }
    } else {
      // 处理断网或超时
      message.error("无法连接到服务器，请检查您的网络");
    }

    return Promise.reject(error);
  }
);

/**
 * 封装便捷方法
 */
export const request = {
  get<T = any>(url: string, params?: object): Promise<T> {
    return http.get(url, { params });
  },
  post<T = any>(url: string, data?: object): Promise<T> {
    return http.post(url, data);
  },
  put<T = any>(url: string, data?: object): Promise<T> {
    return http.put(url, data);
  },
  delete<T = any>(url: string): Promise<T> {
    return http.delete(url);
  },
};

export default http;