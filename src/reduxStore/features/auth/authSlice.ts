import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {
  User,
  LoginPayload,
  RegisterPayload,
  ChangePasswordPayload,
  ResetPasswordRequestPayload,
  ResetPasswordPayload,
  EmailVerificationPayload,
  // LoginResponse,
  // RegisterResponse,
  // EmailVerificationResponse,
} from './types';
import { authApi } from '../../../api/authApi';
import type { LoadingState, ApiError } from '../../../types/api';

// Auth state interface - no token needed for cookie-based auth
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: LoadingState;
  error: string | null;
  
  // Specific loading states for different operations
  loginLoading: boolean;
  registerLoading: boolean;
  logoutLoading: boolean;
  verifyEmailLoading: boolean;
  changePasswordLoading: boolean;
  resetPasswordLoading: boolean;
}

// Initial state - no token in state for cookie-based auth
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: 'idle',
  error: null,
  loginLoading: false,
  registerLoading: false,
  logoutLoading: false,
  verifyEmailLoading: false,
  changePasswordLoading: false,
  resetPasswordLoading: false,
};

// Async thunks for cookie-based authentication
export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await authApi.login(payload);
      if (response.success && response.data) {
        // After successful login, fetch the user data
        // The cookie is automatically set by the backend
        const userResult = await dispatch(getCurrentUser());
        if (getCurrentUser.fulfilled.match(userResult)) {
          return userResult.payload;
        }
        throw new Error('Failed to get user after login');
      }
      throw new Error(response.message || 'Login failed');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.register(payload);
      if (response.success) {
        return response.data; // Returns { message: string }
      }
      throw new Error(response.message || 'Registration failed');
    } catch (error : any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (payload: EmailVerificationPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await authApi.verifyEmail(payload);
      if (response.success && response.data && response.data.valid) {
        // After successful email verification, fetch the user data
        // The cookie is automatically set by the backend
        const userResult = await dispatch(getCurrentUser());
        if (getCurrentUser.fulfilled.match(userResult)) {
          return userResult.payload;
        }
        throw new Error('Failed to get user after email verification');
      }
      throw new Error(response.message || 'Email verification failed');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Email verification failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      // For cookie-based auth, just make the request
      // The cookie is automatically sent
      const response = await authApi.getCurrentUser();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to get user');
    } catch (error: any) {
      // No need to clear anything - cookies are handled by server
      return rejectWithValue(error.message || 'Failed to get user');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.logout();
      // Backend clears the httpOnly cookie
      return response.data; // Returns { message: string }
    } catch (error: any) {
      // Even if API call fails, the user should be logged out in UI
      // The cookie might already be expired anyway
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (payload: ChangePasswordPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.changePassword(payload);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Password change failed');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password change failed');
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (payload: ResetPasswordRequestPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.requestPasswordReset(payload);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Password reset request failed');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password reset request failed');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(payload);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.message || 'Password reset failed');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password reset failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Clear auth state (for manual logout or session expiry)
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Set user (for direct user updates)
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Login - now returns user data after successful login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload; // User data from getCurrentUser
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
        state.error = null;
        // Don't set user/token on registration - wait for email verification
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload as string;
      });

    // Email verification - now returns user data after successful verification
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmailLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifyEmailLoading = false;
        state.user = action.payload; // User data from getCurrentUser
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyEmailLoading = false;
        state.error = action.payload as string;
      });

    // Get current user
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        // Still clear auth even on error
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Change password
    builder
      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordLoading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordLoading = false;
        state.error = action.payload as string;
      });

    // Reset password request
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.resetPasswordLoading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.resetPasswordLoading = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.error = action.payload as string;
      });

    // Reset password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, clearAuth: clearAuthAction, setUser, setToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
