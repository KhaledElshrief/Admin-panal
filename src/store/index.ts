import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import uiReducer from './slices/uiSlice';
import driversReducer from './slices/driversSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    ui: uiReducer,
    drivers: driversReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;