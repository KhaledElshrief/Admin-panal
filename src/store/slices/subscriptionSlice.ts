import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Subscription {
  id?: string;
  description: string;
  amount: number;
  currency: string;
  type: string;
  duration: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SubscriptionState {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  loading: false,
  error: null,
  success: null,
};

const API_URL = 'https://mahfouzapp.com/subscription';

export const fetchSubscriptions = createAsyncThunk(
  'subscription/fetchAll',
  async () => {
      const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found in localStorage');
      const response = await axios.get('https://mahfouzapp.com/subscription', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      console.log(response.data);
      return response.data.subscriptions;
  }
);

export const createSubscription = createAsyncThunk(
  'subscription/create',
  async (subscriptionData: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_URL, subscriptionData, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });
      // If Prisma error, handle it
      if (response.data && response.data.code === 'P2002') {
        return rejectWithValue('A subscription with this type already exists.');
      }
      return response.data;
    } catch (error: any) {
      // Prisma error or other error
      if (error.response?.data?.code === 'P2002') {
        return rejectWithValue('A subscription with this type already exists.');
      }
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to create subscription');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    clearSuccess: (state) => { state.success = null; },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
        state.success = 'Fetched subscriptions successfully';
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions.push(action.payload);
        state.success = 'Subscription created successfully';
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
