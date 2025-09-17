import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxStore/store';
import { getCurrentUser } from '../../reduxStore/features/auth/authSlice';
import { selectIsAuthenticated, selectAuthToken, selectAuthLoading } from '../../reduxStore/features/auth/selectors';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectAuthToken);
  const loading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    // If we have a token but no user, fetch the current user
    if (token && !isAuthenticated && loading === 'idle') {
      dispatch(getCurrentUser());
    }
  }, [token, isAuthenticated, loading, dispatch]);

  // Show loading screen while authenticating
  if (token && loading === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
