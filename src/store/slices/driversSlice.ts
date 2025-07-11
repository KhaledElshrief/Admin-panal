import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchDrivers = createAsyncThunk('drivers/fetchDrivers', async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found in localStorage');
  const response = await axios.get('https://mahfouzapp.com/drivers', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
});

export const fetchDriverById = createAsyncThunk(
  'drivers/fetchDriverById',
  async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found in localStorage');
    const response = await axios.get(`https://mahfouzapp.com/drivers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
);

export const fetchDriverRatings = createAsyncThunk(
  'drivers/fetchDriverRatings',
  async ({ driverId, page = 1, pageSize = 10 }: { driverId: string, page?: number, pageSize?: number }) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found in localStorage');
    const response = await axios.get(
      `https://mahfouzapp.com/drivers/rates/all?page=${page}&pageSize=${pageSize}&driverId=${driverId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

//try and catch
const driversSlice = createSlice({
  name: 'drivers',
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,
    selectedDriver: null,
    selectedDriverLoading: false,
    selectedDriverError: null as string | null,
    ratingsData: [],
    ratingsLoading: false,
    ratingsError: null as string | null,
    ratingsTotalItems: 0,
    ratingsTotalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      })
      .addCase(fetchDriverById.pending, (state) => {
        state.selectedDriverLoading = true;
        state.selectedDriverError = null;
        state.selectedDriver = null;
      })
      .addCase(fetchDriverById.fulfilled, (state, action) => {
        state.selectedDriverLoading = false;
        state.selectedDriver = action.payload;
      })
      .addCase(fetchDriverById.rejected, (state, action) => {
        state.selectedDriverLoading = false;
        state.selectedDriverError = action.error.message || 'Failed to fetch driver';
      })
      .addCase(fetchDriverRatings.pending, (state) => {
        state.ratingsLoading = true;
        state.ratingsError = null;
      })
      .addCase(fetchDriverRatings.fulfilled, (state, action) => {
        state.ratingsLoading = false;
        state.ratingsData = action.payload.data;
        state.ratingsTotalItems = action.payload.totalItems;
        state.ratingsTotalPages = action.payload.totalPages;
      })
      .addCase(fetchDriverRatings.rejected, (state, action) => {
        state.ratingsLoading = false;
        state.ratingsError = action.error.message || 'Failed to fetch driver ratings';
      });
  },
});

export default driversSlice.reducer;
