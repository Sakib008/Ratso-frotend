import axiosInstance from './axiosInstance';
import type {
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  RegisterResponse,
  EmailVerificationResponse,
  ChangePasswordPayload,
  ResetPasswordRequestPayload,
  ResetPasswordPayload,
  EmailVerificationPayload,
  User,
} from '../reduxStore/features/auth/types';
import type { ApiResponse } from '../types/api';

// Auth API endpoints - Updated for cookie-based authentication
export const authApi = {
  // Login user - backend sets httpOnly cookie and returns message
  login: async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosInstance.post('/auth/login', payload);
    return response.data;
  },

  // Register user - backend sends OTP and returns message
  register: async (payload: RegisterPayload): Promise<ApiResponse<RegisterResponse>> => {
    const response = await axiosInstance.post('/auth/signup', payload);
    return response.data;
  },

  // Verify email token - backend sets cookie after successful verification
  verifyEmail: async (payload: EmailVerificationPayload): Promise<ApiResponse<EmailVerificationResponse>> => {
    const response = await axiosInstance.post('/auth/verify-token', {
      email: payload.email,
      verificationToken: payload.token
    });
    return response.data;
  },

  // Get current user - uses cookie for authentication
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  // Logout user - backend clears httpOnly cookie
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },

  // Change password
  changePassword: async (payload: ChangePasswordPayload): Promise<ApiResponse<{ message: string }>> => {
    const response = await axiosInstance.post('/auth/change-password', payload);
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (payload: ResetPasswordRequestPayload): Promise<ApiResponse<{ message: string }>> => {
    const response = await axiosInstance.post('/auth/reset-password', payload);
    return response.data;
  },

  // Reset password with token
  resetPassword: async (payload: ResetPasswordPayload): Promise<ApiResponse<{ message: string }>> => {
    const response = await axiosInstance.post(`/auth/reset-password/${payload.token}`, {
      newPassword: payload.newPassword,
    });
    return response.data;
  },
};

// Export individual functions for backward compatibility
export const {
  login,
  register,
  logout,
  getCurrentUser: getUser,
  changePassword,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} = authApi;

export default authApi;
