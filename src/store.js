import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../src/shared/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});