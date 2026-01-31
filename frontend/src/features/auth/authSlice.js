import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/authApi";
import { registerUser } from "../../services/authApi";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const data = await loginUser(email, password);
    localStorage.setItem("token", data.access_token);
    return data.username;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData) => {
    await registerUser(userData);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
      state.loading = false;
      })

      ;
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
