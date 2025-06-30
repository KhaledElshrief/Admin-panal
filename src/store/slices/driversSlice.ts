import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// API Response Types
export interface DriverVehicle {
  id: string;
  driverId: string;
  modelYear: number;
  carModel: string;
  vehicleId: string;
  color: string;
  keyNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  userName: string;
  image: string;
  city: {
    name: string;
    nameEn: string;
  };
  country: {
    name: string;
    nameEn: string;
  };
  region: string;
  gender: string;
  isVerified: boolean;
  dateOfBirth: string | null;
  phone: string;
}

export interface Driver {
  id: string;
  homePicture: string[];
  drivingLicense: string[];
  personalCard: string[];
  isVerified: boolean;
  isPause: boolean;
  avgRate: number | null;
  vehicleId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  DriverVehicle: DriverVehicle[];
  user: User;
}

export interface DriversApiResponse {
  code: number;
  data: Driver[];
  message: {
    arabic: string;
    english: string;
  };
  totalItems: number;
  totalPages: number;
}

interface DriversState {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  activeTab: string;
  searchTerm: string;
  filters: {
    city: string;
    status: string;
    dateRange: string;
  };
}

const initialState: DriversState = {
  drivers: [],
  loading: false,
  error: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  activeTab: 'إدارة السائقين',
  searchTerm: '',
  filters: {
    city: 'اختر...',
    status: 'اختر...',
    dateRange: '3/30/2025 - 3/1/2025'
  }
};

// Async thunk for fetching drivers
export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async (params?: { page?: number; limit?: number }) => {
    const response = await fetch('https://mahfouzapp.com/drivers');
    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }
    const data: DriversApiResponse = await response.json();
    return data;
  }
);

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ key: keyof DriversState['filters']; value: string }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.filters = {
        city: 'اختر...',
        status: 'اختر...',
        dateRange: '3/30/2025 - 3/1/2025'
      };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      });
  }
});

export const {
  setActiveTab,
  setSearchTerm,
  setFilter,
  resetFilters,
  setCurrentPage
} = driversSlice.actions;

export default driversSlice.reducer;