import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./authType";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuthStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    initializeAuthSuccess: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    initializeAuthFailure: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    // Refresh should be silent
    refreshAuthSuccess: (state) => {
      state.isAuthenticated = true;
    },
    refreshAuthFailure: (state) => {
      state.isAuthenticated = false;
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
