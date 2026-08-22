import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/auth";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await login(user);
      if(response.acesstoken) sessionStorage.setItem("token", response.acesstoken);
      if(response) sessionStorage.setItem("userdetails", JSON.stringify(response));
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
  username: null,
  acesstoken: null,
  loading: false,
  error: null,
  success: false,
  isLoggedin:false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.acesstoken = null;
      state.success = false;
      state.error = null;
      state.isLoggedin =false;
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
      
      state.acesstoken = action.payload.acesstoken;
      console.log(action.acesstoken);
      
      if (action.payload.acesstoken) state.isLoggedin = true;
        state.user = action.payload.username || null;

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