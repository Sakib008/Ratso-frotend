// Common API response structure
export interface ApiResponse<T = any> {
  success?: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Loading states
export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

// Common request states
export interface AsyncState<T = any> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
  lastFetch?: number;
}

// Generic async slice state
export interface AsyncSliceState<T> {
  items: T[];
  currentItem: T | null;
  loading: LoadingState;
  error: string | null;
  totalCount: number;
  currentPage: number;
  hasNextPage: boolean;
}
