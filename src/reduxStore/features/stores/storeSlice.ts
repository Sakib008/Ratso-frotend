import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import type { PayloadAction} from "@reduxjs/toolkit"
import  type {
  Store,
  CreateStorePayload,
  UpdateStorePayload,
  StoreFilters,
} from '../../../types/store';
import { StoreStatus } from '../../../types/store';
import { storeApi } from '../../../api/storeApi';
import type { LoadingState, AsyncSliceState } from '../../../types/api';

// Store state interface
interface StoreState extends AsyncSliceState<Store> {
  // Additional specific loading states
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  
  // My stores (for store owners)
  myStores: Store[];
  myStoresLoading: boolean;
  
  // Admin functionality
  pendingStores: Store[];
  pendingStoresLoading: boolean;
  approveLoading: boolean;
  rejectLoading: boolean;
  
  // Filters and search
  filters: StoreFilters;
  searchResults: Store[];
  searchLoading: boolean;
}

// Initial state
const initialState: StoreState = {
  items: [],
  currentItem: null,
  loading: 'idle' as LoadingState,
  error: null,
  totalCount: 0,
  currentPage: 1,
  hasNextPage: false,
  
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  
  myStores: [],
  myStoresLoading: false,
  
  pendingStores: [],
  pendingStoresLoading: false,
  approveLoading: false,
  rejectLoading: false,
  
  filters: {},
  searchResults: [],
  searchLoading: false,
};

// Async thunks
export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async (filters?: StoreFilters, { rejectWithValue }) => {
    try {
      const response = await storeApi.getStores(filters);
      if (response.success && response.data) {
        return {
          stores: response.data.data,
          pagination: response.data.pagination,
        };
      }
      throw new Error(response.message || 'Failed to fetch stores');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch stores');
    }
  }
);

export const fetchStoreById = createAsyncThunk(
  'stores/fetchStoreById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await storeApi.getStoreById(id);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch store');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch store');
    }
  }
);

export const createStore = createAsyncThunk(
  'stores/createStore',
  async (payload: CreateStorePayload, { rejectWithValue }) => {
    try {
      const response = await storeApi.createStore(payload);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to create store');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create store');
    }
  }
);

export const updateStore = createAsyncThunk(
  'stores/updateStore',
  async (payload: UpdateStorePayload, { rejectWithValue }) => {
    try {
      const response = await storeApi.updateStore(payload);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to update store');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update store');
    }
  }
);

export const deleteStore = createAsyncThunk(
  'stores/deleteStore',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await storeApi.deleteStore(id);
      if (response.success) {
        return id;
      }
      throw new Error(response.message || 'Failed to delete store');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete store');
    }
  }
);

export const fetchMyStores = createAsyncThunk(
  'stores/fetchMyStores',
  async (filters?: Omit<StoreFilters, 'ownerId'>, { rejectWithValue }) => {
    try {
      const response = await storeApi.getMyStores(filters);
      if (response.success && response.data) {
        return response.data.data;
      }
      throw new Error(response.message || 'Failed to fetch my stores');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch my stores');
    }
  }
);

// Admin thunks
export const fetchPendingStores = createAsyncThunk(
  'stores/fetchPendingStores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await storeApi.admin.getPendingStores();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch pending stores');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch pending stores');
    }
  }
);

export const approveStore = createAsyncThunk(
  'stores/approveStore',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await storeApi.admin.approveStore(id);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to approve store');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to approve store');
    }
  }
);

export const rejectStore = createAsyncThunk(
  'stores/rejectStore',
  async ({ id, reason }: { id: number; reason?: string }, { rejectWithValue }) => {
    try {
      const response = await storeApi.admin.rejectStore(id, reason);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to reject store');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to reject store');
    }
  }
);

export const updateStoreStatus = createAsyncThunk(
  'stores/updateStoreStatus',
  async ({ id, status }: { id: number; status: StoreStatus }, { rejectWithValue }) => {
    try {
      const response = await storeApi.admin.updateStoreStatus(id, status);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to update store status');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update store status');
    }
  }
);

// Search thunk
export const searchStores = createAsyncThunk(
  'stores/searchStores',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const filters: StoreFilters = { search: searchTerm, status: StoreStatus.APPROVED };
      const response = await storeApi.getStores(filters);
      if (response.success && response.data) {
        return response.data.data;
      }
      throw new Error(response.message || 'Failed to search stores');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search stores');
    }
  }
);

// Store slice
const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Clear current store
    clearCurrentStore: (state) => {
      state.currentItem = null;
    },
    
    // Set filters
    setFilters: (state, action: PayloadAction<StoreFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filters = {};
    },
    
    // Clear search results
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    
    // Update store in list (for optimistic updates)
    updateStoreInList: (state, action: PayloadAction<Store>) => {
      const index = state.items.findIndex(store => store.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      
      // Also update in my stores if present
      const myStoreIndex = state.myStores.findIndex(store => store.id === action.payload.id);
      if (myStoreIndex !== -1) {
        state.myStores[myStoreIndex] = action.payload;
      }
      
      // Update current item if it's the same
      if (state.currentItem?.id === action.payload.id) {
        state.currentItem = action.payload;
      }
    },
    
    // Remove store from list (for optimistic updates)
    removeStoreFromList: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(store => store.id !== action.payload);
      state.myStores = state.myStores.filter(store => store.id !== action.payload);
      if (state.currentItem?.id === action.payload) {
        state.currentItem = null;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch stores
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload.stores;
        state.totalCount = action.payload.pagination.total;
        state.currentPage = action.payload.pagination.page;
        state.hasNextPage = action.payload.pagination.page < action.payload.pagination.totalPages;
        state.error = null;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });

    // Fetch store by ID
    builder
      .addCase(fetchStoreById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentItem = action.payload;
        state.error = null;
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });

    // Create store
    builder
      .addCase(createStore.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.createLoading = false;
        state.items.unshift(action.payload);
        state.myStores.unshift(action.payload);
        state.error = null;
      })
      .addCase(createStore.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload as string;
      });

    // Update store
    builder
      .addCase(updateStore.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.updateLoading = false;
        storeSlice.caseReducers.updateStoreInList(state, { payload: action.payload, type: 'updateStoreInList' });
        state.error = null;
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
      });

    // Delete store
    builder
      .addCase(deleteStore.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.deleteLoading = false;
        storeSlice.caseReducers.removeStoreFromList(state, { payload: action.payload, type: 'removeStoreFromList' });
        state.error = null;
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
      });

    // Fetch my stores
    builder
      .addCase(fetchMyStores.pending, (state) => {
        state.myStoresLoading = true;
        state.error = null;
      })
      .addCase(fetchMyStores.fulfilled, (state, action) => {
        state.myStoresLoading = false;
        state.myStores = action.payload;
        state.error = null;
      })
      .addCase(fetchMyStores.rejected, (state, action) => {
        state.myStoresLoading = false;
        state.error = action.payload as string;
      });

    // Admin: Fetch pending stores
    builder
      .addCase(fetchPendingStores.pending, (state) => {
        state.pendingStoresLoading = true;
        state.error = null;
      })
      .addCase(fetchPendingStores.fulfilled, (state, action) => {
        state.pendingStoresLoading = false;
        state.pendingStores = action.payload;
        state.error = null;
      })
      .addCase(fetchPendingStores.rejected, (state, action) => {
        state.pendingStoresLoading = false;
        state.error = action.payload as string;
      });

    // Admin: Approve store
    builder
      .addCase(approveStore.pending, (state) => {
        state.approveLoading = true;
        state.error = null;
      })
      .addCase(approveStore.fulfilled, (state, action) => {
        state.approveLoading = false;
        // Remove from pending stores
        state.pendingStores = state.pendingStores.filter(store => store.id !== action.payload.id);
        // Update in main stores list
        storeSlice.caseReducers.updateStoreInList(state, { payload: action.payload, type: 'updateStoreInList' });
        state.error = null;
      })
      .addCase(approveStore.rejected, (state, action) => {
        state.approveLoading = false;
        state.error = action.payload as string;
      });

    // Admin: Reject store
    builder
      .addCase(rejectStore.pending, (state) => {
        state.rejectLoading = true;
        state.error = null;
      })
      .addCase(rejectStore.fulfilled, (state, action) => {
        state.rejectLoading = false;
        // Remove from pending stores
        state.pendingStores = state.pendingStores.filter(store => store.id !== action.payload.id);
        // Update in main stores list
        storeSlice.caseReducers.updateStoreInList(state, { payload: action.payload, type: 'updateStoreInList' });
        state.error = null;
      })
      .addCase(rejectStore.rejected, (state, action) => {
        state.rejectLoading = false;
        state.error = action.payload as string;
      });

    // Admin: Update store status
    builder
      .addCase(updateStoreStatus.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateStoreStatus.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        storeSlice.caseReducers.updateStoreInList(state, { payload: action.payload, type: 'updateStoreInList' });
        state.error = null;
      })
      .addCase(updateStoreStatus.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });

    // Search stores
    builder
      .addCase(searchStores.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchStores.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchStores.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  clearError,
  clearCurrentStore,
  setFilters,
  clearFilters,
  clearSearchResults,
  updateStoreInList,
  removeStoreFromList,
} = storeSlice.actions;

// Export reducer
export default storeSlice.reducer;
