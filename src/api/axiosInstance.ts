import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { ApiResponse, ApiError } from '../types/api';

// Create axios instance configured for cookie-based authentication
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is crucial for httpOnly cookies
});

// Request interceptor (minimal since cookies are handled automatically)
axiosInstance.interceptors.request.use(
  (config) => {
    // No need to manually add tokens - cookies are sent automatically
    // with withCredentials: true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common responses and errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Return the response directly
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    // Handle 401 errors (authentication failed or cookie expired)
    if (error.response?.status === 401) {
      // For cookie-based auth, we just need to redirect to login
      // The server will clear the cookie on logout or expiration
      if (typeof window !== 'undefined') {
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }

    // Transform error to consistent format
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      code: error.code,
    };

    return Promise.reject(apiError);
  }
);

// Helper function to check if user is authenticated by making a test request
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    await axiosInstance.get('/auth/me');
    return true;
  } catch (error) {
    return false;
  }
};

// No need for token management functions with httpOnly cookies
// The browser handles cookie storage and sending automatically

export default axiosInstance;
