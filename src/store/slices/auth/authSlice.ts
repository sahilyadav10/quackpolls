import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./authType";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Selectors
const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
const selectError = (state: { auth: AuthState }) => state.auth.error;

const authReducer = authSlice.reducer;
export default authReducer;
export const authActions = authSlice.actions;
export const authSelectors = {
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
};
