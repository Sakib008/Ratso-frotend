import { configureStore } from '@reduxjs/toolkit';
import {  useDispatch, useSelector } from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
// Import reducers
import authReducer from './features/auth/authSlice';
import storeReducer from './features/stores/storeSlice';

// Configure store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Re-export User type from auth types
export type { User } from './features/auth/types';
