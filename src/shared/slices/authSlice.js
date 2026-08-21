import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/auth";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await login(user);

      return response;

    } catch (error) {

      return rejectWithValue({
        status: error.status,
        message: error.message
      });

    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {

        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {

        state.loading = false;
        state.success = true;

        state.token = action.payload.accesstoken;

        state.user = action.payload.user || null;

      }).addCase(loginUser.rejected, (state, action) => {

        state.loading = false;
        state.success = false;

        state.error = action.payload;

      });

  }
});

export const {
  logout,
  clearError
} = authSlice.actions;

export default authSlice.reducer;