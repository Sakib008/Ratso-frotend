// User roles enum
type UserRole = 'user'| 'storeOwner'| 'admin';

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  profilePic?: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Authentication payloads
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  address: string;
  password: string;
  profilePic?: string;
  role?: UserRole;
}

// Password management types
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequestPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// Email verification - backend expects both email and verificationToken
export interface EmailVerificationPayload {
  email: string;
  token: string;
}

// Auth response types
export interface AuthResponse {
  message: string;
  valid?: boolean;
}

// Login response
export interface LoginResponse {
  message: string;
}

// Registration response
export interface RegisterResponse {
  message: string;
}

// Email verification response
export interface EmailVerificationResponse {
  message: string;
  valid: boolean;
}
