import axios, { AxiosResponse } from "axios";

interface SendOtpData {
  phone: string;
}

interface verifyOtpData {
  phone: string;
  hash: string;
  otp: string;
}

interface activateData {
  name: string;
  avatar: string;
}

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Update the type of the 'data' parameter
export const sendOtp = (data: SendOtpData): Promise<AxiosResponse> =>
  api.post("/api/v1/send-otp", data);

export const verifyOtp = (data: verifyOtpData): Promise<AxiosResponse> =>
  api.post("/api/v1/verify-otp", data);

export const activate = (data: activateData): Promise<AxiosResponse> =>
  api.post("/api/v1/activate", data);

export const logout = (): Promise<AxiosResponse> => api.post("/api/v1/logout");

// Interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`http://localhost:8000/api/v1/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    throw error;
  }
);

export default api;
