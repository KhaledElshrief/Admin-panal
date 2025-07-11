import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import driversReducer from './slices/driversSlice';
import subscriptionReducer from './slices/subscriptionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    ui: uiReducer,
    drivers: driversReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;