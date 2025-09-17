# API Issues Analysis and Corrections

Based on the backend analysis, here are the identified issues and the corrections made:

## Issues Identified

### 1. Backend API Endpoints vs Frontend API Calls Mismatch

**Issue**: The frontend auth API was calling incorrect endpoints.

**Backend Routes**:
- Registration: `POST /auth/signup` (not `/auth/register`)
- Get current user: `GET /auth/me` (not `/auth/user`)

**Fixed in**: `src/api/authApi.ts`
- Updated registration endpoint from `/auth/register` to `/auth/signup`
- Updated get user endpoint from `/auth/user` to `/auth/me`

### 2. Missing Store API Endpoints

**Issue**: The `storeApi.ts` was empty and needed complete implementation.

**Backend Routes Available**:
- `GET /store` - Get all stores
- `GET /store/:id` - Get store by ID  
- `POST /store` - Create store (requires auth)
- `PUT /store/:id` - Update store (requires auth)
- `DELETE /store/:id` - Delete store (requires auth)

**Fixed in**: `src/api/storeApi.ts`
- Implemented all CRUD operations
- Added proper TypeScript typing
- Added admin functionality (though admin endpoints may need backend implementation)
- Added pagination and filtering support

### 3. Missing Admin Endpoints

**Issue**: Admin functionality for store approval is assumed but not confirmed in backend.

**Recommendation**: The backend may need these additional admin endpoints:
```
GET /store/admin/pending - Get pending stores
PATCH /store/admin/:id/approve - Approve store
PATCH /store/admin/:id/reject - Reject store
PATCH /store/admin/:id/status - Update store status
```

### 4. Axios Configuration Issues

**Issues**:
- No token interceptors
- Poor error handling
- No timeout configuration
- Incorrect `withCredentials` usage in headers

**Fixed in**: `src/api/axiosInstance.ts`
- Added request interceptor for automatic token attachment
- Added response interceptor for error handling and token refresh
- Proper axios configuration with timeout
- Better error transformation

## Backend Recommendations

### 1. Add Missing Admin Endpoints

```typescript
// In store.route.ts, add admin routes:
router.get('/admin/pending', authVerify, adminOnly, getPendingStores);
router.patch('/admin/:id/approve', authVerify, adminOnly, approveStore);
router.patch('/admin/:id/reject', authVerify, adminOnly, rejectStore);
```

### 2. Add Pagination Support

```typescript
// Backend should support query parameters:
// GET /store?page=1&limit=10&status=APPROVED&search=pizza&category=restaurant
```

### 3. Add My Stores Endpoint

```typescript
// Add endpoint for store owners to get their stores:
router.get('/my-stores', authVerify, getMyStores);
```

### 4. Improve Error Response Format

Ensure backend returns consistent error format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error info",
  "data": null
}
```

### 5. Add Response Pagination

```json
{
  "success": true,
  "message": "Stores fetched successfully",
  "data": {
    "data": [...stores],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

## Frontend Improvements Made

### 1. Comprehensive Type System

- Added complete TypeScript interfaces for all entities
- Created API response types
- Added loading state types
- Created enum for user roles and store status

### 2. Redux Toolkit Best Practices

- Used `createAsyncThunk` for all async operations
- Proper error handling in all thunks
- Separated loading states for different operations
- Added selectors for better data access
- Implemented optimistic updates where appropriate

### 3. Axios Interceptors

- Automatic token attachment
- Token refresh on 401 errors
- Consistent error format
- Request/response logging capability

### 4. Component Architecture

- AuthProvider for token hydration
- Protected routes with role-based access
- Typed hooks for Redux
- Comprehensive selectors

## Usage Examples

The API is now ready to use. Here's how to implement a login form:

```tsx
import { useAppDispatch, useAppSelector } from '../reduxStore/store';
import { loginUser } from '../reduxStore/features/auth/authSlice';
import { selectLoginLoading, selectAuthError } from '../reduxStore/features/auth/selectors';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectAuthError);

  const handleSubmit = async (formData) => {
    const result = await dispatch(loginUser(formData));
    
    if (loginUser.fulfilled.match(result)) {
      // Success - user is now logged in
    } else {
      // Error is automatically handled in state
    }
  };

  // Component JSX...
};
```

## Environment Variables

Add to your `.env` file:
```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Testing the Setup

1. **Authentication Flow**:
   - Register -> Email verification -> Login -> Access protected routes

2. **Store Management**:
   - Create store (Store Owner role) -> Admin approval -> Public listing

3. **Admin Functions**:
   - View pending stores -> Approve/Reject -> Store status changes

## Next Steps

1. Update backend with missing admin endpoints
2. Add proper pagination to backend
3. Implement review system (if not done)
4. Add proper image upload handling
5. Implement email verification flow
6. Add proper validation on both frontend and backend
