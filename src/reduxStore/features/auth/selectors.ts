import type { RootState } from '../../store';

// Auth selectors
export const selectAuth = (state: RootState) => state.auth;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Specific loading states
export const selectLoginLoading = (state: RootState) => state.auth.loginLoading;
export const selectRegisterLoading = (state: RootState) => state.auth.registerLoading;
export const selectLogoutLoading = (state: RootState) => state.auth.logoutLoading;
export const selectVerifyEmailLoading = (state: RootState) => state.auth.verifyEmailLoading;
export const selectChangePasswordLoading = (state: RootState) => state.auth.changePasswordLoading;
export const selectResetPasswordLoading = (state: RootState) => state.auth.resetPasswordLoading;

// User role and permissions
export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === 'ADMIN';
export const selectIsStoreOwner = (state: RootState) => state.auth.user?.role === 'STORE_OWNER';
export const selectIsEmailVerified = (state: RootState) => state.auth.user?.isEmailVerified;

// Combined selectors
export const selectIsAuthenticatedAndVerified = (state: RootState) => 
  state.auth.isAuthenticated && state.auth.user?.isEmailVerified;

export const selectCanManageStores = (state: RootState) => 
  state.auth.user?.role === 'ADMIN' || state.auth.user?.role === 'STORE_OWNER';
