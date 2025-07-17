import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import driversReducer from './slices/driversSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import appsettingsReducer from './slices/appsettingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    ui: uiReducer,
    drivers: driversReducer,
    subscription: subscriptionReducer,
    appsettings: appsettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;