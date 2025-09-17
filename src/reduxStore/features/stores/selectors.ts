import type { RootState } from '../../store';
import { StoreStatus } from '../../../types/store';


// Store selectors
export const selectStores = (state: RootState) => state.stores;

export const selectAllStores = (state: RootState) => state.stores.items;
export const selectCurrentStore = (state: RootState) => state.stores.currentItem;
export const selectStoresLoading = (state: RootState) => state.stores.loading;
export const selectStoresError = (state: RootState) => state.stores.error;
export const selectStoresTotalCount = (state: RootState) => state.stores.totalCount;
export const selectStoresCurrentPage = (state: RootState) => state.stores.currentPage;
export const selectStoresHasNextPage = (state: RootState) => state.stores.hasNextPage;

// Specific loading states
export const selectCreateStoreLoading = (state: RootState) => state.stores.createLoading;
export const selectUpdateStoreLoading = (state: RootState) => state.stores.updateLoading;
export const selectDeleteStoreLoading = (state: RootState) => state.stores.deleteLoading;

// My stores (for store owners)
export const selectMyStores = (state: RootState) => state.stores.myStores;
export const selectMyStoresLoading = (state: RootState) => state.stores.myStoresLoading;

// Admin functionality
export const selectPendingStores = (state: RootState) => state.stores.pendingStores;
export const selectPendingStoresLoading = (state: RootState) => state.stores.pendingStoresLoading;
export const selectApproveStoreLoading = (state: RootState) => state.stores.approveLoading;
export const selectRejectStoreLoading = (state: RootState) => state.stores.rejectLoading;

// Filters and search
export const selectStoreFilters = (state: RootState) => state.stores.filters;
export const selectSearchResults = (state: RootState) => state.stores.searchResults;
export const selectSearchLoading = (state: RootState) => state.stores.searchLoading;

// Filtered stores
export const selectApprovedStores = (state: RootState) => 
  state.stores.items.filter(store => store.status === StoreStatus.APPROVED);

export const selectStoresByStatus = (status: StoreStatus) => (state: RootState) =>
  state.stores.items.filter(store => store.status === status);

export const selectStoresByCategory = (category: string) => (state: RootState) =>
  state.stores.items.filter(store => 
    store.category?.toLowerCase() === category.toLowerCase()
  );

// Store by ID
export const selectStoreById = (id: number) => (state: RootState) =>
  state.stores.items.find(store => store.id === id) || 
  state.stores.myStores.find(store => store.id === id) ||
  null;

// My store statistics
export const selectMyStoreStats = (state: RootState) => {
  const myStores = state.stores.myStores;
  return {
    total: myStores.length,
    approved: myStores.filter(store => store.status === StoreStatus.APPROVED).length,
    pending: myStores.filter(store => store.status === StoreStatus.PENDING).length,
    rejected: myStores.filter(store => store.status === StoreStatus.REJECTED).length,
    averageRating: myStores.reduce((acc, store) => acc + (store.averageRating || 0), 0) / myStores.length || 0,
    totalReviews: myStores.reduce((acc, store) => acc + (store.totalReviews || 0), 0),
  };
};

// Admin statistics
export const selectAdminStats = (state: RootState) => {
  const allStores = state.stores.items;
  const pendingStores = state.stores.pendingStores;
  
  return {
    totalStores: allStores.length,
    approvedStores: allStores.filter(store => store.status === StoreStatus.APPROVED).length,
    pendingStores: pendingStores.length,
    rejectedStores: allStores.filter(store => store.status === StoreStatus.REJECTED).length,
  };
};
