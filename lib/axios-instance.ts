import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  withCredentials: true, // Ensures cookies are sent with requests
});

// Request Interceptor: Attach Bearer Token (Only If Available)
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();
//     if (session?.accessToken) {
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
