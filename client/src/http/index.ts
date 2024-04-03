import axios, { AxiosResponse } from "axios";

interface SendOtpData {
  phone: string;
}

interface verifyOtpData {
  phone: string;
  hash: string;
  otp: string;
}

const api = axios.create({
  baseURL: "http://localhost:8000",
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

export default api;
