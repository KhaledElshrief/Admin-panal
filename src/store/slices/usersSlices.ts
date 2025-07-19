import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: string;
  userName: string;
  phone: string;
  image: string | null;
  role: string;
  city: { name: string; nameEn: string };
  country: { name: string; nameEn: string };
  region: string;
  dateOfBirth: string | null;
  gender: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  totalItems: 0,
  totalPages: 0,
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (
    params: { role?: string; userName?: string; isVerified?: boolean } = {},
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('token');
      const searchParams = new URLSearchParams();
      if (params.role) searchParams.append('role', params.role);
      if (params.userName) searchParams.append('userName', params.userName);
      if (params.isVerified !== undefined) searchParams.append('isVerified', String(params.isVerified));
      const url = `https://mahfouzapp.com/dashboard-auth/get-all-users${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message?.english || error.message || 'Failed to fetch users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;