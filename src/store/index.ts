import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import driversReducer from './slices/driversSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import appsettingsReducer from './slices/appsettingsSlice';
import usersReducer from './slices/usersSlices';
import statsReducer from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    ui: uiReducer,
    drivers: driversReducer,
    subscription: subscriptionReducer,
    appsettings: appsettingsReducer,
    users: usersReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;