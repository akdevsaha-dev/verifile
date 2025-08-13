import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BACKEND_URL = "http://localhost:3001";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/v1/",
    withCredentials: true
});
