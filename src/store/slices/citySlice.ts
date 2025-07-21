import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface City {
  id: string;
  name: string;
  nameEn: string;
  countryId: string;
  lessPricePerKilometer: {
    max: number;
    min: number;
    average: number;
  };
  lessStudentFee: {
    max: number;
    min: number;
    average: number;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface CitiesState {
  cities: City[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
}

const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: null,
  totalItems: 0,
  totalPages: 0,
};

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://mahfouzapp.com/dashboard/cities?page=${page}&pageSize=${pageSize}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message?.english || error.message || 'Failed to fetch cities');
    }
  }
);

const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.cities = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default citySlice.reducer;
