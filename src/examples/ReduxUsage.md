# Redux Toolkit Usage Examples

This document provides examples of how to use the Redux store, actions, and selectors in your components.

## Authentication Examples

### Login Component

```tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxStore/store';
import { loginUser, clearError } from '../reduxStore/features/auth/authSlice';
import { selectLoginLoading, selectAuthError, selectIsAuthenticated } from '../reduxStore/features/auth/selectors';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError()); // Clear any previous errors
    
    const result = await dispatch(loginUser(formData));
    
    if (loginUser.fulfilled.match(result)) {
      // Login successful, redirect or show success
      console.log('Login successful');
    } else {
      // Login failed, error is already in state
      console.log('Login failed:', result.payload);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isAuthenticated) {
    return <div>Already logged in!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};
```

### Protected Route Component

```tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../reduxStore/store';
import { selectIsAuthenticatedAndVerified, selectAuthLoading } from '../reduxStore/features/auth/selectors';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireEmailVerification = true 
}) => {
  const isAuthenticatedAndVerified = useAppSelector(selectIsAuthenticatedAndVerified);
  const loading = useAppSelector(selectAuthLoading);

  if (loading === 'pending') {
    return <div>Loading...</div>;
  }

  if (requireEmailVerification && !isAuthenticatedAndVerified) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

## Store Management Examples

### Store List Component

```tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxStore/store';
import { fetchStores, setFilters } from '../reduxStore/features/stores/storeSlice';
import { 
  selectAllStores, 
  selectStoresLoading, 
  selectStoresError,
  selectApprovedStores 
} from '../reduxStore/features/stores/selectors';
import { StoreStatus } from '../types/store';

const StoreList: React.FC = () => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector(selectApprovedStores); // Only show approved stores
  const loading = useAppSelector(selectStoresLoading);
  const error = useAppSelector(selectStoresError);

  useEffect(() => {
    // Fetch stores with filters
    dispatch(fetchStores({ 
      status: StoreStatus.APPROVED, 
      limit: 10 
    }));
  }, [dispatch]);

  const handleFilterByCategory = (category: string) => {
    dispatch(setFilters({ category }));
    dispatch(fetchStores({ 
      status: StoreStatus.APPROVED,
      category,
    }));
  };

  if (loading === 'pending') {
    return <div>Loading stores...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => handleFilterByCategory('restaurant')}>
          Restaurants
        </button>
        <button onClick={() => handleFilterByCategory('retail')}>
          Retail
        </button>
      </div>
      
      <div className="store-grid">
        {stores.map(store => (
          <div key={store.id} className="store-card">
            <h3>{store.name}</h3>
            <p>{store.description}</p>
            <p>Rating: {store.averageRating}/5</p>
            <p>Status: {store.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Create Store Component

```tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxStore/store';
import { createStore } from '../reduxStore/features/stores/storeSlice';
import { selectCreateStoreLoading, selectStoresError } from '../reduxStore/features/stores/selectors';
import { selectIsStoreOwner } from '../reduxStore/features/auth/selectors';

const CreateStoreForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateStoreLoading);
  const error = useAppSelector(selectStoresError);
  const canCreateStore = useAppSelector(selectIsStoreOwner);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    category: '',
    phone: '',
    email: '',
    website: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await dispatch(createStore(formData));
    
    if (createStore.fulfilled.match(result)) {
      console.log('Store created successfully');
      // Reset form or redirect
      setFormData({
        name: '',
        description: '',
        address: '',
        category: '',
        phone: '',
        email: '',
        website: '',
      });
    }
  };

  if (!canCreateStore) {
    return <div>You need to be a store owner to create stores</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Store Name"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        placeholder="Store Description"
        required
      />
      <input
        name="address"
        value={formData.address}
        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
        placeholder="Address"
        required
      />
      {/* Add more form fields */}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Store'}
      </button>
      
      {error && <p className="error">{error}</p>}
    </form>
  );
};
```

### Admin Dashboard Component

```tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxStore/store';
import { 
  fetchPendingStores, 
  approveStore, 
  rejectStore 
} from '../reduxStore/features/stores/storeSlice';
import { 
  selectPendingStores, 
  selectAdminStats,
  selectApproveStoreLoading 
} from '../reduxStore/features/stores/selectors';
import { selectIsAdmin } from '../reduxStore/features/auth/selectors';

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  const pendingStores = useAppSelector(selectPendingStores);
  const adminStats = useAppSelector(selectAdminStats);
  const approveLoading = useAppSelector(selectApproveStoreLoading);

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchPendingStores());
    }
  }, [dispatch, isAdmin]);

  const handleApproveStore = (storeId: number) => {
    dispatch(approveStore(storeId));
  };

  const handleRejectStore = (storeId: number, reason?: string) => {
    dispatch(rejectStore({ id: storeId, reason }));
  };

  if (!isAdmin) {
    return <div>Access denied. Admin only.</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <div className="stats">
        <div>Total Stores: {adminStats.totalStores}</div>
        <div>Approved: {adminStats.approvedStores}</div>
        <div>Pending: {adminStats.pendingStores}</div>
        <div>Rejected: {adminStats.rejectedStores}</div>
      </div>

      <h2>Pending Stores</h2>
      {pendingStores.map(store => (
        <div key={store.id} className="pending-store-card">
          <h3>{store.name}</h3>
          <p>{store.description}</p>
          <p>Owner: {store.owner?.name}</p>
          
          <div className="actions">
            <button 
              onClick={() => handleApproveStore(store.id)}
              disabled={approveLoading}
            >
              Approve
            </button>
            <button 
              onClick={() => handleRejectStore(store.id, 'Does not meet requirements')}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
```

## Best Practices

### 1. Always use typed hooks
```tsx
// ✅ Good
import { useAppDispatch, useAppSelector } from '../reduxStore/store';

// ❌ Avoid
import { useDispatch, useSelector } from 'react-redux';
```

### 2. Use selectors for data access
```tsx
// ✅ Good - Use specific selectors
const user = useAppSelector(selectUser);
const loading = useAppSelector(selectLoginLoading);

// ❌ Avoid - Direct state access
const user = useAppSelector(state => state.auth.user);
```

### 3. Handle async actions properly
```tsx
// ✅ Good - Check action result
const handleLogin = async () => {
  const result = await dispatch(loginUser(credentials));
  
  if (loginUser.fulfilled.match(result)) {
    // Success handling
  } else {
    // Error handling
  }
};

// ❌ Avoid - Not checking results
const handleLogin = () => {
  dispatch(loginUser(credentials));
  // No way to know if it succeeded
};
```

### 4. Clear errors before new actions
```tsx
// ✅ Good
const handleSubmit = () => {
  dispatch(clearError());
  dispatch(someAction(data));
};
```

### 5. Use loading states for better UX
```tsx
// ✅ Good
{loading ? 'Saving...' : 'Save'}

// Show different loading states
{createLoading && 'Creating...'}
{updateLoading && 'Updating...'}
{deleteLoading && 'Deleting...'}
```
