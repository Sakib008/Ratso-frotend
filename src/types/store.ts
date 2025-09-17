// Store status enum based on backend
export const StoreStatus = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
} as const;

export type StoreStatus = typeof StoreStatus[keyof typeof StoreStatus];

// Store interface
export interface Store {
  id: number;
  name: string;
  description: string;
  address: string;
  email?: string;
  image?: string;
  status: StoreStatus;
  ownerId: number;
  owner?: {
    id: number;
    name: string;
    email: string;
  };
  averageRating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt: string;
}

// Store creation payload
export interface CreateStorePayload {
  name: string;
  description: string;
  address: string;
  category?: string;
  phone?: string;
  email?: string;
  website?: string;
  image?: string;
}

// Store update payload
export interface UpdateStorePayload extends Partial<CreateStorePayload> {
  id: number;
}

// Store filters for fetching
export interface StoreFilters {
  status?: StoreStatus;
  category?: string;
  search?: string;
  ownerId?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}
