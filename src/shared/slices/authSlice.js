import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/auth";

const SESSION_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

// Rehydrate from sessionStorage on app load
function loadAuthFromSession() {
  try {
    const token = sessionStorage.getItem("token");
    const raw = sessionStorage.getItem("userdetails");
    let loginTime = sessionStorage.getItem("loginTime");

    if (!token || !raw || !loginTime) return null;

    // If user was redirected to the payment page and came back,
    // add the time spent on the payment page to loginTime so the
    // inactivity timer is not counted during external navigation.
    const paymentRedirectAt = sessionStorage.getItem("paymentRedirectAt");
    if (paymentRedirectAt) {
      const timeAwayMs = Date.now() - Number(paymentRedirectAt);
      const adjustedLoginTime = Number(loginTime) + timeAwayMs;
      sessionStorage.setItem("loginTime", adjustedLoginTime.toString());
      sessionStorage.removeItem("paymentRedirectAt");
      loginTime = adjustedLoginTime.toString();
    }

    // Check if 15-min session has already expired
    const elapsed = Date.now() - Number(loginTime);
    if (elapsed >= SESSION_TIMEOUT_MS) {
      sessionStorage.clear();
      return null;
    }

    const userdetails = JSON.parse(raw);
    return {
      acesstoken: token,
      user: userdetails.username || null,
      isLoggedin: true,
    };
  } catch {
    return null;
  }
}

const persisted = loadAuthFromSession();

const initialState = persisted ?? {
  username: null,
  acesstoken: null,
  loading: false,
  error: null,
  success: false,
  isLoggedin: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await login(user);
      if (response.acesstoken) {
        sessionStorage.setItem("token", response.acesstoken);
        sessionStorage.setItem("loginTime", Date.now().toString());
      }
      if (response) sessionStorage.setItem("userdetails", JSON.stringify(response));
      return response;
    } catch (error) {
      return rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.user = null;
      state.acesstoken = null;
      state.success = false;
      state.error = null;
      state.isLoggedin = false;
      sessionStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
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

        if (action.payload.acesstoken) state.isLoggedin = true;
        state.user = action.payload.username || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export { SESSION_TIMEOUT_MS };
export default authSlice.reducer;