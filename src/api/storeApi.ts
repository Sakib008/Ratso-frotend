import axiosInstance from './axiosInstance';
import type {
  Store,
  CreateStorePayload,
  UpdateStorePayload,
  StoreFilters,
  StoreStatus,
} from '../types/store';
import type { ApiResponse, PaginatedResponse } from '../types/api';

// Store API endpoints
export const storeApi = {
  // Get all stores with optional filters
  getStores: async (filters?: StoreFilters): Promise<ApiResponse<PaginatedResponse<Store>>> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const response = await axiosInstance.get(`/store${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  // Get store by ID
  getStoreById: async (id: number): Promise<ApiResponse<Store>> => {
    const response = await axiosInstance.get(`/store/${id}`);
    return response.data;
  },

  // Create new store (requires authentication)
  createStore: async (payload: CreateStorePayload): Promise<ApiResponse<Store>> => {
    const response = await axiosInstance.post('/store', payload);
    return response.data;
  },

  // Update store (requires authentication and ownership)
  updateStore: async (payload: UpdateStorePayload): Promise<ApiResponse<Store>> => {
    const { id, ...updateData } = payload;
    const response = await axiosInstance.put(`/store/${id}`, updateData);
    return response.data;
  },

  // Delete store (requires authentication and ownership)
  deleteStore: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await axiosInstance.delete(`/store/${id}`);
    return response.data;
  },

  // Get stores by owner (requires authentication)
  getMyStores: async (filters?: Omit<StoreFilters, 'ownerId'>): Promise<ApiResponse<PaginatedResponse<Store>>> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const response = await axiosInstance.get(`/store/my-stores${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  // Admin functions
  admin: {
    // Get pending stores for approval
    getPendingStores: async (): Promise<ApiResponse<Store[]>> => {
      const response = await axiosInstance.get('/store/admin/pending');
      return response.data;
    },

    // Approve store
    approveStore: async (id: number): Promise<ApiResponse<Store>> => {
      const response = await axiosInstance.patch(`/store/admin/${id}/approve`);
      return response.data;
    },

    // Reject store
    rejectStore: async (id: number, reason?: string): Promise<ApiResponse<Store>> => {
      const response = await axiosInstance.patch(`/store/admin/${id}/reject`, { reason });
      return response.data;
    },

    // Update store status
    updateStoreStatus: async (id: number, status: StoreStatus): Promise<ApiResponse<Store>> => {
      const response = await axiosInstance.patch(`/store/admin/${id}/status`, { status });
      return response.data;
    },
  },
};

// Export individual functions for backward compatibility
export const {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  getMyStores,
} = storeApi;

export default storeApi;
